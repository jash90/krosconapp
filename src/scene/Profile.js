import React, {Component} from 'react'
import {View, TouchableOpacity, Image, TextInput, ScrollView, Text} from 'react-native'
import ImagePicker from 'react-native-image-picker';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }
    render() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
            </ScrollView>

        );
    }
}