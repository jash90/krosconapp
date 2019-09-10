import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text
} from "react-native";
import { RCView } from "./StyledComponent";

interface Props extends TextInputProps {
  error?: boolean | null;
  errorText?: string;
}

export default class Input extends Component<Props> {
  static defaultProps = {
    underlineColorAndroid: "transparent",
    value: "text"
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 20,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          marginVertical: 10,
          borderColor: this.props.error ? "red" : "white",
          borderWidth: 1
        }}>
        {!!this.props.value && this.props.value.length > 0 && (
          <Text style={{ fontSize: 12, color: "grey", paddingVertical: 2 }}>
            {this.props.placeholder}
          </Text>
        )}
        <TextInput
          autoCapitalize={this.props.autoCapitalize}
          underlineColorAndroid={this.props.underlineColorAndroid}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          multiline={this.props.multiline}
          style={{
            fontSize: 16,
            paddingTop:
              this.props.value && this.props.value.length > 0 ? 0 : 18.7,
            paddingBottom: this.props.error ? 0 : 18.7
          }}
        />
        {this.props.error && (
          <Text style={{ fontSize: 12, color: "red", paddingVertical: 2 }}>
            {this.props.errorText}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {}
});
