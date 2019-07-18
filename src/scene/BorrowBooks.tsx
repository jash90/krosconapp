import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Text
} from "react-native";
import ImagePicker from "react-native-image-picker";
interface State {
  image: any;
}
interface Props {
  data: any
}
export default class BorrowBooks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null
    };
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          {this.renderImage()}
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <Text>{JSON.stringify(this.props.navigation.state.params.data.data)}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <TextInput placeholder={"Nazwa"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <TextInput placeholder={"Liczba graczy"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <TextInput placeholder={"Wiek"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <TextInput placeholder={"Rok wydania"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
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
            flexDirection: "column",
            backgroundColor: "white",
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
            flexDirection: "column",
            backgroundColor: "white",
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
            flexDirection: "column",
            backgroundColor: "white",
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
            flexDirection: "column",
            backgroundColor: "white",
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
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
          }}>
          <TextInput placeholder={"mechaniki planszówki"} />
        </View>
      </ScrollView>
    );
  }
  renderImage() {
    if (this.state.image != null) {
      return (
        <Image
          source={this.state.image}
          style={{
            width: "100%",
            height: 200
          }}
          resizeMode={"contain"}
        />
      );
    } else {
      return (
        <TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "grey"
            }}
          />
        </TouchableOpacity>
      );
    }
  }
}
