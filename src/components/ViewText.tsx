import React, { Component } from "react";
import { RCView, RCText } from "./StyledComponent";
interface Props {
  text: string;
}
export default class ViewText extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
        <RCView>
          <RCText>{this.props.text}</RCText>
        </RCView>
    );
  }
}
