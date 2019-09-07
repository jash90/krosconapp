import { Icon } from "native-base";
import React, { Component } from "react";
import { Platform, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Color from "../Color";
import { FabProps } from "../interfaces";
export default class Fab extends Component<FabProps> {
  render() {
    return (
      <LinearGradient
        colors={[Color.primaryColor, Color.accentColor]}
        style={{
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: 360,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon
            name={this.props.icon}
            style={{
              color: "white",
              paddingTop: Platform.OS == "ios" ? 5 : 0
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
