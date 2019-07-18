import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Color from "../Color";
import Language from "../Language";
import { Container, Logo, Input, Button } from "../components";
import { Props } from "../interfaces";
interface State {
  email: string;
  password: string;
  repeatPassword: string;
}
export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPassword: ""
    };
  }

  render() {
    return (
      <Container navigation={this.props.navigation}>
        <Logo size={100} />
        <Input
          underlineColorAndroid="transparent"
          placeholder={Language.get("email")}
          value={this.state.email}
          onChangeText={(text: string) => this.setState({ email: text })}
        />
        <Input
          underlineColorAndroid="transparent"
          placeholder={Language.get("password")}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text: string) => this.setState({ password: text })}
        />
        <Input
          underlineColorAndroid="transparent"
          placeholder={Language.get("repeatPassword")}
          secureTextEntry={true}
          value={this.state.repeatPassword}
          onChangeText={(text: string) =>
            this.setState({ repeatPassword: text })
          }
        />
        <View
          style={{
            marginTop: 10
          }}>
          <Button
            text={Language.get("register")}
            onPress={() => this.register()}
          />
        </View>
      </Container>
    );
  }
  register() { }
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1,
    backgroundColor: Color.primaryColor
  }
});
