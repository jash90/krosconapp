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

interface State {
  password: string;
  repeatPassword: string;
}
class ChangePassword extends Component<SceneProps, State> {
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
        styleContent={{ flex: 1, paddingHorizontal: 20 }}
        onPress={() => this.save()}>
          <Input
            value={this.state.password}
            placeholder={"Hasło"}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          <Input
            value={this.state.repeatPassword}
            placeholder={"Powtórz hasło"}
            secureTextEntry
            onChangeText={repeatPassword => this.setState({ repeatPassword })}
          />
      </Container>
    );
  }
  save = () => {
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
  };
}
export default inject("authStore", "propsStore")(observer(ChangePassword));
