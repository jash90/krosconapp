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
interface Props {
  item: any;
}
interface State {}
export default class Item extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    const item = this.props.navigation.state.params.item;
     return (
      <Container scrollView={true} navigation={this.props.navigation}>
        <GameHeader
          navigation={this.props.navigation}
          name={item.name}
          minAge={item.minAge}
          minPlayers={item.minPlayers}
          maxPlayers={item.maxPlayers}
          playingTime={item.playingTime}
          publisher={item.publisher.name}
        />
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
        {!!item.boardGameTypes.length && (
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
        {!!item.boardGameMechanics.length && (
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
        <View style={{ paddingHorizontal: 20 }}>
          <Button
            primary
            color={Color.accentColor}
            colorText={"white"}
            onPress={() => this.props.navigation.navigate(Scenes.LoanGame)}
            text={"LoanGame"}
          />
        </View>
      </Container>
    );
  }
}
