import React, {Component} from "react";
import {Text, TextInput, TextInputProps} from "react-native";
import {RCView} from "./StyledComponent";

interface Props extends TextInputProps {
    error?: boolean | null;
    errorText?: string;
}
interface State {
    validate: boolean;
}

export default class InputAge extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            validate: false
        };
    }
    static defaultProps = {
        underlineColorAndroid: "transparent",
        value: "text"
    };

    public validate() {
        this.setState({ validate: true });
    }

    public static validate(refs: any[]) {
        refs.forEach((ref: InputAge | null | undefined) => {
            if (ref) ref.validate();
        });
    }

    render() {
        return (
            <RCView>
                <Text
                    style={{
                        color: "black",
                        fontSize: 16
                    }}>
                    {"Wiek"}
                </Text>
                <TextInput
                    style={{
                        textAlign: "right",
                        fontSize: 16,
                        width: 25
                    }}
                    keyboardType="phone-pad"
                    value={this.props.value}
                    maxLength={2}
                    onChangeText={this.onChangeText}
                />
                <Text
                    style={{
                        color: "black",
                        fontSize: 16
                    }}>
                    {"lat +"}
                </Text>
            </RCView>
        );
    }
    onChangeText = (text: string) => {
        this.setState({ validate: false });
        if (this.props.onChangeText) this.props.onChangeText(text);
    };
}
