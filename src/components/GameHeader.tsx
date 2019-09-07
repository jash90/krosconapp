import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import Scenes from "../Scenes";
import NavigationService from "../NavigationService";
const Icon = createIconSetFromIcoMoon(selection);
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
  edit: boolean | null;
}
export default class GameHeader extends Component<Props> {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginHorizontal: 20,
          marginVertical: 10,
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
            <View
              style={{
                width: "100%",
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "left",
                  textAlignVertical: "center",
                  alignSelf: "center"
                }}>
                {this.props.game.name}
              </Text>
              {this.props.edit && (
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate(Scenes.AddItem, {
                      game: this.props.game
                    })
                  }>
                  <MaterialIcon name="edit" size={26} />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5
              }}>
              <View>
                <Text>{"Graczy:"}</Text>
              </View>
              {this.renderPawn(
                this.props.game.minPlayers,
                this.props.game.maxPlayers
              )}
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
         {this.props.game.publisher &&   <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <MaterialIcon name={"casino"} size={20} />
              <Text>{this.props.game.publisher.name}</Text>
            </View>}
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
