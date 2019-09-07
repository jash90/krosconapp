import { inject, observer } from "mobx-react";
import { Fab } from "native-base";
import React, { Component } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { BoardGameApi } from "../api/index";
import Color from "../Color";
import { Container, Filter, GameHeader } from "../components";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import Game from "../models/Game";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
interface State {
  active: boolean;
  search: string;
  listgame: any[];
  count: number;
  page: number;
  refresh: boolean;
}
interface Props extends SceneProps {
  listgame: Game[];
}
class List extends Component<Props, State> {
  public filter: Filter | undefined;
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
    console.log({ list: this.props.propsStore });
    if (this.props.propsStore.listgame.length === 0) {
      BoardGameApi.offset()
        .then(response => {
          const data = response.data;
          this.props.propsStore.setListGame(response.data.items);
          this.setState({
            count: Math.ceil(data.count / 10),
            page: 0
          });
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  }

  render() {
    return (
      <Container back={false} right icon={"person"} onPress={this.openProfile}>
        <Filter ref={ref =>this.filter = ref} onChangeValue={search => this.searchBoardGame(search)} />
        <FlatList
          data={this.props.propsStore.listgame}
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
              NavigationService.navigate(Scenes.QR)
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
  openItem = (item: any) => {
    this.props.propsStore.setGame(item);
    NavigationService.navigate(Scenes.BoardGame);
  };
  openProfile = () => {
    if (this.props.authStore.token) {
      NavigationService.navigate(Scenes.Panel);
    } else {
      NavigationService.navigate(Scenes.Login);
    }
  };
  onRefresh = () => {
    if (this.filter)
    this.filter.clearFilter();
    this.setState({ refresh: true });
    BoardGameApi.offset()
      .then(response => {
        const data = response.data;
        this.props.propsStore.setListGame(data.items);
        this.setState({
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
        this.props.propsStore.setListGame(response.data.items);
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
          this.props.propsStore.listgame.push(data.items);
          this.setState({
            page: this.state.page + 1
          });
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  };
}
export default inject("authStore", "propsStore")(observer(List));
