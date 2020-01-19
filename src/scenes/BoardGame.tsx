import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import Color from "../Color";
import { Button, Container, GameHeader } from "../components";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";
import { Game } from "../models";
import { RCView } from "../components/StyledComponent";
import Moment from "moment/min/moment-with-locales";

interface Props extends SceneProps {
    item: any;
}
class BoardGame extends Component<Props> {
    componentWillUnmount() {
        Store.propsStore.clearGame();
    }

    render() {
        const game: Game = Store.propsStore.game;
        let loanGame = null;
        if (game && game.loanGames && game.loanGames.length > 0)
            loanGame = game.loanGames[0];
        return (
            <Container scrollView text={String(game.name)}>
                <GameHeader game={game}>
                    {!!game && !!game.description && (
                        // <View
                        //   style={{
                        //     flex: 1,
                        //     flexDirection: "column",
                        //     backgroundColor: "white",
                        //     borderRadius: 20,
                        //     padding: 20,
                        //     marginBottom: 10,
                        //     marginHorizontal: 20
                        //   }}>
                        <Text>{`Opis: ${game.description}`}</Text>
                        // </View>
                    )}
                    {false && !!game.boardGameTypes.length && (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                backgroundColor: "white",
                                borderRadius: 20,
                                padding: 20,
                                margin: 10,
                                marginHorizontal: 20
                            }}>
                            <Text>Typ</Text>
                            <FlatList
                                data={game.boardGameTypes.map(
                                    (bgt: any) => bgt.type.name
                                )}
                                horizontal
                                contentContainerStyle={{
                                    flex: 1,
                                    flexWrap: "wrap"
                                }}
                                renderItem={({ item }: any) => (
                                    <View
                                        style={{
                                            margin: 5,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: "black"
                                        }}>
                                        <Text>{item}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    )}
                    {false && !!game.boardGameMechanics.length && (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                backgroundColor: "white",
                                borderRadius: 20,
                                padding: 20,
                                margin: 10,
                                marginHorizontal: 20
                            }}>
                            <Text>Mechanika</Text>
                            <FlatList
                                data={game.boardGameMechanics.map(
                                    (bgt: any) => bgt.type.name
                                )}
                                horizontal
                                contentContainerStyle={{
                                    flex: 1,
                                    flexWrap: "wrap"
                                }}
                                renderItem={({ item }: any) => (
                                    <View
                                        style={{
                                            margin: 5,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: "black"
                                        }}>
                                        <Text>{item}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    )}
                    {loanGame && !loanGame.endLoan && (
                        //<RCView marginLeft={20} marginRight={20}>
                        <Text>{`Wypożyczona: ${Moment(loanGame.startLoan)
                            .locale("pl")
                            .fromNow()}`}</Text>
                        // </RCView>
                    )}
                </GameHeader>
                {Store.authStore.privilegeId > 1 && (
                    <Button
                        primary
                        color={Color.accentColor}
                        colorText={"white"}
                        onPress={this.loanGame}
                        text={"Wypożycz/Oddaj grę"}
                    />
                )}
            </Container>
        );
    }
    loanGame = () => {
        if (Store.authStore.privilegeId > 1) {
            NavigationService.navigate(Scenes.LoanGame);
        }
    };
}
export default inject("authStore", "propsStore")(observer(BoardGame));
