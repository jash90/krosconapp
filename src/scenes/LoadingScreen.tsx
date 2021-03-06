import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AsyncStorage, Image, View } from "react-native";
import Toast from "react-native-simple-toast";
import { BoardGameApi } from "../api";
import axios from "../Axios";
import Color from "../Color";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";
import Moment from "moment";

class LoadingScreen extends Component<SceneProps> {
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem("User");
      if (value !== null) {
        let user = JSON.parse(value);
        Store.authStore.setUser(user);
        axios.defaults.headers.common["authorization"] = String(user.token);
      }
    } catch (error) {
      Toast.show(error);
    }
    // BoardGameApi.offset()
    //   .then(response => {
    //     const data = response.data;
    //     Store.propsStore.setListGame(data.items);
        NavigationService.navigate(Scenes.List, {
          listgame: [],
          count: 0
        });
      // })
      // .catch(error => {
      //   ErrorUtil.errorService(error);
      //   NavigationService.navigate(Scenes.List, {
      //     listgame: [],
      //     count: 0
      //   });
      // });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Color.secondaryColor,
          justifyContent: "center"
        }}>
        <View
          style={{
            backgroundColor: "transparent",
            alignItems: "center"
          }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 360
            }}>
            <Image
              style={{
                width: 100,
                height: 100
              }}
              source={require("../img/logo.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default inject("authStore", "propsStore")(observer(LoadingScreen));
