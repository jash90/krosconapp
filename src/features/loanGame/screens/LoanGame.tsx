import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Alert} from "react-native";
import Toast from "react-native-simple-toast";
import FullButton from "../../../components/FullButton";
import GameHeader from "../../../components/GameHeader";
import ScreenContainer from "../../../components/ScreenContainer";
import UserHeader from "../../../components/UserHeader";
import {withScanner} from "../../../components/withScanner";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";
import {SceneProps} from "../../../utils/interfaces";


const WithScannerUser = withScanner(UserHeader);
const WithScannerGame = withScanner(GameHeader);

interface State {
    user: any;
    game: any;
}

class LoanGame extends Component<SceneProps, State> {
    public game: any;
    public user: any;

    constructor(props: SceneProps) {
        super(props);
        this.state = {
            user: null,
            game: null
        };
    }

    componentWillMount() {
        const game = Store.propsStore.game;
        if (Store.propsStore.game.id > 0) this.setState({game});

        const user = Store.propsStore.user;
        if (Store.propsStore.user.id > 0) this.setState({user});
    }

    render() {
        let loan = this.state.game === null;
        if (this.state.game && this.state.game.loanGames) {
            loan = this.state.game.loanGames.length === 0;
        }
        if (
            this.state.game &&
            this.state.game.loanGames &&
            this.state.game.loanGames[0]
        ) {
            loan = this.state.game.loanGames[0].endLoan != null;
        }
        return (
            <ScreenContainer text={loan ? "Wypożycz grę" : "Oddaj grę"}>
                <WithScannerGame
                    ref={ref => (this.game = ref)}
                    value={!!this.state.game}
                    game={this.state.game}
                    error={!this.state.game}
                    scannerText={"Skanuj grę"}
                    onPress={() => {
                        Store.propsStore.setScanQRItem(1);
                        Store.propsStore.setRouteName(Scenes.LoanGame);
                        NavigationService.navigate(Scenes.Camera);
                    }}
                />
                {loan && (
                    <WithScannerUser
                        ref={ref => (this.user = ref)}
                        user={this.state.user}
                        value={!!this.state.user}
                        error={!this.state.user}
                        scannerText={"Skanuj użytkownika"}
                        onPress={() => {
                            Store.propsStore.setScanQRItem(2);
                            Store.propsStore.setRouteName(Scenes.LoanGame);
                            NavigationService.navigate(Scenes.Camera);
                        }}
                    />
                )}
                <FullButton
                    text={loan ? "Wypożycz grę" : "Oddaj grę"}
                    accentColor
                    colorText={"white"}
                    onPress={() => this.success(loan)}
                />
            </ScreenContainer>
        );
    }

    success = (loan: boolean) => {
        if (loan) {
            const {game, user} = this.state;
            WithScannerGame.validate(this.game);
            WithScannerUser.validate(this.user);
            if (!game || !user) {
                Toast.show(
                    "Musisz zeskanować kod qr użytkownika i/lub kod gry, żeby wypożyczyć grę."
                );
                return;
            }
            Alert.alert(
                "Wypożycz/Oddaj grę",
                `Czy chcesz wypożyczyć grę ?`,
                [
                    {
                        text: "Nie",
                        style: "cancel"
                    },
                    {text: "Tak", onPress: () => this.loanGame()}
                ],
                {cancelable: false}
            );
        } else {
            const {game} = this.state;
            if (!game) {
                Toast.show(
                    "Musisz zeskanować kod qr użytkownika i/lub kod gry, żeby wypożyczyć grę."
                );
            }
            Alert.alert(
                "Wypożycz/Oddaj grę",
                `Czy chcesz wypożyczyć grę ?`,
                [
                    {
                        text: "Nie",
                        style: "cancel"
                    },
                    {text: "Tak", onPress: () => this.takeGame()}
                ],
                {cancelable: false}
            );
        }
    };

    loanGame() {
        networkService.addLoanGame(
            this.state.user.id,
            Store.authStore.id,
            this.state.game.id,
            0
        )
            .then(response => {
                if (response.data.item) {
                    Toast.show("Gra została wypożyczona.");
                    NavigationService.reset(Scenes.List);
                } else if (response.data.error) {
                    ErrorUtil.errorService(response.data.error);
                }
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    }

    takeGame() {
        const loanGame = this.state.game.loanGames[0];
        networkService.updateLoanGame(loanGame.id, Store.authStore.id)
            .then(response => {
                if (response.data.item) {
                    Toast.show("Gra została oddana.");
                    NavigationService.reset(Scenes.List);
                } else if (response.data.error) {
                    ErrorUtil.errorService(response.data.error);
                }
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    }
}

export default inject("authStore", "propsStore")(observer(LoanGame));
