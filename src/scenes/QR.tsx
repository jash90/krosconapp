import React, { Component } from "react";
import { Container, GameHeader, UserHeader } from "../components";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
import { View, Dimensions } from "react-native";
import {
  Spacer,
  RCText,
  RCView,
  RCViewCenter
} from "../components/StyledComponent";
import QRCode from "react-native-qrcode";

class QR extends Component<{}> {
  render() {
    const code = this.props.navigation.state.params.code;
    console.log(code);
    return (
      <Container
        text={"Kod QR"}
        styleContent={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <RCViewCenter>
          <QRCode
            value={code}
            bgColor="black"
            fgColor="white"
            size={Dimensions.get("window").width * 0.8}
          />
        </RCViewCenter>
      </Container>
    );
  }
}

export default QR;
