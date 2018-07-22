import React, {Component} from "react";
import {View, StyleSheet, ScrollView} from "react-native";

import {Container as NContainer, Content} from "native-base";

import Head from "@components/head";
import Color from "../../Color";
import Language from "../../Language";
import {relativeTimeThreshold} from "../../../node_modules/moment";

class Container extends Component {
    render() {
        return (
            <NContainer>
                <Head
                    back={this.props.back==undefined?true:this.props.back}
                    left={this.props.left}
                    leftIcon={this.props.leftIcon}
                    leftPress={this.props.leftPress}
                    text={this.props.text
                    ? this.props.text
                    : Language.get('appName')}
                    right={this.props.right}
                    icon={this.props.icon}
                    onPress={this.props.onPress}/>{this.renderChildren()}
            </NContainer>
        );
    }
    renderChildren() {
        if (this.props.scrollView) {
            return (
                <ScrollView
                    style={this.props.styleContent
                    ? this.props.styleContent
                    : styles.fullStyle}>{this.props.children}</ScrollView>
            );
        } else {
            return (
                <View
                    style={this.props.styleContent
                    ? this.props.styleContent
                    : styles.fullStyle}>
                    {this.props.children}</View>
            );
        }
    }
}
var styles = StyleSheet.create({
    fullStyle: {
        flex: 1,
        backgroundColor: Color.primaryColor
    }
});

export default Container;