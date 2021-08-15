import {Icon} from "native-base";
import React, {Component} from "react";
import {Platform, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import {FabProps} from "../utils/interfaces";


export default class Fab extends Component<FabProps> {
    render() {
        return (
            <Container>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Icon
                        name={this.props.icon}
                        style={{
                            color: "white",
                            paddingTop: Platform.OS == "ios" ? 5 : 0
                        }}
                    />
                </TouchableOpacity>
            </Container>
        );
    }
}

const Container = styled(LinearGradient).attrs(props => ({
    colors: [props.theme.colors.primaryColor, props.theme.colors.accentColor]
}))`
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 360px;
  justify-content: center;
  align-items: center
`;
