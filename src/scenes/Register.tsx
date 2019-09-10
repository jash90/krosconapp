import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { View } from "react-native";
import Toast from "react-native-simple-toast";
import AuthApi from "../api/AuthApi";
import { Button, Container, Logo, Input } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import Language from "../Language";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
interface State {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
class Register extends Component<SceneProps, State> {
  constructor(props: SceneProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    };
  }

  render() {
    return (
      <Container scrollView text={"Zarejestruj"}>
        <Logo size={50} />
          <Input
            value={this.state.firstname}
            placeholder={"Imię"}
            onChangeText={(firstname: any) => this.setState({ firstname })}
          />
          <Input
            value={this.state.lastname}
            placeholder={"Nazwisko"}
            onChangeText={(lastname: any) => this.setState({ lastname })}
          />
          <Input
            autoCapitalize={"none"}
            value={this.state.email}
            placeholder={"Email"}
            onChangeText={(email: any) => this.setState({ email })}
          />
          <Input
            autoCapitalize={"none"}
            value={this.state.password}
            placeholder={"Hasło"}
            secureTextEntry
            onChangeText={(password: any) => this.setState({ password })}
          />
        <Button
          primary
          color={"black"}
          colorText={"white"}
          text={Language.get("register")}
          onPress={() => this.register()}
        />
      </Container>
    );
  }
  register() {
    const { email, password, firstname, lastname } = this.state;
    if (!email || !password || !firstname || !lastname) {
      Toast.show("Wypełnij wszystkie pola w celu rejestracji");
      return;
    }
    AuthApi.register(
      this.state.email,
      this.state.password,
      this.state.firstname,
      this.state.lastname
    )
      .then(response => {
        if (response.data.item) {
          Toast.show(`Utworzyłeś konto ${this.state.email}.`);
          NavigationService.navigate(Scenes.Login);
        } else if (response.data.error) {
          Toast.show(`Nie udało się utworzyć konta`);
          ErrorUtil.errorService(response.data.error);
        }
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}
export default inject("authStore", "propsStore")(observer(Register));
