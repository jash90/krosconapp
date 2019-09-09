import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { RCView } from "./StyledComponent";
interface Props {
  value: any[];
  onPress: any;
}
class ScannerComponent extends Component<Props> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <RCView>
          <Text
            style={{
              fontSize: 16
            }}>
            {"Skanuj kod QR"}
          </Text>
        </RCView>
      </TouchableOpacity>
    );
  }
}

export default ScannerComponent;
