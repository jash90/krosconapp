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

import {
    Container,
  Separator,
  Logo,
  Input,
  Head,
  Button,
  UserHeader
} from "../components";
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
      <Container
          navigation={this.props.navigation}
          back={true}
          text={"Panel Administratora"}
        >
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}>
          <UserHeader
            navigation={this.props.navigation}
            firstname={"Bartłomiej"}
            lastname={"Zimny"}
            email={"bartek@gmail.com"}
            city={"Strzyżów"}
            age={25}
            allLoan={9}
            countLoan={1}
          />

          {/* <Button
            style={{ paddingVertical: 10 }}
            text={"Wypożycz grę"}
            onPress={() => this.loanGame()}
          /> */}

          <Button
            style={{ paddingVertical: 10 }}
            text={"Dodaj grę"}
            onPress={this.addItem}
          />
        </View>
      </Container>
    );
  }

  addItem = () => {
    this.props.navigation.navigate("AddItem");
  };
  giveBackGame = () => {
 //   this.props.navigation.navigate("Camera", { action: "giveBackGame" });
  };
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  }
});
