import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import { Actions } from "react-native-router-flux";

import Language from "../Language";

import { Separator, Logo, Input, Head, Button } from "../components";
import { Props } from "../interfaces";
interface State {
  password: string;
  repeatPassword: string;
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: ""
    };
  }

  render() {
    return (
      <Container>
        <Head
          navigation={this.props.navigation}
          back={true}
          text={Language.get("editProfile")}
        />
        <View style={{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: "space-evenly" }}>

          <Button
            style={{ paddingVertical: 10 }}
            text={"Wypożycz grę"}
            onPress={() => this.loanGame()}
          />

          <Button
            style={{ paddingVertical: 10 }}
            text={"Oddaj grę"}
            onPress={() => this.giveBackGame()}
          />

        </View>
      </Container>
    );
  }

  loanGame = () => {
    this.props.navigation.navigate("Camera", {action:"loanGame"});
  };
  giveBackGame = () => {
    this.props.navigation.navigate("Camera",{action:"giveBackGame"});
  };
  changePassword = () => {
    if (this.state.password === "") {
      alert(Language.get("passwordRequired"));
      return;
    }
    if (this.state.repeatPassword === "") {
      alert(Language.get("repeatPassRequired"));
      return;
    }
    if (this.state.password !== this.state.repeatPassword) {
      alert(Language.get("passwordSame"));
      return;
    }
  };
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  }
});
