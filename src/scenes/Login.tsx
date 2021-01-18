import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import AuthApi from "../api/AuthApi";
import axios from "../Axios";
import Color from "../Color";
import { Button, Container, Logo, Input } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import { SceneProps } from "../interfaces";
import Store from "../stores";

interface State {
    email: string;
    password: string;
    errorPassword: boolean;
    errorEmail: boolean;
}
class Login extends Component<SceneProps, State> {
    public loginInput: Input | null | undefined;
    public passwordInput: Input | null | undefined;
    constructor(props: SceneProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorPassword: false,
            errorEmail: false
        };
    }

    render() {
        return (
            <Container
                left
                leftIcon={"arrow-back"}
                leftPress={() => NavigationService.reset(Scenes.List)}
                right
                scrollView
                icon={"person-add"}
                text={"Zaloguj"}
                onPress={() => NavigationService.navigate(Scenes.Register)}>
                <Logo size={150} />
                <Input
                    ref={ref => (this.loginInput = ref)}
                    autoCapitalize={"none"}
                    value={this.state.email}
                    placeholder={"Email"}
                    error={this.state.email.length === 0}
                    errorText={"Uzupełnij email"}
                    onChangeText={(email: any) => this.setState({ email })}
                />
                <Input
                    ref={ref => (this.passwordInput = ref)}
                    autoCapitalize={"none"}
                    value={this.state.password}
                    placeholder={"Hasło"}
                    secureTextEntry
                    errorText={"Uzupełnij hasło"}
                    error={this.state.password.length === 0}
                    onChangeText={(password: any) =>
                        this.setState({ password })
                    }
                />
                <Button
                    primary
                    color={Color.accentColor}
                    colorText={"white"}
                    text={"Zaloguj"}
                    onPress={this.login}
                />
            </Container>
        );
    }

    login = async () => {
        const { email, password } = this.state;
        Input.validate([this.loginInput, this.passwordInput]);
        if (!email) {
            Toast.show("Uzupełnij email");
            return;
        }
        if (!password) {
            Toast.show("Uzupełnij hasło");
            return;
        }
        AuthApi.login(this.state.email, this.state.password)
            .then(async response => {
                const data = response.data;
                if (data.item) {
                    Store.authStore.setUser(data.item);
                    axios.defaults.headers.common["authorization"] = String(
                        data.item.token
                    );
                    await AsyncStorage.setItem(
                        "User",
                        JSON.stringify(data.item)
                    );
                    NavigationService.reset(Scenes.List);
                } else if (data.error) {
                    Toast.show("Niepoprawny login lub hasło.");
                }
            })
            .catch(error => {
                ErrorUtil.errorService(error);
            });
    };
}

var styles = StyleSheet.create({
    fullStyle: {
        flex: 1,
        backgroundColor: Color.primaryColor
    },
    buttonContener: {
        width: "100%",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});
export default inject("authStore", "propsStore")(observer(Login));
