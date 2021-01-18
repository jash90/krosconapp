import {inject, observer} from "mobx-react";
import {Fab} from "native-base";
import React, {Component} from "react";
import {FlatList, Image, TouchableOpacity} from "react-native";
import {BoardGamesProcess} from "../actions/boardGames/BoardGamesProcess";
import {BoardGameApi} from "../api/index";
import Color from "../Color";
import {Container, Filter, GameHeader} from "../components";
import ErrorUtil from "../ErrorUtil";
import {Props} from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

interface State {
    active: boolean;
    search: string;
    page: number;
    refresh: boolean;
}
class List extends Component<Props, State> {
    public filter: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            active: false,
            search: "",
            refresh: false,
            page: 0
        };
    }

    render() {
        return (
            <Container
                back={false}
                right
                icon={"person"}
                onPress={this.openProfile}>
                <Filter
                    ref={ref => (this.filter = ref)}
                    onChangeValue={search => this.searchBoardGame(search)}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Store.propsStore.listgame}
                    renderItem={({ item }: any) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.openItem(item);
                            }}>
                            <GameHeader game={item}/>
                        </TouchableOpacity>
                    )}
                    refreshing={this.state.refresh}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                    keyExtractor={item => String(item.id)}
                />
                {Store.authStore.privilegeId === 1 && (
                    <Fab
                        active={this.state.active}
                        style={{
                            backgroundColor: Color.accentColor
                        }}
                        position="bottomRight"
                        onPress={() => NavigationService.navigate(Scenes.QR)}>
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
        if (this.filter) this.filter.clearFilter();
        this.setState({ refresh: true });
        await BoardGamesProcess();
        this.setState({ refresh: false });
    };

    async searchBoardGame(search: any) {
        try {
            const { data } = await BoardGameApi.search(search);

            Store.propsStore.setListGame(data.items);
        } catch (error) {
            ErrorUtil.errorService(error);
        }
    }
    onEndReached = async () => {
        if (this.state.page + 1 < Store.propsStore.maxPageBoardGame) {
            try {
                await BoardGamesProcess(this.state.page + 1);

                this.setState((current) => {
                    page: current.page + 1
                });

            } catch (error) {
                ErrorUtil.errorService(error);
            }
        }
    };
}
export default inject("authStore", "propsStore")(observer(List));
