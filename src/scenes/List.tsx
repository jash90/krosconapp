import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import { Fab, Button, Icon as NIcon } from "native-base";
import selection from "../../android/app/src/main/assets/style/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import { Container, GameHeader, Filter } from "../components";
import Color from "../Color";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
import { RCView } from "../components/StyledComponent";
import Scenes from"../Scenes";
interface State {
  active: boolean;
  search: string;
}
interface Props {
  listgame: any[];
  authStore: AuthStore;
}
class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      search: ""
    };
  }

  componentWillMount() {}

  render() {
    return (
      <Container
        navigation={this.props.navigation}
        back={false}
        right
        icon={"person"}
        onPress={this.openProfile}>
        <Filter
          value={this.state.search}
          onChangeValue={search => this.setState({ search })}
          placeholder={"Nazwa gry planszowej"}
        />
        <FlatList
          data={this.props.navigation.state.params.listgame}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => {
                this.openItem(item);
              }}>
              <GameHeader
                navigation={this.props.navigation}
                name={item.name}
                minAge={item.minAge}
                minPlayers={item.minPlayers}
                maxPlayers={item.maxPlayers}
                playingTime={item.playingTime}
                publisher={item.publisher}
              />
            </TouchableOpacity>
          )}
        />
        {this.props.authStore.privilegeId === 1 && (
          <Fab
            active={this.state.active}
            style={{
              backgroundColor: Color.accentColor
            }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate(Scenes.QR)}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/qr.png")}
            />
          </Fab>
        )}
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
  openItem = (item: any) => {
    this.props.navigation.navigate({
      routeName: "BoardGame",
      params: { item }
    });
  };
  openProfile = () => {
    if (this.props.authStore.token) {
      this.props.navigation.navigate(Scenes.Panel);
    } else {
      this.props.navigation.navigate(Scenes.Login);
    }
  };
}

export default inject("authStore")(observer(List));
