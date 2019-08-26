import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Props } from "../interfaces";
import { RNCamera } from "react-native-camera";
import { UserApi } from "../api";
interface CameraProps extends Props {
  changeCode: Function;
  routeName: string;
}
interface State {}
export default class Camera extends Component<CameraProps, State> {
  public camera: any;
  constructor(props: CameraProps) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref: any) => {
            this.camera = ref;
          }}
          style={styles.preview}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onBarCodeRead={(data: any, type: any) =>
            this.onBarCodeRead(data, type)
          }
        />
      </View>
    );
  }
  onBarCodeRead(data: any, type: any) {
    const { routeName, changeCode } = this.props.navigation.state.params;
    UserApi.search(data.data).then(item=>{
      console.log(item);
      console.log(data);
      // changeCode(data.data);
      // this.props.navigation.navigate(routeName);
    })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
