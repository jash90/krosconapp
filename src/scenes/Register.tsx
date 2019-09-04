import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import Color from "../Color";
import Language from "../Language";
import { Container, Logo, Input, Button } from "../components";
import { RCView } from "../components/StyledComponent";
import AuthApi from "../api/AuthApi";
import Toast from "react-native-simple-toast";
import { observer, inject } from "mobx-react";
import Scenes from "../Scenes";
import ErrorUtil from "../ErrorUtil";
import AuthStore from "../stores/AuthStore";
import NavigationService from "../NavigationService";
interface State {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

interface Props{
  authStore:AuthStore;
}

class Register extends Component<Props, State> {
  constructor(props: Props) {
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
      <Container scrollView>
        <Logo size={50} />
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <RCView>
            <TextInput
              value={this.state.firstname}
              placeholder={"Imię"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(firstname: any) => this.setState({ firstname })}
            />
          </RCView>

          <RCView>
            <TextInput
              value={this.state.lastname}
              placeholder={"Nazwisko"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(lastname: any) => this.setState({ lastname })}
            />
          </RCView>

          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.email}
              placeholder={"Email"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(email: any) => this.setState({ email })}
            />
          </RCView>

          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.password}
              placeholder={"Hasło"}
              secureTextEntry={true}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(password: any) => this.setState({ password })}
            />
          </RCView>
        </View>

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
        const data = response.data;
        if (data.item) {
          Toast.show(`Utworzyłeś konto ${this.state.email}.`);
          NavigationService.navigate(Scenes.Login);
        }
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}
export default inject("authStore")(observer(Register));
