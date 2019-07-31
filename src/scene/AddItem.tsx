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
import { Container, Button } from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Item, Label, Input } from "native-base";
const Icon = createIconSetFromIcoMoon(selection);
interface Props {
  data: any;
}
interface State {
  image: any;
  age: string;
  minPlayers: number;
  name: string;
  time: string;
  publisher: string;
  type: string;
  mechanic: string;
}
export default class AddItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      age: "",
      minPlayers: 5,
      name: "",
      time: "0",
      publisher: "",
      type: "",
      mechanic: ""
    };
  }
  render() {
    return (
      <Container
        navigation={this.props.navigation}
        scrollView={true}
        right
        icon={"save"}
        onPress={()=>this.save()}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20
          }}>
          <Text>{JSON.stringify(11)}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingHorizontal: 20,
            margin: 20
          }}>
          <TextInput
            value={this.state.name}
            placeholder={"Nazwa gry"}
            style={{ fontSize: 25 }}
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center"
          }}>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
            extraData={this.state.minPlayers}
            data={this.createArray(this.state.minPlayers, 10)}
            keyExtractor={(item, index) => String(index)}
            horizontal={true}
            renderItem={(item: any) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ minPlayers: item.index + 1 });
                }}>
                <Icon
                  name={"pawn"}
                  size={25}
                  color={item.item ? "#c30000" : "black"}
                />
              </TouchableOpacity>
            )}
          />
          <View>
            <Text style={{ color: "grey", fontSize: 22 }}>
              {this.state.minPlayers}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 20,
            paddingHorizontal: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}>
          <Text style={{ color: "black", fontSize: 25 }}>Wiek</Text>
          <TextInput
            style={{ textAlign: "right", marginTop: 2, fontSize: 25 }}
            keyboardType="phone-pad"
            value={this.state.age}
            maxLength={2}
            onChangeText={text => this.setState({ age: text })}
          />
          <Text style={{ color: "black", fontSize: 25 }}>lat +</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 20,
            paddingHorizontal: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}>
          <Text style={{ color: "black", fontSize: 25 }}>Czas gry</Text>
          <TextInput
            style={{ textAlign: "right", marginTop: 2, fontSize: 25 }}
            keyboardType="phone-pad"
            value={this.state.time}
            maxLength={3}
            onChangeText={time => this.setState({ time })}
          />
          <Text style={{ color: "black", fontSize: 25 }}>min</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 20,
            margin: 20
          }}>
          <TextInput
            placeholder={"Wydawca"}
            value={this.state.publisher}
            style={{ fontSize: 25 }}
            onChangeText={publisher => this.setState({ publisher })}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 20,
            margin: 20
          }}>
          <TextInput
            placeholder={"Typ gry"}
            value={this.state.type}
            style={{ fontSize: 25 }}
            onChangeText={type => this.setState({ type })}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 20,
            margin: 20
          }}>
          <TextInput
            placeholder={"Mechaniki planszówki"}
            value={this.state.mechanic}
            style={{ fontSize: 25 }}
            onChangeText={mechanic => this.setState({ mechanic })}
          />
        </View>
      </Container>
    );
  }
  save = () => {
    this.props.navigation.navigate("List");
  };

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
  selectImage() {}
  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
