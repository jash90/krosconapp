import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import Toast from "react-native-simple-toast";
import { BoardGameApi, UserApi } from "../api";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";

interface CameraProps extends SceneProps {
  changeCode: Function;
  routeName: string;
}
interface State {}
class Camera extends Component<CameraProps, State> {
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
    const {
      routeName,
      changeCode,
      typeItem
    } = this.props.navigation.state.params;
    if (typeItem === 1) {
      BoardGameApi.searchByUUID(data.data)
        .then(response => {
          console.log(response);
          if (response.data.item) {
            const item = response.data.item;
            console.log(item);
            changeCode(item);
            NavigationService.navigate(routeName);
          } else {
            if (!response.data.error) {
              changeCode(null);
              NavigationService.navigate(routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
          changeCode(null);
          NavigationService.navigate(routeName);
        });
    }
    if (typeItem === 2) {
      UserApi.search(data.data)
        .then(response => {
          console.log(response);
          if (response.data.item) {
            const item = response.data.item;
            changeCode(item);
            NavigationService.navigate(routeName);
          } else {
            if (!response.data.error) {
              changeCode(null);
              NavigationService.navigate(routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
    if (typeItem === 3) {
      changeCode(data.data);
      NavigationService.navigate(routeName);
    }
  }
}
export default inject("authStore","propsStore")(observer(Camera));

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
