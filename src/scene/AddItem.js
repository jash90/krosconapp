import React, {Component} from 'react'
import {View, TouchableOpacity, Image, TextInput, ScrollView, Text} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Container from "@components/container";
export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }
    render() {
        return (
            <Container>
                <View
                    style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    {this.renderImage()}
                </View>
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20}}>
                    <Text>
                        {JSON.stringify(this.props.data.data)}
                    </Text>
                </View>
                <View
                    style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <TextInput placeholder={"Nazwa"}/>
                </View>
                <View
                    style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <TextInput placeholder={"Liczba graczy"}/>
                </View>
                <View
                    style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <TextInput placeholder={"Wiek"}/>
                </View>
                <View
                    style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <TextInput placeholder={"Rok wydania"}/>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"Czas gry"} />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"Wydawca"} />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"Projektant"} />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"Ilustrator"} />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"Gatunek gry"} />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20
                    }}>
                    <TextInput placeholder={"mechaniki planszówki"} />
                </View>
            </Container>

        )
    }
    renderImage() {
        if (this.state.image != null) {
            return (<Image
                source={this.state.image}
                style={{
                width: "100%",
                height: 200
            }}
                resizeMode={'contain'}/>)
        } else {
            return (
                <TouchableOpacity onPress={() => this.selectImage()}><View
                    style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: 'grey'
                }}/>
                </TouchableOpacity>
            )
        }
    }
    selectImage() {
        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {
                    uri: response.uri
                };

                // You can also display the image using data: let source = { uri:
                // 'data:image/jpeg;base64,' + response.data };

                this.setState({image: source});
            }
        });
    }
}