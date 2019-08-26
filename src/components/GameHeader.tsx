import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import StarRating from "react-native-star-rating";
import { withNavigation } from "react-navigation";
interface Game {
  name: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minAge: number;
  publisher: any;
}

interface Props {
  game: Game;
  navigation: any;
}
export default class GameHeader extends Component<Props> {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          margin: 20,
          justifyContent: "center",
          alignItems: "center"
        }}>
        {!!this.props.game && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}>
            <View style={{ paddingVertical: 5 }}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 18,
                  textAlign: "left"
                }}>
                {this.props.game.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5
              }}>
              <View>
                <Text>{"Graczy:"}</Text>
              </View>
              {this.renderPawn(this.props.game.minPlayers, this.props.game.maxPlayers)}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                marginLeft: -2
              }}>
              <Icon name={"time"} size={20} />
              <Text>{`${this.props.game.playingTime} min`}</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <MaterialIcon name={"cake"} size={20} />
              <Text>{`${this.props.game.minAge} lat`}</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <MaterialIcon name={"casino"} size={20} />
              <Text>{this.props.game.publisher.name}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
  renderPawn(min: number, max: number) {
    var table = [];
    for (var i = 0; i < max; i++) {
      if (i < min) {
        table.push(<Icon size={15} name={"pawn"} color={"black"} />);
      } else {
        table.push(<Icon size={15} name={"pawn"} color={"gray"} />);
      }
    }
    return table;
  }
}
