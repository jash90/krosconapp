import React, {Component} from "react";
import {Image, TouchableOpacity, View} from "react-native";

interface Props {
    size: number;
}

export default class Logo extends Component<Props> {
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
                         backgroundColor: "white"
                       }}
                     >
                       <TouchableOpacity>
                         <Image
                           source={require("../assets/img/logo.png")}
                           style={{
                             width: this.props.size - 20,
                             height: this.props.size - 20
                           }}
                         />
                       </TouchableOpacity>
                     </View>
                   );
                 }
               }
