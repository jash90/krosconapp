import React, { Component } from "react";

import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from "native-base";

import Color from "../Color";
import { ButtonProps } from "../interfaces";
export default class FacebookButton extends Component<ButtonProps> {
  render() {
    return (
      <View
        style={{
          borderRadius: 20,
          width: "90%",
          height: 60,
          justifyContent: "center",
          backgroundColor: Color.facebook
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props.onPress}
        >
          <Icon name="logo-facebook" style={{ color: "white", fontSize: 20 }} />
          <Text style={{ color: "white", fontSize: 20, paddingLeft: 10 }}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
