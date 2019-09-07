import { inject, observer } from "mobx-react";
import { Toast } from "native-base";
import React, { Component } from "react";
import { TextInput } from "react-native";
import { AuthApi } from "../api";
import { Container } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
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
        
        scrollView={true}
        right
        icon={"save"}
        styleContent={{ flex: 1, paddingHorizontal: 20 }}
        onPress={() => this.save()}>
        <RCView>
          <TextInput
            value={this.state.password}
            placeholder={"Hasło"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={password => this.setState({ password })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.repeatPassword}
            placeholder={"Powtórz hasło"}
            style={{ fontSize: 16 }}
            onChangeText={repeatPassword => this.setState({ repeatPassword })}
          />
        </RCView>
      </Container>
    );
  }
  save = () => {
    AuthApi.changePassword(this.props.authStore.id, this.state.password)
      .then(response => {
        if (!response.data.error) {
          Toast.show("Zmieniono");
          NavigationService.navigate(Scenes.List);
        } else {
          if (response.data.error) ErrorUtil.errorService(response.data.error);
        }
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  };
}
export default inject("authStore","propsStore")(observer(ChangePassword));
