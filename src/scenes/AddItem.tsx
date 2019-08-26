import React from "react";
import { Component } from "react";
import { Container, Dropdown, Button } from "../components";
import { RCView } from "../components/StyledComponent";
import { TextInput, View } from "react-native";

interface State {
  items: any[];
  value: any;
  name: string;
}
export default class AddItem extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: ["Wydawca", "Typ", "Mechanika"],
      value: "",
      name: ""
    };
  }
  render() {
    return (
      <Container navigation={this.props.navigation} scrollView={true}>
        <Dropdown
          items={this.state.items}
          value={this.state.value}
          onSelect={(item: any) => {
            this.setState({ value: item });
          }}
        />
        <RCView>
          <TextInput
            value={this.state.name}
            placeholder={"Nazwa"}
            style={{ flex:1,fontSize: 16 }}
            onChangeText={name => this.setState({ name })}
          />
        </RCView>
        <Button
          color="black"
          colorText="white"
          text="Zapisz"
          onPress={() => this.setState({ value: "" })}
        />
      </Container>
    );
  }
}
