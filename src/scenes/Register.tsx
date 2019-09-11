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
  public firstname: any;
  public lastname: any;
  public email: any;
  public password: any;
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
          ref={ref => (this.firstname = ref)}
          value={this.state.firstname}
          placeholder={"Imię"}
          error={this.state.firstname.length === 0}
          errorText={"Podaj imię"}
          onChangeText={(firstname: any) => this.setState({ firstname })}
        />
        <Input
          ref={ref => (this.lastname = ref)}
          value={this.state.lastname}
          placeholder={"Nazwisko"}
          error={this.state.lastname.length === 0}
          errorText={"Podaj nazwisko"}
          onChangeText={(lastname: any) => this.setState({ lastname })}
        />
        <Input
          ref={ref => (this.email = ref)}
          autoCapitalize={"none"}
          value={this.state.email}
          placeholder={"Email"}
          error={this.state.email.length === 0}
          errorText={"Podaj email"}
          onChangeText={(email: any) => this.setState({ email })}
        />
        <Input
          ref={ref => (this.password = ref)}
          autoCapitalize={"none"}
          value={this.state.password}
          placeholder={"Hasło"}
          secureTextEntry
          error={this.state.password.length < 5}
          errorText={"Hasło musi posiadać conajmniej 5 znaków"}
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
    Input.validate([this.firstname, this.lastname, this.email, this.password]);
    if (!email) {
      Toast.show("Podaj email");
      return;
    }
    if (!password) {
      Toast.show("Hasło musi składać się z 5 znaków");
      return;
    }
    if (!firstname) {
      Toast.show("Podaj imię");
      return;
    }
    if (!lastname) {
      Toast.show("Podaj nazwisko");
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
