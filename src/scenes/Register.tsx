import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import Color from "../Color";
import Language from "../Language";
import { Container, Logo, Input, Button } from "../components";
import { Props } from "../interfaces";
import { RCView } from "../components/StyledComponent";
import AuthApi from "../api/AuthApi";
import Toast from "react-native-simple-toast";
import { observer, inject } from "mobx-react";
import Scenes from"../Scenes";
interface State {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
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
      <Container scrollView navigation={this.props.navigation}>
        <Logo size={50} />
        <RCView>
          <TextInput
            value={this.state.firstname}
            placeholder={"Imię"}
            style={{ fontSize: 16 }}
            onChangeText={(firstname: any) => this.setState({ firstname })}
          />
        </RCView>

        <RCView>
          <TextInput
            value={this.state.lastname}
            placeholder={"Nazwisko"}
            style={{ fontSize: 16 }}
            onChangeText={(lastname: any) => this.setState({ lastname })}
          />
        </RCView>

        <RCView>
          <TextInput
            autoCapitalize={'none'}
            value={this.state.email}
            placeholder={"Email"}
            style={{ fontSize: 16 }}
            onChangeText={(email: any) => this.setState({ email })}
          />
        </RCView>

        <RCView>
          <TextInput
            autoCapitalize={'none'}
            value={this.state.password}
            placeholder={"Hasło"}
            secureTextEntry={true}
            style={{ fontSize: 16, flex: 1 }}
            onChangeText={(password: any) => this.setState({ password })}
          />
        </RCView>

        <View>
          <Button
            primary
            color={"black"}
            colorText={"white"}
            text={Language.get("register")}
            onPress={() => this.register()}
          />
        </View>
      </Container>
    );
  }
  async register() {
    const response = await AuthApi.register(
      this.state.email,
      this.state.password,
      this.state.firstname,
      this.state.lastname
    );
    console.log(response);
    const data = response.data;
    if (data.error) {
      Toast.show("Niepoprawny login lub hasło.");
    }
    if (data.item) {
      Toast.show(`Utworzyłeś konto ${this.state.email}.`);
      this.props.navigation.navigate(Scenes.Login);
    }
    console.log(response);
  }
}
export default inject("authStore")(observer(Register));