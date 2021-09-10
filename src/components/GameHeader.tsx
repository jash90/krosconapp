import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Game from "../features/boardGame/models/Game";
import NavigationService from "../services/navigation/NavigationService";
import Scenes from "../services/navigation/utils/Scenes";
import Store from "../stores";
import {Icon} from "./Icon";

interface Props {
    game: Game | null;
}

class GameHeader extends Component<Props> {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 10
        }}
      >
        {!!this.props.game && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            <View
              style={{
                width: "100%",
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "left",
                  textAlignVertical: "center",
                  alignSelf: "center"
                }}
              >
                {this.props.game.name}
              </Text>
              {Store.authStore.privilegeId > 1 && (
                <TouchableOpacity
                  onPress={() => {
                    if (this.props.game) {
                      Store.propsStore.setGame(this.props.game);
                      NavigationService.navigate(Scenes.AddItem);
                    }
                  }}
                >
                  <MaterialIcon name="edit" size={26} />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5
              }}
            >
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
              }}
            >
              <Icon name={"time"} size={20} />
              <Text>{`${this.props.game.playingTime} min`}</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcon name={"cake"} size={20} />
              <Text>{`${this.props.game.minAge} lat`}</Text>
            </View>
            {this.props.game.publisher && (
              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <MaterialIcon name={"casino"} size={20} />
                <Text>{this.props.game.publisher.name}</Text>
              </View>
            )}
          </View>
        )}
        {this.props.children}
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

export default inject("authStore", "propsStore")(observer(GameHeader));
