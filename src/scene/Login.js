import React, {Component} from "react";
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
  Container,
  Header,
  Title,
  Content,
  Fab,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import {Actions} from "react-native-router-flux";
import Moment from "moment";

import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Head from "@components/head";
import Color from "../Color";
import Language from "../Language";

import firebase from "react-native-firebase";
import Toast from "react-native-simple-toast";
import LoadingScreen from "./LoadingScreen";

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
      <Container>
        <Head
          right={true}
          icon={"person-add"}
          text={Language.get("sign")}
          onPress={() => Actions.Register()}/>
        <View style={styles.fullStyle}>
          <View>
            <Logo size={150}/>
            <Input
              placeholder={Language.get("email")}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}/>
            <Input
              placeholder={Language.get("password")}
              secureTextEntry={true}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}/>
          </View>
          <Content contentContainerStyle={styles.buttonContener}>
            <Button text={Language.get("login")} onPress={() => this.login()}/>
            <FacebookButton
              text={Language.get("signFace")}
              onPress={() => this.facebookLogin()}/>
            <GoogleButton
              text={Language.get("signGoogle")}
              onPress={() => this.googleLogin()}/>
          </Content>
        </View>
      </Container>
    );
  }
  async saveloginhaslo(login, password) {
  }
  googleLogin = async() => {
  };
  facebookLogin = async() => {
  
  };

  login() {
   Actions.Loading();
  }
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1,
    backgroundColor:Color.primaryColor
  },
  buttonContener: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
