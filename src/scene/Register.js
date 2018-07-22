import React, {Component} from "react";
import {
    StyleSheet,
    View
} from "react-native";

import Logo from "@components/logo";
import Button from "@components/button";
import Input from "@components/input";
import Container from "@components/container";
import Color from "../Color";
import Language from "../Language";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: ""
        };
    }

    render() {
        return (
            <Container>
                    <Logo size={100}/>
                    <Input
                        underlineColorAndroid="transparent"
                        placeholder={Language.get("email")}
                        value={this.state.email}
                        onChangeText={text => this.setState({email: text})}/>
                    <Input
                        underlineColorAndroid="transparent"
                        placeholder={Language.get("password")}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={text => this.setState({password: text})}/>
                    <Input
                        underlineColorAndroid="transparent"
                        placeholder={Language.get("repeatPassword")}
                        secureTextEntry={true}
                        value={this.state.repeatPassword}
                        onChangeText={text => this.setState({repeatPassword: text})}/>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Button text={Language.get("register")} onPress={() => this.register()}/>
                    </View>
            </Container>
        );
    }
    register() {}
}

var styles = StyleSheet.create({
    fullStyle: {
        flex: 1,
        backgroundColor: Color.primaryColor
    }
});
