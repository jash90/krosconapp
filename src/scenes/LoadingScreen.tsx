import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import Color from "../Color";
import { Actions } from "react-native-router-flux";
import Toast from "react-native-simple-toast";
import AuthStore from "../stores/AuthStore";
import { observer, inject } from "mobx-react";
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
    const listgame: any[] = [];
    listgame.push({
      name: "Game",
      minPlayers: 2,
      maxPlayers: 4,
      playingTime: 60,
      minAge: 5,
      publisher:"Rebel"
    });
    this.props.navigation.navigate("List", { listgame });
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
          {/* <Spinner isVisible={true} color={'white'} size={100} type={'ThreeBounce'}/> */}
        </View>
      </View>
    );
  }
}
export default inject("authStore")(observer(LoadingScreen));
