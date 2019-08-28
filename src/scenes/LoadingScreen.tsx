import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import Color from "../Color";
import Toast from "react-native-simple-toast";
import AuthStore from "../stores/AuthStore";
import { observer, inject } from "mobx-react";
import Scenes from "../Scenes";
import { BoardGameApi } from "../api";
import ErrorUtil from "../ErrorUtil";
interface Props {
  authStore: AuthStore;
}
class LoadingScreen extends Component {
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem("User");
      if (value !== null) {
        let user = JSON.parse(value);
        this.props.authStore.setUser(user);
      }
    } catch (error) {
      Toast.show(error);
    }
    BoardGameApi.offset()
      .then(response => {
        const data = response.data;
        console.log(data);
        this.props.navigation.navigate(Scenes.List, {
          listgame: data.items,
          count: data.count
        });
      })
      .catch(error => {
        ErrorUtil.errorService(error);
        this.props.navigation.navigate(Scenes.List, {
          listgame: [],
          count: 0
        });
      });
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
export default inject("authStore")(observer(LoadingScreen));
