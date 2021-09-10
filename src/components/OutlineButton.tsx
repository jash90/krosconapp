import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ButtonProps } from "../utils/interfaces";

const Outline = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: white;
  border-color: ${props => props.color};
  border-width: 1px;
  ${props =>
    props.accentColor &&
    `
    border-color: ${props.theme.colors.accentColor};
  `}
  ${props =>
    props.secondaryColor &&
    `
    border-color: ${props.theme.colors.secondaryColor};
  `}
`;

const CText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.color};
  ${props =>
    props.accentColor &&
    `
    color: ${props.theme.colors.accentColor};
  `}
  ${props =>
    props.secondaryColor &&
    `
    color: ${props.theme.colors.secondaryColor};
  `}
`;

interface ColorButtonProps extends ButtonProps {
  color?: string;
  colorText?: string;
  accentColor?: boolean;
  secondaryColor?: boolean;
}

export default class OutLineButton extends Component<
                 ColorButtonProps
               > {
                 render() {
                   const { colorText, ...other } = this.props;
                   const cText = colorText
                     ? colorText
                     : other.color
                     ? other.color
                     : "black";

                   return (
                     <TouchableOpacity
                       style={{
                         marginVertical: 10
                       }}
                       onPress={this.props.onPress}
                     >
                       <Outline {...other}>
                         <CText
                           accentColor={this.props.accentColor}
                           color={cText}
                         >
                           {this.props.text}
                         </CText>
                       </Outline>
                     </TouchableOpacity>
                   );
                 }
               }
