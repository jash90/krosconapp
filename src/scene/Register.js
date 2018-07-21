import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
    ToastAndroid
} from "react-native";

import {
    Container,
    Header,
    Title,
    Content,
    Fab,
    FooterTab,
    Left,
    Right,
    Body,
    Icon,
    Text
} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import {Actions} from "react-native-router-flux";
import Moment from "moment";

import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Head from "@components/head";
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
                <Head back={true} text={Language.get("registration")}/>
                <Content style={styles.fullStyle}>
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
                </Content>
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
