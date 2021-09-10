import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ButtonProps } from "../utils/interfaces";

export default class GoogleButton extends Component<ButtonProps> {
  render() {
    return (
      <Container>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props.onPress}
        >
          <Image
            source={require("../assets/img/google.jpg")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const Container = styled.View({
  borderRadius: 20,
  width: "90%",
  height: 60,
  justifyContent: "center",
  backgroundColor: "white"
});

const Text = styled.Text`
    color: ${props => props.theme.colors.googleColor}
    font-size: 20px;
    padding-left: 10px;
`;
