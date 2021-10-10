import {inject, observer} from 'mobx-react';
import {Fab} from 'native-base';
import React, {Component} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Filter from '../../../components/Filter';
import GameHeader from '../../../components/GameHeader';
import ScreenContainer from '../../../components/ScreenContainer';
import ErrorUtil from '../../../services/error/ErrorUtil';
import NavigationService from '../../../services/navigation/NavigationService';
import Scenes from '../../../services/navigation/utils/Scenes';
import {networkService} from '../../../services/network/NetworkService';

import Store from '../../../stores';
import {GetPageGameProcess} from '../actions/GetPageGameProcess';

interface State {
  active: boolean;
  search: string;
  page: number;
  refresh: boolean;
}

class List extends Component<{}, State> {
  public filter: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      active: false,
      search: '',
      refresh: false,
      page: 0,
    };
  }

  render() {
    return (
      <ScreenContainer
        back={false}
        right
        icon={'person'}
        onPress={this.openProfile}>
        <Filter
          ref={ref => (this.filter = ref)}
          onChangeValue={search => this.searchBoardGame(search)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Store.propsStore.listgame}
          renderItem={({item}: any) => (
            <TouchableOpacity
              onPress={() => {
                this.openItem(item);
              }}>
              <GameHeader game={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item: any) => item.id}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
        {Store.authStore.privilegeId === 1 && (
          <FabButton
            active={this.state.active}
            onPress={() => NavigationService.navigate(Scenes.QR)}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/img/qr.png')}
            />
          </FabButton>
        )}
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
  onRefresh = async () => {
    if (this.filter) {
      this.filter.clearFilter();
    }
    this.setState({refresh: true});
    await GetPageGameProcess();
    this.setState({refresh: false});
  };

  async searchBoardGame(search: any) {
    try {
      const {data} = await networkService.searchBoardGame(search);

      Store.propsStore.setListGame(data.items);
    } catch (error) {
      await ErrorUtil.errorService(error);
    }
  }

  onEndReached = async () => {
    if (this.state.page + 1 < Store.propsStore.maxPageBoardGame) {
      try {
        await GetPageGameProcess(this.state.page + 1);

        this.setState(current => {
          current.page + 1;
        });
      } catch (error) {
        ErrorUtil.errorService(error);
      }
    }
  };
}

const FabButton = styled(Fab).attrs({
  position: 'bottomRight',
})`
  background-color: ${props => props.theme.colors.accentColor};
`;

export default inject('authStore', 'propsStore')(observer(List));
