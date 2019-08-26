import React, { Component } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Container } from "../components";
import { RCView } from "../components/StyledComponent";
import Scenes from "../Scenes";
const Icon = createIconSetFromIcoMoon(selection);
interface Props {
  data: any;
}
interface State {
  firstname: string;
  lastname: string;
  password: string;
  city: string;
  age: number;
}
export default class EditProfile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      city: "",
      age: 0
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
            value={this.state.firstname}
            placeholder={"Imię"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={firstname => this.setState({ firstname })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.lastname}
            placeholder={"Nazwisko"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={lastname => this.setState({ lastname })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.city}
            placeholder={"Miasto"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={city => this.setState({ city })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={String(this.state.age)}
            placeholder={"Wiek"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={age => this.setState({ age: Number(age) })}
          />
        </RCView>
      </Container>
    );
  }
  save = () => {
    this.props.navigation.navigate(Scenes.List);
  };

  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
