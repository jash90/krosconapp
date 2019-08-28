import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import Color from "../Color";
import { Container, Button, UserHeader } from "../components";
import AuthStore from "../stores/AuthStore";
import Toast from "react-native-simple-toast";
import { inject, observer } from "mobx-react";
import Scenes from"../Scenes";
import axios from "../Axios";
interface State {
  password: string;
  repeatPassword: string;
}
interface Props {
  authStore: AuthStore;
}
class Panel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: ""
    };
  }

  render() {
    return (
      <Container
        navigation={this.props.navigation}
        back={false}
        left={true}
        leftIcon={"arrow-back"}
        leftPress={() => this.props.navigation.navigate(Scenes.List)}
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
            navigation={this.props.navigation}
            edit
            user={this.props.authStore}
          />

          <Button
            primary
            color={Color.secondaryColor}
            colorText="white"
            text={"Zmień hasło"}
            onPress={this.changePassword}
          />

          {this.props.authStore.privilegeId > 1 && (
            <Button
              primary
              color={`${Color.accentColor}`}
              colorText="white"
              text={"Wypożycz grę / Oddaj grę"}
              onPress={this.loanGame}
            />
          )}

          {this.props.authStore.privilegeId > 1 && (
            <Button
              outline
              color={`${Color.accentColor}`}
              text={"Dodaj"}
              onPress={this.addBoardGame}
            />
          )}

          {this.props.authStore.privilegeId === 3 && (
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
    this.props.navigation.navigate(Scenes.AddItem);
  };

  loanGame = () => {
    this.props.navigation.navigate(Scenes.LoanGame);
  };

  setPrivileges = () => {
    this.props.navigation.navigate(Scenes.Privilege);
  };

  changePassword = () => {
    this.props.navigation.navigate(Scenes.ChangePassword);
  };

  logout = async () => {
    try {
      this.props.authStore.clearUser();
      await AsyncStorage.removeItem("User");
      axios.defaults.headers.common['authorization'] = null;
      this.props.navigation.navigate(Scenes.List);
      Toast.show("Wylogowano");
    } catch (error) {
      Toast.show(error);
    }
  };
}

export default inject("authStore")(observer(Panel));
