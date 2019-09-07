import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: any;
  value: string;
  underlineColorAndroid?: string;
}
export default class Input extends Component<Props> {
  static defaultProps = {
    underlineColorAndroid: "transparent",
    value: "text"
  };
  render() {
    return (
      <TextInput
        underlineColorAndroid={this.props.underlineColorAndroid}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={(text: string) => this.props.onChangeText(text)}
        value={this.props.value}
        autoCapitalize="none"
        style={styles.textInputStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    alignSelf: "center",
    margin: 10
  }
});
