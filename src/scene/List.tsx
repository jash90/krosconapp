import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import { Fab, Button, Icon as NIcon } from "native-base";
import selection from "../../android/app/src/main/assets/style/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import StarRating from "react-native-star-rating";
import { Actions } from "react-native-router-flux";
import { Container } from "../components";
import Color from "../Color";
interface State {
  active: boolean;
}
interface Props {
  listgame: any[]
}
export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentWillMount() { }

  render() {
    return (
      <Container navigation={this.props.navigation} back={false}>
        <FlatList
          data={this.props.navigation.state.params.listgame}
          renderItem={({ item }: any) => (
            <TouchableHighlight onPress={() => this.openItem(item)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 20,
                  margin: 20,
                  marginBottom: 0
                }}>
                <Image
                  source={{
                    uri: item.thumbnail
                  }}
                  resizeMode={"contain"}
                  style={{
                    width: 150,
                    height: 150
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
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 25,
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                    <StarRating
                      disabled={true}
                      maxStars={10}
                      rating={item.averageRating}
                      starSize={15}
                      fullStarColor={"#FFEE58"}
                      halfStarColor={"#FFEE58"}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}>
                    {this.renderPawn(item.minPlayers, item.maxPlayers)}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                    <Icon name={"time"} size={20} />
                    <Text>
                      {item.playingTime}
                      min
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <Fab
          active={this.state.active}
          style={{
            backgroundColor: Color.accentColor
          }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('Camera')}>
          <NIcon name="camera" />
        </Fab>
      </Container>
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
  openItem(item: any) {
    this.props.navigation.navigate({routeName:'Item', params: {item: item} });
  }
}
