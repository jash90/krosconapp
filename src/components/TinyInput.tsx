import React, {Component} from "react";
import {Text, TextInput, TextInputProps} from "react-native";
import {RCView} from "./StyledComponent";

interface Props extends TextInputProps {
  firstDescription: string;
  secondDescription: string;
  error?: boolean | null;
  errorText?: string;
}

interface State {
  validate: boolean;
}

export default class TinyInput extends Component<Props, State> {
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
    refs.forEach((ref: TinyInput | null | undefined) => {
      if (ref) ref.validate();
    });
  }

  render() {
    return (
      <RCView
        flexDirection="row"
        style={
          this.props.error && this.state.validate
            ? {
                borderColor: "red",
                borderWidth: 1
              }
            : {}
        }
      >
        <Text style={{ color: "black", fontSize: 16 }}>
          {this.props.firstDescription}
        </Text>
        <TextInput
          style={{
            textAlign: "right",
            fontSize: 16,
            width: this.props.maxLength ? this.props.maxLength * 12 : 20
          }}
          keyboardType="phone-pad"
          value={this.props.value}
          maxLength={this.props.maxLength}
          onChangeText={this.onChangeText}
        />
        <Text style={{ color: "black", fontSize: 16 }}>
          {this.props.secondDescription}
        </Text>
      </RCView>
    );
  }

  onChangeText = (text: string) => {
    this.setState({ validate: false });
    if (this.props.onChangeText) this.props.onChangeText(text);
  };
}
