import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {RNCamera} from "react-native-camera";
import Toast from "react-native-simple-toast";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";
import {SceneProps} from "../../../utils/interfaces";
import ScanQRItem from "../models/ScanQRItem";

interface CameraProps extends SceneProps {
  changeCode: Function;
  routeName: string;
}

class Camera extends Component<CameraProps> {
  public camera: any;

  render() {
    return (
      <View style={{ width: "100%", height: "100%", backgroundColor: "grey" }}>
        <SafeAreaView style={styles.container}>
          <RNCamera
            ref={(ref: any) => {
              this.camera = ref;
            }}
            style={styles.preview}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
            onBarCodeRead={({ data, type }) => this.onBarCodeRead(data, type)}
          />
        </SafeAreaView>
      </View>
    );
  }

  onBarCodeRead(data: any, type: any) {
    const typeItem = Store.propsStore.ScanQRItem;
    if (typeItem === ScanQRItem.Game) {
      networkService
        .searchBoardGameByUUID(data.data)
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
    if (typeItem === ScanQRItem.User) {
      networkService
        .searchUser(data.data)
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
    if (typeItem === ScanQRItem.Code) {
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
