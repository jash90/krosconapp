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
  thumbnail: string;
  averageRating: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
}

interface Props {
  name: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minAge: number;
  publisher:string;
  navigation: any;
}
export default class GameHeader extends Component<Props> {
  render() {
    const { name, minPlayers, maxPlayers, playingTime, minAge, publisher } = this.props;
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
              {name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row", paddingVertical:5
            }}>
              <View>
                <Text>{"Graczy:"}</Text>
              </View>
            {this.renderPawn(minPlayers, maxPlayers)}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical:5,
              marginLeft:-2,
            }}>
            <Icon name={"time"} size={20} />
            <Text>{`${playingTime} min`}</Text>
          </View>
          <View
            style={{
              paddingVertical:5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <MaterialIcon name={"cake"} size={20} />
            <Text>{`${minAge} lat`}</Text>
          </View>
          <View
            style={{
              paddingVertical:5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <MaterialIcon name={"casino"} size={20} />
            <Text>{publisher}</Text>
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
