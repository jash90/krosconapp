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
interface State {
  email: string;
  password: string;
}
export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount = () => {};

  async componentDidMount() {}
  render() {
    return (
      <Container
        navigation={this.props.navigation}
        back={false}
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
          <Button text={Language.get("login")} onPress={() => this.login()} />
          <FacebookButton
            text={Language.get("signFace")}
            onPress={() => this.facebookLogin()}
          />
          <GoogleButton
            text={Language.get("signGoogle")}
            onPress={() => this.googleLogin()}
          />
        </Content>
      </Container>
    );
  }
  async saveloginhaslo(login: string, password: string) {}
  googleLogin = () => {};
  facebookLogin = () => {};

  login() {
    this.props.navigation.navigate("LoadingScreen");
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
