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
            <ScrollView contentContainerStyle={{
                flex: 1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'white'
            }}>
<TouchableOpacity style={{ backgroundColor: '#44ff55', width: "90%", height: 60, elevation: 10, borderRadius: 20,}}>
</TouchableOpacity>
            </ScrollView>

        );
    }
}