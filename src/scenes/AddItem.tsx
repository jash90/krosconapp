import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Alert, View} from "react-native";
import Toast from "react-native-simple-toast";
import {BoardGameApi, PublisherApi} from "../api";
import {Container, Dropdown, Input, ModalMultiList, ModalPickerPawn, ModalSingleList, ViewText} from "../components";
import TinyInput from "../components/TinyInput";
import {withScanner} from "../components/withScanner";
import ErrorUtil from "../ErrorUtil";
import {SceneProps} from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

const WithScannerText = withScanner(ViewText);

interface State {
    name: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime: string;
    minAge: string;
    publisher: any;
    type: string;
    mechanic: string;
    uuid: string;
    selected: string;
    types: string[];
    description: string;
    publishers: any[];
    items: string[];
}
class AddItem extends Component<SceneProps, State> {
    public name: any;
    public modalSingleList: any;
    public modalPickerPawn: any;
    public withScannerText: any;
    public playingTime: any;
    public minAge: any;
    constructor(props: SceneProps) {
        super(props);
        this.state = {
            minAge: "",
            minPlayers: 2,
            maxPlayers: 5,
            name: "",
            playingTime: "",
            publisher: {},
            type: "",
            mechanic: "",
            uuid: "",
            selected: "Gra",
            types: [],
            description: "",
            publishers: [],
            items: ["Wydawca", "Gra"]
        };
    }

    componentDidMount = () => {
        PublisherApi.all()
            .then(response => {
                this.setState({ publishers: response.data.items });
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
        const game = Store.propsStore.game;
        if (game) {
            const {
                name,
                minPlayers,
                maxPlayers,
                playingTime,
                minAge,
                publisher,
                uuid
            } = game;
            this.setState({
                name,
                minPlayers,
                maxPlayers,
                playingTime: String(playingTime),
                minAge: String(minAge),
                publisher,
                uuid
            });
        }
    };

    render() {
        return (
            <Container
                scrollView
                right
                text={"Dodaj"}
                icon={"save"}
                onPress={() => this.save()}>
                <View style={{ width: "100%" }}>
                    {Store.propsStore.game.id === 0 && (
                        <Dropdown
                            items={this.state.items}
                            value={this.state.selected}
                            onSelect={(item: any) => {
                                this.setState({ selected: item });
                            }}
                        />
                    )}
                    {this.state.selected === "Gra" && (
                        <WithScannerText
                            ref={ref => (this.withScannerText = ref)}
                            label={"UUID"}
                            text={
                                Store.propsStore.game
                                    ? Store.propsStore.game.uuid
                                    : Store.propsStore.code
                            }
                            error={
                                Store.propsStore.game
                                    ? !Store.propsStore.game.uuid
                                    : !Store.propsStore.code
                            }
                            value={
                                Store.propsStore.game
                                    ? !!Store.propsStore.game.uuid
                                    : !!Store.propsStore.code
                            }
                            scannerText={"Skanuj grę"}
                            onPress={() => {
                                if (Store.propsStore.game.id === 0) {
                                    Store.propsStore.setTypeItem(3);
                                    Store.propsStore.setRouteName(
                                        Scenes.AddItem
                                    );
                                    NavigationService.navigate(Scenes.Camera);
                                }
                            }}
                        />
                    )}

                    <Input
                        ref={ref => (this.name = ref)}
                        value={this.state.name}
                        placeholder={"Nazwa"}
                        error={this.state.name.length === 0}
                        errorText={"Uzupełnij nazwę"}
                        onChangeText={(name: any) => this.setState({ name })}
                    />
                    {this.state.selected === "Gra" && (
                        <Input
                            value={this.state.description}
                            placeholder={"Opis gry"}
                            multiline
                            style={{ flex: 1, height: 100 }}
                            onChangeText={description =>
                                this.setState({ description })
                            }
                        />
                    )}
                    {this.state.selected === "Gra" && (
                        <ModalPickerPawn
                            ref={ref => (this.modalPickerPawn = ref)}
                            minPlayers={this.state.minPlayers}
                            maxPlayers={this.state.maxPlayers}
                            onChangeMin={minPlayers =>
                                this.setState({ minPlayers })
                            }
                            onChangeMax={maxPlayers =>
                                this.setState({ maxPlayers })
                            }
                        />
                    )}
                    {this.state.selected === "Gra" && (
                        <TinyInput
                            ref={ref => (this.minAge = ref)}
                            firstDescription={"Wiek"}
                            secondDescription={"lat+"}
                            error={Number(this.state.minAge) === 0}
                            keyboardType="phone-pad"
                            value={this.state.minAge}
                            maxLength={2}
                            onChangeText={text =>
                                this.setState({ minAge: text })
                            }
                        />
                    )}
                    {this.state.selected === "Gra" && (
                        <TinyInput
                            ref={ref => (this.playingTime = ref)}
                            firstDescription={"Czas gry"}
                            secondDescription={"min"}
                            keyboardType="phone-pad"
                            value={this.state.playingTime}
                            error={Number(this.state.playingTime) === 0}
                            maxLength={3}
                            onChangeText={text =>
                                this.setState({ playingTime: text })
                            }
                        />
                    )}
                    {this.state.selected === "Gra" && (
                        <ModalSingleList
                            ref={ref => (this.modalSingleList = ref)}
                            placeholder={"Wydawca"}
                            value={this.state.publisher}
                            list={this.state.publishers}
                            onChangeValue={publisher =>
                                this.setState({ publisher })
                            }
                        />
                    )}
                    {false && (
                        <ModalMultiList
                            placeholder={"Typy gry"}
                            value={this.state.types}
                            list={[
                                "publisher1dfgdfgdfgdfgdfgdfgdfg",
                                "publisher2dfgdfg",
                                "publisher3",
                                "publisher4",
                                "publisher5",
                                "publisher6",
                                "publisher7"
                            ]}
                            onChangeValue={types => this.setState({ types })}
                        />
                    )}
                    {false && (
                        <ModalMultiList
                            placeholder={"Mechaniki gry"}
                            value={this.state.mechanic}
                            list={[
                                "publisher1dfgdfgdfgdfgdfgdfgdfg",
                                "publisher2dfgdfg",
                                "publisher3",
                                "publisher4",
                                "publisher5",
                                "publisher6",
                                "publisher7"
                            ]}
                            onChangeValue={mechanic =>
                                this.setState({ mechanic })
                            }
                        />
                    )}
                </View>
            </Container>
        );
    }
    save = () => {
        const {
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            playingTime,
            minAge,
            publisher
        } = this.state;

        let game = Store.propsStore.game;
        if (this.state.selected === "Gra" && !game) {
            ModalPickerPawn.validate(this.modalPickerPawn);
            ModalSingleList.validate(this.modalSingleList);
            WithScannerText.validate(this.withScannerText);
            Input.validate(this.name);
            TinyInput.validate([this.minAge, this.playingTime]);
            if (!uuid && uuid.length < 1) {
                Toast.show("Uzupełnij kod gry");
                return;
            }
            if (!name && name.length < 1) {
                Toast.show("Uzupełnij nazwę");
                return;
            }
            if (minPlayers <= 0) {
                Toast.show("Uzupełnij minimalną liczbę graczy");
                return;
            }
            if (maxPlayers <= 0) {
                Toast.show("Uzupełnij maksymalną liczbę graczy");
                return;
            }
            if (Number(playingTime) <= 0) {
                Toast.show("Uzupełnij czas trwania gry");
                return;
            }
            if (Number(minAge) <= 0) {
                Toast.show("Uzupełnij minimalny wiek");
                return;
            }
            if (publisher && publisher.id && publisher.id <= 0) {
                Toast.show("Wybierz wydawcę");
                return;
            }
            Alert.alert(
                "Dodawanie Gry",
                `Czy chcesz dodać grę ${name} ?`,
                [
                    {
                        text: "Nie",
                        style: "cancel"
                    },
                    { text: "Tak", onPress: () => this.boardGameAdd() }
                ],
                { cancelable: false }
            );
        }

        if (this.state.selected === "Gra" && !!game) {
            ModalPickerPawn.validate(this.modalPickerPawn);
            ModalSingleList.validate(this.modalSingleList);
            WithScannerText.validate(this.withScannerText);
            TinyInput.validate([this.minAge, this.playingTime]);
            Input.validate([this.name]);
            if (!uuid && uuid.length < 1) {
                Toast.show("Uzupełnij kod gry");
                return;
            }
            if (!name && name.length < 1) {
                Toast.show("Uzupełnij nazwę");
                return;
            }
            if (minPlayers <= 0) {
                Toast.show("Uzupełnij minimalną liczbę graczy");
                return;
            }
            if (maxPlayers <= 0) {
                Toast.show("Uzupełnij maksymalną liczbę graczy");
                return;
            }
            if (Number(playingTime) <= 0) {
                Toast.show("Uzupełnij czas trwania gry");
                return;
            }
            if (Number(minAge) <= 0) {
                Toast.show("Uzupełnij minimalny wiek");
                return;
            }
            if (publisher && publisher.id && publisher.id <= 0) {
                Toast.show("Wybierz wydawcę");
                return;
            }
            Alert.alert(
                "Edycja Gry",
                `Czy chcesz zmienić grę ${name} ?`,
                [
                    {
                        text: "Nie",
                        style: "cancel"
                    },
                    { text: "Tak", onPress: () => this.boardGameEdit() }
                ],
                { cancelable: false }
            );
        }
        if (this.state.selected === "Wydawca") {
            if (!name && name.length < 1) {
                Toast.show("Uzupełnij nazwę");
                return;
            }
            Alert.alert(
                "Dodawanie Wydawcy",
                `Czy chcesz dodać wydawcę ${name} ?`,
                [
                    {
                        text: "Nie",
                        style: "cancel"
                    },
                    { text: "Tak", onPress: () => this.publisherAdd() }
                ],
                { cancelable: false }
            );
        }
    };

    createArray(count: number, max: number) {
        let active: any[] = new Array(count).fill(true);
        let disactive: any[] = new Array(max - count).fill(false);
        return active.concat(disactive);
    }

    publisherAdd() {
        const { name } = this.state;
        PublisherApi.add(name)
            .then(response => {
                if (response.data.item) {
                    Toast.show("Zapisano");
                } else if (response.data.error) {
                    ErrorUtil.errorService(response.data.error);
                }
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    }

    boardGameEdit = () => {
        let game = Store.propsStore.game;
        const {
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            playingTime,
            minAge,
            publisher
        } = this.state;
        BoardGameApi.edit(
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            Number(playingTime),
            null,
            Number(minAge),
            publisher.id,
            game.id
        )
            .then(response => {
                if (response.data.item) {
                    Toast.show("Zapisano");
                } else if (response.data.error) {
                    ErrorUtil.errorService(response.data.error);
                }
                Store.propsStore.setCode("");
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    };

    boardGameAdd() {
        const {
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            playingTime,
            minAge,
            publisher
        } = this.state;
        BoardGameApi.add(
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            Number(playingTime),
            null,
            Number(minAge),
            publisher.id
        )
            .then(response => {
                if (response.data.item) {
                    Toast.show("Zapisano");
                } else if (response.data.error) {
                    ErrorUtil.errorService(response.data.error);
                }
                Store.propsStore.setCode("");
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    }
}
export default inject("authStore", "propsStore")(observer(AddItem));
