import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection";
const Icon = createIconSetFromIcoMoon(selection);
import StarRating from "react-native-star-rating";
import Color from "../Color";
import { Container, GameHeader, Button } from "../components";
import Scenes from "../Scenes";
import { inject, observer } from "mobx-react";
import AuthStore from "../stores/AuthStore";
interface Props {
  item: any;
  authStore: AuthStore;
}
class BoardGame extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <Container scrollView navigation={this.props.navigation}>
        <GameHeader navigation={this.props.navigation} game={item} />
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
      this.props.navigation.navigate(Scenes.Login);
    } else if (this.props.authStore.privilegeId === 1) {
      this.props.navigation.navigate(Scenes.QR, { code: item.uuid });
    } else if (this.props.authStore.privilegeId > 1) {
      this.props.navigation.navigate(Scenes.LoanGame, { game: item });
    }
  };
}
export default inject("authStore")(observer(BoardGame));
