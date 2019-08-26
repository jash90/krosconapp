import React from "react";
import { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Text,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { Container, Button } from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Item, Label, Input } from "native-base";
import { Spacer, RCText, RCView } from "../components/StyledComponent";
import { Props } from "../interfaces";
import Scenes from "../Scenes";
const Icon = createIconSetFromIcoMoon(selection);

interface State {
  password: string;
  repeatPassword: string;
}
export default class ChangePassword extends Component<Props, State> {
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
        scrollView={true}
        right
        icon={"save"}
        onPress={() => this.save()}>
        <RCView>
          <TextInput
            value={this.state.password}
            placeholder={"Hasło"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={password => this.setState({ password })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.repeatPassword}
            placeholder={"Powtórz hasło"}
            style={{ fontSize: 16 }}
            onChangeText={repeatPassword => this.setState({ repeatPassword })}
          />
        </RCView>
      </Container>
    );
  }
  save = () => {
    this.props.navigation.navigate(Scenes.List);
  };
}
