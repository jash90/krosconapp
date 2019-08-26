import React, { Component } from "react";
import { Container, GameHeader, UserHeader } from "../components";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
import { View } from "react-native";
import {
  Spacer,
  RCText,
  RCView,
  RCViewCenter
} from "../components/StyledComponent";
import QRCode from "react-native-qrcode";
interface Props {
  code:string
}
class QR extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Container
        text={"Kod QR"}
        navigation={this.props.navigation}
        styleContent={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"red"
        }}>
 
          <QRCode
            value={this.props.code}
            bgColor="black"
            fgColor="white"
          />
   
      </Container>
    );
  }
}

export default QR;
