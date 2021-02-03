import AsyncStorage from "@react-native-async-storage/async-storage";
import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Image, View} from "react-native";
import Toast from "react-native-simple-toast";
import {GetPageGameProcess} from "../actions/boardGames/GetPageGameProcess";
import axios from "../Axios";
import Color from "../Color";
import {SceneProps} from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

class LoadingScreen extends Component<SceneProps> {
    componentDidMount = async () => {
        try {
            const value = await AsyncStorage.getItem("User");
            if (value !== null) {
                let user = JSON.parse(value);
                Store.authStore.setUser(user);
                axios.defaults.headers.common["authorization"] = String(
                    user.token
                );
            }

            await GetPageGameProcess();

            NavigationService.navigate(Scenes.List);

        } catch (error) {
            Toast.show(error);
        }

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
