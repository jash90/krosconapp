import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ScreenContainer from "../../../components/ScreenContainer";
import {RCViewCenter} from "../../../components/StyledComponent";
import Store from "../../../stores";
import {SceneProps} from "../../../utils/interfaces";

class QR extends Component<SceneProps> {
    render() {
        const code = Store.authStore.email.toString();
        return (
            <ScreenContainer text={"Kod QR"}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <RCViewCenter>
                        <QRCode
                            value={code}
                            color="black"
                            backgroundColor="white"
                            size={Dimensions.get("window").width * 0.8}
                        />
                    </RCViewCenter>
                </View>
            </ScreenContainer>
        );
    }
}

export default inject("authStore", "propsStore")(observer(QR));
