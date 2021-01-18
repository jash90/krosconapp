import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";
import {RCView} from "./StyledComponent";

interface Props {
    value: any[];
    onPress: any;
    error?: boolean;
    scannerText?: string;
}
class ScannerComponent extends Component<Props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <RCView
                    style={
                        this.props.error
                            ? { borderColor: "red", borderWidth: 1 }
                            : {}
                    }>
                    <Text
                        style={{
                            fontSize: 16
                        }}>
                        {this.props.scannerText}
                    </Text>
                </RCView>
            </TouchableOpacity>
        );
    }
}

export default ScannerComponent;
