import {Icon} from "native-base";
import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {ButtonProps} from "../utils/interfaces";

export default class FacebookButton extends Component<ButtonProps> {
    render() {
        return (
            <Container>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={this.props.onPress}
                >
                    <Icon
                        name="logo-facebook"
                        style={{color: "white", fontSize: 20}}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            paddingLeft: 10
                        }}
                    >
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const Container = styled.View`
    border-radius: 20px;
    width: 90%;
    height: 60px;
    justify-content: center;
    background-color: ${props => props.theme.colors.facebookColor}
`;
