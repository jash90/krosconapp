import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
  AsyncStorage,
  Alert
} from "react-native";

import {
  Content
} from "native-base";


import { Actions } from "react-native-router-flux";

import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Color from "../Color";
import Language from "../Language";
import Container from "@components/container";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount = () => {
  };

  async componentDidMount() {

  }
  render() {
    return (
      <Container
        back={false} 
        right={true}
        icon={"person-add"}
        text={Language.get("sign")}
        onPress={() => Actions.Register()}>
        <View>
          <Logo size={150} />
          <Input
            placeholder={Language.get("email")}
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email} />
          <Input
            placeholder={Language.get("password")}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password} />
        </View>
        <Content contentContainerStyle={styles.buttonContener}>
          <Button text={Language.get("login")} onPress={() => this.login()} />
          <FacebookButton
            text={Language.get("signFace")}
            onPress={() => this.facebookLogin()} />
          <GoogleButton
            text={Language.get("signGoogle")}
            onPress={() => this.googleLogin()} />
        </Content>
      </Container>
    );
  }
  async saveloginhaslo(login, password) {
  }
  googleLogin = async () => {
  };
  facebookLogin = async () => {

  };

  login() {
    Actions.Loading();
  }
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1,
    backgroundColor: Color.primaryColor
  },
  buttonContener: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
