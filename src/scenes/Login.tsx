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
  Alert,
  TextInput
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
import AuthApi from "../api/AuthApi";
import Toast from "react-native-simple-toast";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
import { RCView } from "../components/StyledComponent";
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
        scrollView
        icon={"person-add"}
        text={Language.get("sign")}
        onPress={() => this.props.navigation.navigate("Register")}>
        <View>
          <Logo size={150} />
          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.email}
              placeholder={"Email"}
              style={{ fontSize: 16 }}
              onChangeText={(email: any) => this.setState({ email })}
            />
          </RCView>
          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.password}
              placeholder={"Hasło"}
              secureTextEntry={true}
              style={{ fontSize: 16 }}
              onChangeText={(password: any) => this.setState({ password })}
            />
          </RCView>
        </View>
        <Content contentContainerStyle={styles.buttonContener}>
          <Button
            primary
            color={Color.accentColor}
            colorText={"white"}
            text={"Zaloguj"}
            onPress={this.login}
          />
        </Content>
      </Container>
    );
  }

  login = async () => {
    const response = await AuthApi.login(this.state.email, this.state.password);
    console.log(response);
    const data = response.data;
    if (data.error) {
      Toast.show("Niepoprawny login lub hasło.");
    }
    if (data.item) {
      this.props.authStore.setUser(data.item);
      console.log(data.item);
      await AsyncStorage.setItem("User", JSON.stringify(data.item));
      this.props.navigation.navigate("List");
    }
    console.log(response);
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
