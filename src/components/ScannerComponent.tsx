import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import { RCView } from "./StyledComponent";
interface Props {
  value: any[];
  onPress: any;
}
class ScannerComponent extends Component<Props> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ marginHorizontal: 20 }}>
        <RCView>
          <Text
            style={{
              fontSize: 16,
            }}>
            {"Skanuj kod QR"}
          </Text>
        </RCView>
      </TouchableOpacity>
    );
  }
}

export default ScannerComponent;
