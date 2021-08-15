import {Body, Header, Icon, Left, Right, Title} from "native-base";
import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import NavigationService from "../services/navigation/NavigationService";
import {HeadProps} from "../utils/interfaces";


export default class Head extends Component<HeadProps> {
    static defaultProps = {
        back: true,
        left: false,
        leftIcon: "",
        leftPress: () => {
        },
        right: false,
        icon: "",
        text: false,
        onPress: () => {
        }
    };

    render() {
        return (
            <Container>
                <Left>{this.renderLeft()}</Left>
                <Body style={styles.textHeader}>
                    <Text>
                        {this.props.text}
                    </Text>
                </Body>
                <Right>
                    {this.props.right ? (
                        <TouchableOpacity onPress={this.props.onPress}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: 35,
                                    height: 35,
                                    alignContent: "center",
                                    justifyContent: "center"
                                }}>
                                <MaterialIcons
                                    name={
                                        this.props.icon ? this.props.icon : ""
                                    }
                                    color="white"
                                    size={30}
                                />
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </Right>
            </Container>
        );
    }

    renderLeft() {
        if (this.props.back) {
            return (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <View
                        style={{
                            flexDirection: "column",
                            width: 35,
                            height: 35,
                            alignContent: "center",
                            justifyContent: "center"
                        }}>
                        <MaterialIcons
                            name="arrow-back"
                            style={styles.iconLeftHeader}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        if (this.props.left) {
            return (
                <TouchableOpacity onPress={this.props.leftPress}>
                    <View
                        style={{
                            flexDirection: "column",
                            width: 35,
                            height: 35,
                            alignContent: "center",
                            justifyContent: "center"
                        }}>
                        <Icon
                            name={
                                this.props.leftIcon ? this.props.leftIcon : ""
                            }
                            style={styles.iconLeftHeader}
                            fontSize={30}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const Container = styled(Header).attrs(props => ({
    androidStatusBarColor: props.theme.colors.secondaryColor
}))`
  backgroundColor: ${props => props.theme.colors.secondaryColor}
`;

const Text = styled(Title)`
  color: ${props => props.theme.colors.primaryColor}
`;

const styles = StyleSheet.create({
    textHeader: {flex: 3, justifyContent: "center", alignItems: "center"},
    iconLeftHeader: {color: "white", paddingLeft: 5, paddingRight: 5},
    iconRightHeader: {paddingRight: 5}
});
