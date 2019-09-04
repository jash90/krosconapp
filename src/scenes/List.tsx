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
import Scenes from "../Scenes";
import { BoardGameApi } from "../api/index";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import { SceneProps } from "../interfaces";
import Game from "../models/Game";
interface State {
  active: boolean;
  search: string;
  listgame: any[];
  count: number;
  page: number;
  refresh: boolean;
}
interface Props extends SceneProps{
  listgame: Game[];
}
class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      search: "",
      refresh: false,
      listgame: [],
      count: 0,
      page: 0
    };
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params);
    if (this.props.navigation.state.params) {
      const params = this.props.navigation.state.params;
      if (params && params.listgame && params.count) {
        this.setState({
          listgame: params.listgame,
          count: Math.ceil(params.count / 10)
        });
      } else {
        BoardGameApi.offset()
          .then(response => {
            const data = response.data;
            this.setState({
              listgame: data.items,
              count: Math.ceil(data.count / 10),
              page: 0
            });
          })
          .catch(error => {
            ErrorUtil.errorService(error);
          });
      }
    }
  }

  render() {
    return (
      <Container back={false} right icon={"person"} onPress={this.openProfile}>
        <Filter onChangeValue={search => this.searchBoardGame(search)} />
        <FlatList
          data={this.state.listgame}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => {
                this.openItem(item);
              }}>
              <GameHeader
                game={item}
                edit={this.props.authStore.privilegeId > 1}
              />
            </TouchableOpacity>
          )}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
        {this.props.authStore.privilegeId === 1 && (
          <Fab
            active={this.state.active}
            style={{
              backgroundColor: Color.accentColor
            }}
            position="bottomRight"
            onPress={() =>
              NavigationService.navigate(Scenes.QR, {
                code: this.props.authStore.email
              })
            }>
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
    NavigationService.navigate(Scenes.BoardGame, { item });
  };
  openProfile = () => {
    if (this.props.authStore.token) {
      NavigationService.navigate(Scenes.Panel);
    } else {
      NavigationService.navigate(Scenes.Login);
    }
  };
  onRefresh = () => {
    this.setState({ refresh: true });
    BoardGameApi.offset()
      .then(response => {
        const data = response.data;
        this.setState({
          listgame: data.items,
          count: Math.ceil(data.count / 10),
          page: 0
        });
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
    this.setState({ refresh: false });
  };

  searchBoardGame(search: any) {
    BoardGameApi.search(search)
      .then(response => {
        console.log(response);
        this.setState({ listgame: response.data.items });
      })
      .catch(error => {
        console.log(error);
        ErrorUtil.errorService(error);
      });
  }
  onEndReached = () => {
    console.log(this.state.page);
    if (this.state.page + 1 < this.state.count) {
      BoardGameApi.offset(this.state.page + 1)
        .then(response => {
          const data = response.data;
          this.setState({
            listgame: this.state.listgame.concat(data.items),
            page: this.state.page + 1
          });
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  };
}

export default inject("authStore","propsStore")(observer(List));
