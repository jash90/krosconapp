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
export default class Person extends Component<Props, State> {
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
          right={true}
          text={Language.get("editProfile")}
          icon={"save"}
          onPress={() => this.changePassword()}
        />
        <Content style={styles.fullStyle}>
          <Logo size={100} />
          <Separator text={Language.get("changePassword")} />
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
              text={Language.get("logout")}
              onPress={() => this.signOutUser()}
            />
          </View>
        </Content>
      </Container>
    );
  }

  signOutUser = () => {
    this.props.navigation.navigate("Login");
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
