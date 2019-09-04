import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import Color from "../Color";
import { Button, Container, GameHeader } from "../components";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
interface Props extends SceneProps{
  item: any;
}
class BoardGame extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <Container scrollView >
        <GameHeader  game={item} />
        {!!item.description && (
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
              horizontal={true}
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
              horizontal={true}
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
        <Button
          primary
          color={Color.accentColor}
          colorText={"white"}
          onPress={this.loanGame}
          text={"Wypożycz/Oddaj grę"}
        />
      </Container>
    );
  }
  loanGame = () => {
    const item = this.props.navigation.state.params.item;
    if (this.props.authStore.privilegeId === 0) {
      NavigationService.navigate(Scenes.Login);
    } else if (this.props.authStore.privilegeId === 1) {
      NavigationService.navigate(Scenes.QR, { code: item.uuid });
    } else if (this.props.authStore.privilegeId > 1) {
      NavigationService.navigate(Scenes.LoanGame, { game: item });
    }
  };
}
export default inject("authStore","propsStore")(observer(BoardGame));
