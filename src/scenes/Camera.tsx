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
    const typeItem = this.props.propsStore.typeItem;
    if (typeItem === TypeItem.Game) {
      BoardGameApi.searchByUUID(data.data)
        .then(response => {
          console.log(response);
          if (response.data.item) {
            const item = response.data.item;
            console.log(item);
            this.props.propsStore.setGame(item);
            NavigationService.navigate(this.props.propsStore.routeName);
          } else {
            if (!response.data.error) {
              this.props.propsStore.clearGame();
              NavigationService.navigate(this.props.propsStore.routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
          this.props.propsStore.clearGame();
          NavigationService.navigate(this.props.propsStore.routeName);
        });
    }
    if (typeItem === TypeItem.User) {
      UserApi.search(data.data)
        .then(response => {
          console.log(response);
          if (response.data.item) {
            const item = response.data.item;
            this.props.propsStore.setUser(item);
            NavigationService.navigate(this.props.propsStore.routeName);
          } else {
            if (!response.data.error) {
              this.props.propsStore.clearUser();
              NavigationService.navigate(this.props.propsStore.routeName);
              Toast.show("Nie znaleziono w bazie.");
            } else if (response.data.error)
              ErrorUtil.errorService(response.data.error);
              this.props.propsStore.clearUser();
              NavigationService.navigate(this.props.propsStore.routeName);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
          this.props.propsStore.clearUser();
          NavigationService.navigate(this.props.propsStore.routeName);
        });
    }
    if (typeItem === TypeItem.Code) {
      this.props.propsStore.setCode(data.data);
      NavigationService.navigate(this.props.propsStore.routeName);
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
