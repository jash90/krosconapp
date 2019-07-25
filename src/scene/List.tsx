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
import { Container, GameHeader } from "../components";
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
      <Container navigation={this.props.navigation} back={false} right
      icon={'person'} onPress={()=>this.props.navigation.navigate('Profile')}>
        <FlatList
          data={this.props.navigation.state.params.listgame}
          renderItem={({ item }: any) => (
            <GameHeader navigation={this.props.navigation} item={item}/>
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
