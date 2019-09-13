import { inject, observer } from "mobx-react";
import { Fab } from "native-base";
import React, { Component } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { BoardGameApi, LoanGameApi } from "../api/index";
import Color from "../Color";
import { Container, Filter, GameHeader, ViewText } from "../components";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import Game from "../models/Game";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";
import Moment from "moment";

interface State {
  refresh: boolean;
}
class HistoryLoan extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      refresh: false
    };
  }

  componentDidMount() {
    if (Store.propsStore.historyLoan.length === 0) {
      LoanGameApi.byUser(Store.authStore.id)
        .then(response => {
          const data = response.data;
          Store.propsStore.setHistoryLoan(data.items);
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  }

  render() {
    return (
      <Container text={"Historia wypożyczeń"}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Store.propsStore.historyLoan}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => {
                this.openItem(item.boardGame);
              }}>
              <GameHeader game={item.boardGame}>
                <ViewText
                  onlyText
                  label={"Wypożyczona: "}
                  text={Moment(item.startLoan).format("DD.MM.YYYY HH:MM")}
                />
                <ViewText
                  onlyText
                  label={"Oddana: "}
                  text={item.endLoan && Moment(item.endLoan).format("DD.MM.YYYY HH:MM")}
                />
              </GameHeader>
            </TouchableOpacity>
          )}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
        />
      </Container>
    );
  }
  openItem = (item: any) => {
    Store.propsStore.setGame(item);
    NavigationService.navigate(Scenes.BoardGame);
  };
  openProfile = () => {
    if (Store.authStore.token) {
      NavigationService.navigate(Scenes.Panel);
    } else {
      NavigationService.navigate(Scenes.Login);
    }
  };
  onRefresh = () => {
    this.setState({ refresh: true });
    LoanGameApi.byUser(Store.authStore.id)
      .then(response => {
        const data = response.data;
        Store.propsStore.setHistoryLoan(data.items);
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
    this.setState({ refresh: false });
  };

  searchBoardGame(search: any) {
    BoardGameApi.search(search)
      .then(response => {
        Store.propsStore.setListGame(response.data.items);
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}
export default inject("authStore", "propsStore")(observer(HistoryLoan));
