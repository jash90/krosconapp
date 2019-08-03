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
import StarRating from "react-native-star-rating";
import { withNavigation } from "react-navigation";
interface Game {
  name: string;
  thumbnail: string;
  averageRating: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
}

interface Props {
  name: string;
  thumbnail: string;
  averageRating: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  navigation: any;
}
export default class GameHeader extends Component<Props> {
  render() {
    const {
      name,
      thumbnail,
      averageRating,
      minPlayers,
      maxPlayers,
      playingTime
    } = this.props;
    return (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            paddingHorizontal:20,
            margin: 10,
            marginHorizontal:20,
            justifyContent:"center",
            alignItems:'center'
          }}>
          <Image
            source={{
              uri: thumbnail
            }}
            resizeMode={"contain"}
            style={{
              width: 100,
              height: 100
            }}
          />
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}>
            <Text
              style={{
                width: "100%",
                fontSize: 18,
                textAlign: "center"
              }}>
              {name}
            </Text>
            <View
              style={{
                flexDirection: "row"
              }}>
              {this.renderPawn(minPlayers, maxPlayers)}
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 30,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Icon name={"time"} size={10} />
              <Text>{`${playingTime} min`}</Text>
            </View>
          </View>
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
