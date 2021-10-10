import {inject, observer} from "mobx-react";
import Moment from "moment";
import React, {Component} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import GameHeader from "../../../components/GameHeader";
import ScreenContainer from "../../../components/ScreenContainer";
import ViewText from "../../../components/ViewText";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";

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
      networkService
        .getLoanGamesByUser(Store.authStore.id)
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
      <ScreenContainer text={"Historia wypożyczeń"}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Store.propsStore.historyLoan}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => {
                this.openItem(item.boardGame);
              }}
            >
              <GameHeader game={item.boardGame}>
                <ViewText
                  onlyText
                  label={"Wypożyczona: "}
                  text={Moment(item.startLoan).format("DD.MM.YYYY HH:MM")}
                />
                <ViewText
                  onlyText
                  label={"Oddana: "}
                  text={
                    item.endLoan &&
                    Moment(item.endLoan).format("DD.MM.YYYY HH:MM")
                  }
                />
              </GameHeader>
            </TouchableOpacity>
          )}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
        />
      </ScreenContainer>
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
    networkService
      .getLoanGamesByUser(Store.authStore.id)
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
    networkService
      .searchBoardGame(search)
      .then(response => {
        Store.propsStore.setListGame(response.data.items);
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}

export default inject("authStore", "propsStore")(observer(HistoryLoan));
