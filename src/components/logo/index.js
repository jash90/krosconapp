import React, { Component } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { Icon } from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Color from "../../Color";

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          borderRadius: 360,
          width: this.props.size,
          height: this.props.size,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          margin: 10,
          backgroundColor: 'white'
        }}
      >
        <TouchableOpacity>
          <Image
          source={require('../../img/muffin.png')}
            style={{ width:this.props.size-20, height:this.props.size-20}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
