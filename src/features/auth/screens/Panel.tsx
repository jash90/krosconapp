import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import Toast from "react-native-simple-toast";
import OutLineButton from "../../../components/OutlineButton";
import ScreenContainer from "../../../components/ScreenContainer";
import UserHeader from "../../../components/UserHeader";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import Store from "../../../stores";
import { SceneProps } from "../../../utils/interfaces";

class Panel extends Component<SceneProps> {
  render() {
    return (
      <ScreenContainer
        left
        leftIcon={"arrow-back"}
        leftPress={() => NavigationService.navigate(Scenes.List)}
        right
        scrollView
        text={"Panel"}
        icon={"input"}
        onPress={this.logout}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <UserHeader edit user={Store.authStore} />

          {/*<FullButton*/}
          {/*    secondaryColor*/}
          {/*    colorText="white"*/}
          {/*    text={"Zmień hasło"}*/}
          {/*    onPress={this.changePassword}*/}
          {/*/>*/}

          {/*{Store.authStore.privilegeId === 1 && (*/}
          {/*    <FullButton*/}
          {/*        accentColor*/}
          {/*        colorText="white"*/}
          {/*        text={"Historia wypożyczeń"}*/}
          {/*        onPress={this.history}*/}
          {/*    />*/}
          {/*)}*/}

          {/*{Store.authStore.privilegeId === 1 && (*/}
          {/*    <OutLineButton*/}
          {/*        accentColor*/}
          {/*        text={"O konwencie"}*/}
          {/*        onPress={this.about}*/}
          {/*    />*/}
          {/*)}*/}

          {/*{Store.authStore.privilegeId > 1 && (*/}
          {/*    <FullButton*/}
          {/*        accentColor*/}
          {/*        colorText="white"*/}
          {/*        text={"Wypożycz grę / Oddaj grę"}*/}
          {/*        onPress={this.loanGame}*/}
          {/*    />*/}
          {/*)}*/}

          {/*{Store.authStore.privilegeId > 1 && (*/}
          {/*    <OutLineButton*/}
          {/*        accentColor*/}
          {/*        text={"Dodaj"}*/}
          {/*        onPress={this.addBoardGame}*/}
          {/*    />*/}
          {/*)}*/}

          {Store.authStore.privilegeId === 3 && (
            <OutLineButton
              secondaryColor
              text={"Przyznaj uprawnienia administatora"}
              onPress={this.setPrivileges}
            />
          )}
        </View>
      </ScreenContainer>
    );
  }

  addBoardGame = () => {
    Store.propsStore.clearGame();
    NavigationService.navigate(Scenes.AddItem);
  };

  loanGame = () => {
    NavigationService.navigate(Scenes.LoanGame);
  };

  setPrivileges = () => {
    NavigationService.navigate(Scenes.Privilege);
  };

  changePassword = () => {
    NavigationService.navigate(Scenes.ChangePassword);
  };

  history = () => {
    NavigationService.navigate(Scenes.HistoryLoan);
  };

  about = () => {
    NavigationService.navigate(Scenes.About);
  };

  logout = async () => {
    try {
      axios.defaults.headers.common["authorization"] = null;
      NavigationService.reset(Scenes.List);
      Toast.show("Wylogowano");
      await AsyncStorage.removeItem("User");
      Store.authStore.clearUser();
    } catch (error) {
      Toast.show(error);
    }
  };
}

export default inject("authStore", "propsStore")(observer(Panel));
