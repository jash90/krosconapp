import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Props } from '../interfaces';
import { RNCamera } from 'react-native-camera';
interface State {
}
export default class Camera extends Component<Props, State> {
    public camera: any;
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() { }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(ref: any) => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onBarCodeRead={(data: any, type: any) => this.onBarCodeRead(data, type)} />
            </View>
        );
    }
    onBarCodeRead(data: any, type: any) {
        console.log(this.props.navigation.state.params);
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
