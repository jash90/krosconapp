import React, { Component } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    Text
} from "react-native";

interface Props extends TextInputProps {
    error?: boolean | null;
    errorText?: string;
}
interface State {
    validate: boolean;
}

export default class Input extends Component<Props, State> {
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
        refs.forEach((ref: Input | null | undefined) => {
            if (ref) ref.validate();
        });
    }

    render() {
        return (
            <View
                style={{
                    height:50,
                    backgroundColor: "white",
                    borderRadius: 20,
                    justifyContent: "flex-end",
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    borderColor:
                        this.props.error && this.state.validate
                            ? "red"
                            : "white",
                    borderWidth: 1
                }}>
                {!!this.props.value && this.props.value.length > 0 && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: "grey",
                            paddingVertical: 2
                        }}>
                        {this.props.placeholder}
                    </Text>
                )}
                <TextInput
                    autoCapitalize={this.props.autoCapitalize}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.onChangeText}
                    value={this.props.value}
                    multiline={this.props.multiline}
                    style={[
                        this.props.style,
                        {
                            flex: 1,
                            fontSize: 16,
                            paddingTop:
                                this.props.value && this.props.value.length > 0
                                    ? 0
                                    : 18.7,
                            paddingBottom:
                                this.props.error && this.state.validate
                                    ? 0
                                    : 18.7
                        }
                    ]}
                />
                {this.props.error && this.state.validate && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: "red",
                            paddingVertical: 2
                        }}>
                        {this.props.errorText}
                    </Text>
                )}
            </View>
        );
    }
    onChangeText = (text: string) => {
        this.setState({ validate: false });
        if (this.props.onChangeText) this.props.onChangeText(text);
    };
}
