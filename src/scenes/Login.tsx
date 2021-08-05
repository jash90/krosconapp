import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-simple-toast";
import { LoginProcess } from "../actions/auth/LoginProcess";
import Color from "../Color";
import { Button, Container, Input, Logo } from "../components";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";

interface State {
    email: string;
    password: string;
    errorEmail: boolean;
    errorPassword: boolean;
}
class Login extends Component<SceneProps, State> {
    public emailInput: Input | null | undefined;
    public passwordInput: Input | null | undefined;
    constructor(props: SceneProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false,
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
                    ref={ref => (this.emailInput = ref)}
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
        Input.validate([this.emailInput, this.passwordInput]);
        if (!email) {
            Toast.show("Uzupełnij email");
            return;
        }
        if (!password) {
            Toast.show("Uzupełnij hasło");
            return;
        }

        await LoginProcess(email, password);
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
