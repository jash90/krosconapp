import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "@emotion/native";
import Color from "../Color";
import { ButtonProps } from "../interfaces";

const Primary = styled.View`
  width: 90%;
  height: 50px;
  border-radius:20px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.color};
  align-self: center;
`;

const Outline = styled.View`
  width: 90%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-color: ${(props: any) => props.color};
  border-width: 1px;
  border-radius:20px;
  align-self: center;
`;

const CText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.color};
`;
interface ColorButtonProps extends ButtonProps{
  color?:string;
  colorText?:string;
  outline?:boolean;
  primary?:boolean;
}

export default class Button extends Component<ColorButtonProps> {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          marginVertical:10
        }}
        onPress={this.props.onPress}>
        {this.props.outline && this.renderOutline()}
        {this.props.primary && this.renderPrimary()}
      </TouchableOpacity>
    );
  }

  renderOutline() {
    return (
      <Outline color={this.props.color}>
        <CText color={this.props.color}>{this.props.text}</CText>
      </Outline>
    );
  }
  renderPrimary() {
    return (
      <Primary color={this.props.color}>
        <CText color={this.props.colorText}>{this.props.text}</CText>
      </Primary>
    );
  }
}
