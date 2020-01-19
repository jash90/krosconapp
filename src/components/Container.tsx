import { Container as NContainer } from "native-base";
import React, { Component } from "react";
import {
    findNodeHandle,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Head } from ".";
import Color from "../Color";
import { ContainerProps } from "../interfaces";
import Language from "../Language";

interface State {
    viewRef: any;
}
class Container extends Component<ContainerProps, State> {
    public backgroundImage: any;

    static defaultProps = {
        back: true,
        left: false,
        leftIcon: "",
        leftPress: () => {},
        right: false,
        icon: "",
        scrollView: false,
        styleContent: null,
        text: false,
        children: null,
        onPress: () => {}
    };

    constructor(props: ContainerProps) {
        super(props);
        this.state = {
            viewRef: null
        };
    }

    render() {
        return (
            <NContainer>
                <Head
                    back={this.props.back == undefined ? true : this.props.back}
                    left={this.props.left}
                    leftIcon={this.props.leftIcon}
                    leftPress={this.props.leftPress}
                    text={
                        this.props.text
                            ? this.props.text
                            : Language.get("appName")
                    }
                    right={this.props.right}
                    icon={this.props.icon}
                    onPress={this.props.onPress}
                />
                {false && (
                    <View
                        style={{
                            backgroundColor: "red",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            alignItems: "center"
                        }}>
                        <Text style={{ color: "white" }}>
                            {"Brak połączenia z internetem"}
                        </Text>
                    </View>
                )}
                {this.renderChildren()}
            </NContainer>
        );
    }
    renderChildren() {
        if (this.props.scrollView) {
            return (
                <ScrollView
                    style={
                        this.props.styleContent
                            ? this.props.styleContent
                            : styles.fullStyle
                    }>
                    {this.props.children}
                </ScrollView>
            );
        } else {
            return (
                <View
                    style={
                        this.props.styleContent
                            ? this.props.styleContent
                            : styles.fullStyle
                    }>
                    {this.props.children}
                </View>
            );
        }
    }
    imageLoaded() {
        this.setState({
            viewRef: findNodeHandle(this.backgroundImage)
        });
    }
}
var styles = StyleSheet.create({
    fullStyle: {
        flex: 1,
        backgroundColor: Color.primaryColor,
        paddingHorizontal: 20
    },
    absolute: {
        alignSelf: "center",
        position: "absolute",
        width: "100%",
        height: "100%"
    }
});

export default Container;
