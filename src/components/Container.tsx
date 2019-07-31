import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  findNodeHandle,
  Image
} from "react-native";
import { Container as NContainer, Content } from "native-base";

import BlurView from "react-native-blur";
import Color from "../Color";
import Language from "../Language";
import { Head } from ".";
import { ContainerProps } from "./interfaces";
interface State {
  viewRef: any;
}
class Container extends Component<ContainerProps, State> {
  public backgroundImage: any;

  static defaultProps = {
    back:true,
    left:false,
    leftIcon:'',
    leftPress:()=>{},
    right:false,
    icon:'',
    scrollView:false,
    styleContent:null,
    text:false,
    children:null,
    onPress:()=>{},
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
          navigation={this.props.navigation}
          back={this.props.back == undefined ? true : this.props.back}
          left={this.props.left}
          leftIcon={this.props.leftIcon}
          leftPress={this.props.leftPress}
          text={this.props.text ? this.props.text : Language.get("appName")}
          right={this.props.right}
          icon={this.props.icon}
          onPress={this.props.onPress}
        />
        {this.renderChildren()}
      </NContainer>
    );
  }
  renderChildren() {
    if (this.props.scrollView) {
      return (
        <ScrollView
          style={
            this.props.styleContent ? this.props.styleContent : styles.fullStyle
          }>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}>
            {/* <Image
              ref={img => {
                this.backgroundImage = img;
              }}
              resizeMode={"contain"}
              source={require("../img/logo.png")}
              style={{
                width: "100%",
                height: "100%"
              }}
              onLoadEnd={() => this.imageLoaded()}
            /> */}
          </View>
          {/* <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="xlight"
            blurAmount={100}
          /> */}
          {this.props.children}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={
            this.props.styleContent ? this.props.styleContent : styles.fullStyle
          }>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}>
            {/* <Image
              ref={img => {
                this.backgroundImage = img;
              }}
              resizeMode={"contain"}
              source={require("../img/logo.png")}
              style={{
                width: "100%",
                height: "100%"
              }}
              onLoadEnd={() => this.imageLoaded()}
            /> */}
          </View>
          {/* <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="xlight"
            blurAmount={100}
          /> */}
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
    backgroundColor: Color.primaryColor
  },
  absolute: {
    alignSelf: "center",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

export default Container;
