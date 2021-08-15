import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Image, View} from "react-native";
import Toast from "react-native-simple-toast";
import styled from "styled-components/native";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import Store from "../../../stores";
import {SceneProps} from "../../../utils/interfaces";
import {GetPageGameProcess} from "../../boardGame/actions/GetPageGameProcess";


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

            NavigationService.reset(Scenes.List);

        } catch (error) {
            console.log({error});
            Toast.show(error);
        }

    };

    render() {
        return (
            <Container>
                <View
                    style={{
                        backgroundColor: "transparent",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 360
                        }}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100
                            }}
                            source={require("../../../assets/img/logo.png")}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.colors.secondaryColor};
    justify-content: center;
`;

export default inject("authStore", "propsStore")(observer(LoadingScreen));
