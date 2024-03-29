import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Alert } from "react-native";
import Toast from "react-native-simple-toast";
import { LoanGameApi } from "../api";
import Color from "../Color";
import { Button, Container, GameHeader, UserHeader } from "../components";
import { withScanner } from "../components/withScanner";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

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
        if (Store.propsStore.game.id > 0) this.setState({ game });

        const user = Store.propsStore.user;
        if (Store.propsStore.user.id > 0) this.setState({ user });
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
            <Container text={loan ? "Wypożycz grę" : "Oddaj grę"}>
                <WithScannerGame
                    ref={ref => (this.game = ref)}
                    value={!!this.state.game}
                    game={this.state.game}
                    error={!this.state.game}
                    scannerText={"Skanuj grę"}
                    onPress={() => {
                        Store.propsStore.setTypeItem(1);
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
                            Store.propsStore.setTypeItem(2);
                            Store.propsStore.setRouteName(Scenes.LoanGame);
                            NavigationService.navigate(Scenes.Camera);
                        }}
                    />
                )}
                <Button
                    text={loan ? "Wypożycz grę" : "Oddaj grę"}
                    primary
                    color={Color.accentColor}
                    colorText={"white"}
                    onPress={() => this.success(loan)}
                />
            </Container>
        );
    }
    success = (loan: boolean) => {
        if (loan) {
            const { game, user } = this.state;
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
                    { text: "Tak", onPress: () => this.loanGame() }
                ],
                { cancelable: false }
            );
        } else {
            const { game } = this.state;
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
                    { text: "Tak", onPress: () => this.takeGame() }
                ],
                { cancelable: false }
            );
        }
    };

    loanGame() {
        LoanGameApi.add(
            this.state.user.id,
            Store.authStore.id,
            this.state.game.id
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
        LoanGameApi.edit(loanGame.id, Store.authStore.id)
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
