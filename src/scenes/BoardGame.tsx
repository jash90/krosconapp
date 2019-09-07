import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import Color from "../Color";
import { Button, Container, GameHeader } from "../components";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
interface Props extends SceneProps {
  item: any;
}
class BoardGame extends Component<Props> {

  render() {
    const item = this.props.propsStore.game;
    return (
      <Container scrollView text={String(item.name)}>
        <GameHeader game={item} />
        {!!item && !!item.description && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              marginBottom: 10,
              marginHorizontal: 20
            }}>
            <Text>{item.description}</Text>
          </View>
        )}
        {false && !!item.boardGameTypes.length && (
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
              data={item.boardGameTypes.map((bgt: any) => bgt.type.name)}
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
        {false && !!item.boardGameMechanics.length && (
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
              data={item.boardGameMechanics.map((bgt: any) => bgt.type.name)}
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
        {this.props.authStore.privilegeId > 1 && (
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
    if (this.props.authStore.privilegeId > 1) {
      NavigationService.navigate(Scenes.LoanGame);
    }
  };
}
export default inject("authStore", "propsStore")(observer(BoardGame));
