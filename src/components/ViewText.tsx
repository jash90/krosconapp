import React, { Component } from "react";
import { TouchableHighlight, Dimensions, View } from "react-native";
import { RCView, RCText } from "./StyledComponent";
interface Props {
  label: string;
  text: string;
  onPress?: any;
  onlyText?: boolean;
  withOutClick?: boolean;
}
export default class ViewText extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    if (this.props.onlyText) {
      return (
        <View>
        {this.renderText()}
        </View>
      );
    }
    if (this.props.withOutClick) {
      return (
        <RCView>
        {this.renderText()}
        </RCView>
      );
    }
    if (!this.props.onlyText && !this.props.withOutClick) {
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          <RCView>
         {this.renderText()}
          </RCView>
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