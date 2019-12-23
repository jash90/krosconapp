import { Body, Header, Icon, Left, Right, Title } from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "../Color";
import { HeadProps } from "../interfaces";
import NavigationService from "../NavigationService";

export default class Head extends Component<HeadProps> {
  static defaultProps = {
    back: true,
    left: false,
    leftIcon: "",
    leftPress: () => {},
    right: false,
    icon: "",
    text: false,
    onPress: () => {}
  };
  render() {
    return (
      <Header
        androidStatusBarColor={Color.secondaryColor}
        style={styles.styleHeader}>
        <Left>{this.renderLeft()}</Left>
        <Body style={styles.textHeader}>
          <Title style={{ color: Color.primaryColor }}>{this.props.text}</Title>
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
                  name={this.props.icon ? this.props.icon : ""}
                  color="white"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </Right>
      </Header>
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
              name={this.props.leftIcon ? this.props.leftIcon : ""}
              style={styles.iconLeftHeader}
              fontSize={30}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  styleHeader: { backgroundColor: Color.secondaryColor },
  textHeader: { flex: 3, justifyContent: "center", alignItems: "center" },
  iconLeftHeader: { color: "white", paddingLeft: 5, paddingRight:5 },
  iconRightHeader: { paddingRight: 5 }
});
