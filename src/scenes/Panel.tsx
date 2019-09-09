import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import Color from "../Color";
import { Container, Button, UserHeader } from "../components";
import Toast from "react-native-simple-toast";
import { inject, observer } from "mobx-react";
import Scenes from"../Scenes";
import axios from "../Axios";
import NavigationService from "../NavigationService";
import { SceneProps } from "../interfaces";
import Store from "../stores";

interface State {
  password: string;
  repeatPassword: string;
}
class Panel extends Component<SceneProps, State> {
  constructor(props: SceneProps) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: ""
    };
  }

  render() {
    return (
      <Container
        back={false}
        left
        leftIcon={"arrow-back"}
        leftPress={() => NavigationService.navigate(Scenes.List)}
        right
        scrollView
        text={"Panel"}
        icon={"input"}
        onPress={this.logout}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}>
          <UserHeader
            edit
            user={Store.authStore}
          />

          <Button
            primary
            color={Color.secondaryColor}
            colorText="white"
            text={"Zmień hasło"}
            onPress={this.changePassword}
          />

          {Store.authStore.privilegeId > 1 && (
            <Button
              primary
              color={`${Color.accentColor}`}
              colorText="white"
              text={"Wypożycz grę / Oddaj grę"}
              onPress={this.loanGame}
            />
          )}

          {Store.authStore.privilegeId > 1 && (
            <Button
              outline
              color={`${Color.accentColor}`}
              text={"Dodaj"}
              onPress={this.addBoardGame}
            />
          )}

          {Store.authStore.privilegeId === 3 && (
            <Button
              outline
              color={Color.secondaryColor}
              text={"Przyznaj uprawnienia administatora"}
              onPress={this.setPrivileges}
            />
          )}
        </View>
      </Container>
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

  logout = async () => {
    try {
      NavigationService.reset(Scenes.List);
      Store.authStore.clearUser();
      await AsyncStorage.removeItem("User");
      axios.defaults.headers.common['authorization'] = null;
      Toast.show("Wylogowano");
    } catch (error) {
      Toast.show(error);
    }
  };
}
export default inject("authStore","propsStore")(observer(Panel));
