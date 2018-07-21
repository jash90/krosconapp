import React, {Component} from 'react';
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
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {Fab, Button, Icon as NIcon, Container} from 'native-base';
import selection from '../../android/app/src/main/assets/style/selection';
const Icon = createIconSetFromIcoMoon(selection);
import Spinner from 'react-native-spinkit'
import StarRating from 'react-native-star-rating';
import Color from '../Color'
import {Actions} from "react-native-router-flux";
export default class Login extends Component {
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:100,
                    marginBottom:30
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
                            source={require('../img/muffin.png')}/>
                    </View>
                </View>
                <View
                    style={{
                    justifyContent: 'flex-end',
                        marginTop: 50,
                        marginBottom: 50
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
                        marginBottom: 20
                    }}
                        placeholder={"Login"}/>
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
                    }}
                        placeholder={"Hasło"}/>
                </View>

                <View
                    style={{
                    justifyContent: 'flex-end',
                }}>
                    <TouchableOpacity
                        style={{
                        backgroundColor: Color.secondaryColor,
                        width: '90%',
                        height: 50,
                        borderRadius: 10,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                        <Text
                            style={{
                            fontSize: 20,
                            color: 'white'
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        backgroundColor: Color.accentColor,
                        width: '90%',
                        height: 50,
                        borderRadius: 10,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                            fontSize: 20,
                            color: 'white'
                        }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Color.accentColor,
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'white'
                            }}>
                            Sign in Facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Color.accentColor,
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'white'
                            }}>
                            Sign in Google
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}