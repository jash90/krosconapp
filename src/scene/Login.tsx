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

import { Content } from "native-base";

import { Actions } from "react-native-router-flux";
import Color from "../Color";
import Language from "../Language";
import {
  Container,
  Logo,
  GoogleButton,
  FacebookButton,
  Button,
  Input
} from "../components";
import { Props } from "../interfaces";
import axios from "../Axios";
import { AuthApi } from "../api/AuthApi";
import Toast from "react-native-simple-toast";
import { observer, inject } from "mobx-react";
import AuthStore from "../store/AuthStore";
interface State {
  email: string;
  password: string;
}
interface Props {
  authStore: AuthStore;
}
class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount = () => {};

  render() {
    return (
      <Container
        navigation={this.props.navigation}
        right={true}
        icon={"person-add"}
        text={Language.get("sign")}
        onPress={() => this.props.navigation.navigate("Register")}>
        <View>
          <Logo size={150} />
          <Input
            placeholder={Language.get("email")}
            onChangeText={(text: string) => this.setState({ email: text })}
            value={this.state.email}
          />
          <Input
            placeholder={Language.get("password")}
            secureTextEntry={true}
            onChangeText={(text: string) => this.setState({ password: text })}
            value={this.state.password}
          />
        </View>
        <Content contentContainerStyle={styles.buttonContener}>
          <Button
            text={Language.get("login")}
            onPress={async () => await this.login()}
          />
        </Content>
      </Container>
    );
  }

  async login() {
    const response = await AuthApi.login(this.state.email, this.state.password);
    const data = response.data;
    if (data.error){
      Toast.show("Niepoprawny login lub hasło.");
    }
    if (data.item){
      const {email, token, tokenExpired} = data.item;
      this.props.authStore.setEmail(email);
      this.props.authStore.setToken(token);
      this.props.authStore.setTokenExpired(tokenExpired);
      this.props.navigation.navigate("Admin");
    }
    //
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
export default inject("authStore")(observer(Login));