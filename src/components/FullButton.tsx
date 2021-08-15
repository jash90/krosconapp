import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {ButtonProps} from "../utils/interfaces";

const Primary = styled.View`
    width: 100%;
    height: 50px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${(props: any) => props.color};
    align-self: center;
    ${props => props.accentColor && `
    background-color: ${props.theme.colors.accentColor};
  `}
    ${props => props.secondaryColor && `
    background-color: ${props.theme.colors.secondaryColor};
  `}
`;

const CText = styled.Text`
    font-size: 16px;
    color: ${(props: any) => props.color};
`;

interface ColorButtonProps extends ButtonProps {
    color?: string;
    colorText?: string;
    accentColor?: boolean;
    secondaryColor?: boolean;
}

export default class FullButton extends Component<ColorButtonProps> {
    render() {
        const {colorText, ...other} = this.props;

        return (
            <TouchableOpacity
                style={{
                    marginVertical: 10
                }}
                onPress={this.props.onPress}
            >
                <Primary {...other}>
                    <CText color={colorText}>{this.props.text}</CText>
                </Primary>
            </TouchableOpacity>
        );
    }

}
