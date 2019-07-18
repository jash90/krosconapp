import React, { Component } from "react";
import { View, Image } from "react-native";
import Color from "../Color";
import { Actions } from "react-native-router-flux";
export default class LoadingScreen extends Component {
  componentDidMount = () => {
    fetch("https://bgg-json.azurewebsites.net/collection/edwalter")
      .then(response => response.json())
      .then(responseJson => {
        this.props.navigation.navigate('List', {listgame: responseJson});
      })
      .catch(error => {
        console.error(error);
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
          {/* <Spinner isVisible={true} color={'white'} size={100} type={'ThreeBounce'}/> */}
        </View>
      </View>
    );
  }
}
