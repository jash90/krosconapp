import React from "react";
import { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Text,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { Container } from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Item, Label, Input } from "native-base";
const Icon = createIconSetFromIcoMoon(selection);
interface Props {
  data: any
}
interface State {
  image: any;
  age: string;
  extraData: number;
}
export default class AddItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      age: "",
      extraData: 5
    };
  }
  render() {
    return (
      <Container navigation={this.props.navigation} scrollView={true}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20
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
          <Text>{JSON.stringify(11)}</Text>
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
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center"
          }}>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
            extraData={this.state.extraData}
            data={this.createArray(this.state.extraData, 10)}
            keyExtractor={(item, index) => String(index)}
            horizontal={true}
            renderItem={(item: any) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ extraData: item.index + 1 });
                }}>
                <Icon name={"pawn"} color={item.item ? "red" : "black"} />
              </TouchableOpacity>
            )}
          />
          <View>
            <Text style={{ color: "red" }}>{this.state.extraData}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={{ color: "black" }}>Wiek</Text>
          <TextInput
            style={{ textAlign: "right" }}
            keyboardType="phone-pad"
            value={this.state.age}
            maxLength={2}
            onChangeText={text => this.setState({ age: text })}
          />
          <Text style={{ color: "black" }}>+</Text>
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
        {/* <View
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
                </View> */}
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
      </Container>
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
        <TouchableOpacity onPress={() => this.selectImage()}>
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
  selectImage() {

  }
  createArray(number: number, max: number) {
    return new Array(number)
      .map(() => true)
      .concat(new Array(max - number).map(() => false));
  }
}
