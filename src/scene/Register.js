import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Fab, Button, Icon as NIcon, Container } from 'native-base';
import selection from '../../android/app/src/main/assets/style/selection';
const Icon = createIconSetFromIcoMoon(selection);
import Spinner from 'react-native-spinkit'
import StarRating from 'react-native-star-rating';
import Color from '../Color'
import { Actions } from "react-native-router-flux";
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }
    render() {
        return (
            <ScrollView
                style={{
                    backgroundColor: Color.primaryColor,
                   
                }}>
                <View
                    style={{
                        margin:20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 15,
                            borderRadius: 360
                        }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100
                            }}
                            source={require('../img/muffin.png')} />
                    </View>
                </View>
                <View
                    style={{
                        height:'50%',
                        justifyContent: 'space-evenly',
                    }}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: "white",
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: Color.secondaryColor,
                            fontWeight: 'bold',
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 20,
                        }}
                        placeholder={"Login"} />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: "white",
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: Color.secondaryColor,
                            fontWeight: 'bold',
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 20,
                        }}
                        placeholder={"Login"} />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: "white",
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: Color.secondaryColor,
                            fontWeight: 'bold',
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 20,
                        }}
                        placeholder={"Hasło"} />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: "white",
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: Color.secondaryColor,
                            fontWeight: 'bold',
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 20,
                        }}
                        placeholder={"Hasło"} />
                </View>

                <View
                    style={{
                    }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Color.accentColor,
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 40,
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'white'
                            }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}