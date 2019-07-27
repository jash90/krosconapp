import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {Icon} from 'native-base';
interface Props{
value:any[]
onPress:any
}
class ScannerComponent extends Component<Props> {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}
          style={{flexDirection: "row", alignItems: "center" }}>
          <Text style={{ paddingRight: 10 }}>{"Skanuj kod"}</Text>
          <Icon name={"camera"} />
        </TouchableOpacity>
    );
  }
}

export default ScannerComponent;
