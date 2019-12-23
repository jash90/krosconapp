import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import Toast from "react-native-simple-toast";
import { BoardGameApi, UserApi } from "../api";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import TypeItem from "../TypeItem";
import Store from "../stores";

interface CameraProps extends SceneProps {
  changeCode: Function;
  routeName: string;
}
class Camera extends Component<CameraProps> {
  public camera: any;

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
    const typeItem = Store.propsStore.typeItem;
    if (typeItem === TypeItem.Game) {
      BoardGameApi.searchByUUID(data.data)
        .then(response => {
          if (response.data.item) {
            const item = response.data.item;
            Store.propsStore.setGame(item);
            NavigationService.navigate(Store.propsStore.routeName);
          } else {
            if (!response.data.error) {
              Store.propsStore.clearGame();
              NavigationService.navigate(Store.propsStore.routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
          Store.propsStore.clearGame();
          NavigationService.navigate(Store.propsStore.routeName);
        });
    }
    if (typeItem === TypeItem.User) {
      UserApi.search(data.data)
        .then(response => {
          if (response.data.item) {
            const item = response.data.item;
            Store.propsStore.setUser(item);
            NavigationService.navigate(Store.propsStore.routeName);
          } else {
            if (!response.data.error) {
              Store.propsStore.clearUser();
              NavigationService.navigate(Store.propsStore.routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
              Store.propsStore.clearUser();
              NavigationService.navigate(Store.propsStore.routeName);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
          Store.propsStore.clearUser();
          NavigationService.navigate(Store.propsStore.routeName);
        });
    }
    if (typeItem === TypeItem.Code) {
      Store.propsStore.setCode(data.data);
      NavigationService.navigate(Store.propsStore.routeName);
    }
  }
}
export default inject("authStore", "propsStore")(observer(Camera));

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
