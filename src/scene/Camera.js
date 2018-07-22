import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listgame: [1]
        };
    }
    componentWillMount() {}

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                    this.camera = ref;
                }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onBarCodeRead={(data, type) => this.takePicture(data, type)}/>
            </View>
        );
    }
    takePicture(data, type) {
        Actions.replace("AddItem", {data, type});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
