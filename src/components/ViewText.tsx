import React, { Component } from "react";
import { TouchableHighlight } from "react-native";
import { RCView, RCText } from "./StyledComponent";
interface Props {
  label:string;
  text: string;
  onPress:any;
}
export default class ViewText extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <RCView style={{justifyContent:"space-between"}}>
          <RCText>{this.props.label}</RCText>
          <RCText>{this.props.text}</RCText>
        </RCView>
      </TouchableHighlight>
    );
  }
}
