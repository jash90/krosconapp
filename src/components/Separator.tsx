import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextProps} from "../interfaces";

export default class Separator extends Component<TextProps> {
    render() {
        return (
            <View style={styles.contener}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 20, color: "black" },
    contener: {
        borderRadius: 20,
        width: "90%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: "center",
        margin: 10
    }
});
