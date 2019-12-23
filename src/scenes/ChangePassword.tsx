import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AuthApi } from "../api";
import { Container, Input } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Toast from "react-native-simple-toast";
import Store from "../stores";
import { Alert } from "react-native";

interface State {
  password: string;
  repeatPassword: string;
}
class ChangePassword extends Component<SceneProps, State> {
  public password: any;
  public repeatPassword: any;
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
        text={"Zmiana hasła"}
        scrollView
        right
        icon={"save"}
        onPress={() => this.save()}>
        <Input
          ref={ref => (this.password = ref)}
          value={this.state.password}
          placeholder={"Hasło"}
          secureTextEntry
          error={this.state.password.length < 5}
          errorText={"Hasło musi składać się z 5 znaków"}
          onChangeText={password => this.setState({ password })}
        />
        <Input
          ref={ref => (this.repeatPassword = ref)}
          value={this.state.repeatPassword}
          placeholder={"Powtórz hasło"}
          secureTextEntry
          error={this.state.repeatPassword.length < 5}
          errorText={"Hasła muszą być takie same"}
          onChangeText={repeatPassword => this.setState({ repeatPassword })}
        />
      </Container>
    );
  }
  save = () => {
    const { password, repeatPassword } = this.state;
    Input.validate([this.password, this.repeatPassword]);
    if (!password) {
      Toast.show("Hasło musi składać się z 5 znaków");
      return;
    }
    if (!repeatPassword) {
      Toast.show("Hasła muszą być takie same");
      return;
    }
    Alert.alert(
      "Zmiana hasła użytkownika",
      `Czy chcesz zmienić hasło ?`,
      [
        {
          text: "Nie",
          style: "cancel"
        },
        { text: "Tak", onPress: () => this.changePassword() }
      ],
      { cancelable: false }
    );
  };
  changePassword() {
    AuthApi.changePassword(Store.authStore.id, this.state.password)
      .then(response => {
        if (response.data.item) {
          Toast.show("Zmieniono");
          NavigationService.navigate(Scenes.List);
        } else if (response.data.error)
          ErrorUtil.errorService(response.data.error);
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}
export default inject("authStore", "propsStore")(observer(ChangePassword));
