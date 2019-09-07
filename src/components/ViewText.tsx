import React, { Component } from "react";
import { TouchableHighlight, View } from "react-native";
import { RCText, RCView } from "./StyledComponent";
interface Props {
  label: string;
  text: string;
  onPress?: any;
  onlyText?: boolean;
  withOutClick?: boolean;
}
export default class ViewText extends Component<Props> {
  render() {
    if (this.props.onlyText) {
      return <View>{this.renderText()}</View>;
    }
    if (this.props.withOutClick) {
      return <RCView>{this.renderText()}</RCView>;
    }
    if (!this.props.onlyText && !this.props.withOutClick) {
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          <RCView>{this.renderText()}</RCView>
        </TouchableHighlight>
      );
    }
  }

  renderText() {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <RCText>{this.props.label}</RCText>
        <RCText>{this.props.text}</RCText>
      </View>
    );
  }
}
