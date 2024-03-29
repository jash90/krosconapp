import { Icon } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Color from "../Color";
import { PickerIconProps } from "../interfaces";

interface State {
    transports: string[];
    select: number;
}
export default class PickerIcon extends Component<PickerIconProps, State> {
    constructor(props: PickerIconProps) {
        super(props);
        this.state = {
            transports: ["bus", "train", "car", "boat", "jet", "subway"],
            select: 0
        };
    }
    componentWillMount = () => {
        if (this.props) {
            if (this.props.select) {
                var index = this.state.transports.indexOf(this.props.select);
                if (index > -1) {
                    this.setState({ select: index });
                }
            }
        }
    };

    render() {
        return (
            <View style={styles.pickerContener}>
                <FlatList
                    contentContainerStyle={styles.flatListStyle}
                    data={this.state.transports}
                    extraData={this.state.select}
                    renderItem={item =>
                        item.index == this.state.select ? (
                            <LinearGradient
                                colors={[Color.primaryColor, Color.accentColor]}
                                style={styles.gradientIcon}>
                                <TouchableOpacity
                                    onPress={() => this.onChange(item)}>
                                    <Icon
                                        name={"md-" + item.item}
                                        ios={"md-" + item.item}
                                        android={"md-" + item.item}
                                        style={styles.activeIcon}
                                    />
                                </TouchableOpacity>
                            </LinearGradient>
                        ) : (
                            <TouchableOpacity
                                onPress={() => this.onChange(item)}>
                                <Icon
                                    name={"md-" + item.item}
                                    ios={"md-" + item.item}
                                    android={"md-" + item.item}
                                    style={styles.unActiveIcon}
                                />
                            </TouchableOpacity>
                        )
                    }
                    horizontal
                />
            </View>
        );
    }
    onChange = (item: any) => {
        this.setState({ select: item.index });
        this.props.onChange(item);
    };
}

const styles = StyleSheet.create({
    unActiveIcon: {
        paddingLeft: 10,
        paddingRight: 10
    },
    activeIcon: {
        paddingLeft: 10,
        paddingRight: 10,
        color: "white"
    },
    gradientIcon: {
        borderRadius: 20
    },
    flatListStyle: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    pickerContener: {
        width: "90%",
        height: 60,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: 20
    }
});
