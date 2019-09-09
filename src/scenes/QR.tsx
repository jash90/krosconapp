import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Dimensions } from "react-native";
import QRCode from "react-native-qrcode";
import { Container } from "../components";
import { RCViewCenter } from "../components/StyledComponent";
import { SceneProps } from "../interfaces";
import Store from "../stores";

class QR extends Component<SceneProps> {
  render() {
    const code = Store.authStore.email.toString();
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
export default inject("authStore","propsStore")(observer(QR));