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
import { Container, Button, ViewText } from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Item, Label, Input } from "native-base";
import { Spacer, RCText, RCView } from "../components/StyledComponent";
import { withScanner } from "../components/withScanner";
const WithScannerText = withScanner(ViewText);
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
  uuid: string;
  value: boolean;
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
      mechanic: "",
      uuid: "",
      value: false
    };
  }
  render() {
    return (
      <Container
        navigation={this.props.navigation}
        scrollView={true}
        right
        icon={"save"}
        onPress={() => this.save()}>
        <WithScannerText
          text={"test"}
          value={this.state.value}
          onPress={() => {
            setTimeout(() => {
              this.setState({ value: true });
            }, 3000);
          }}
        />
        <RCView>
          <TextInput
            value={this.state.name}
            placeholder={"Nazwa gry"}
            style={{ fontSize: 16 }}
            onChangeText={name => this.setState({ name })}
          />
        </RCView>
        <RCView flexDirection="row" justifyContent="center">
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
                  size={16}
                  color={item.item ? "#c30000" : "black"}
                />
              </TouchableOpacity>
            )}
          />
          <View>
            <Text style={{ color: "grey", fontSize: 16 }}>
              {this.state.minPlayers}
            </Text>
          </View>
        </RCView>
        <RCView flexDirection="row">
          <Text style={{ color: "black", fontSize: 16 }}>Wiek</Text>
          <TextInput
            style={{ textAlign: "right", fontSize: 16, width: 25 }}
            keyboardType="phone-pad"
            value={this.state.age}
            maxLength={2}
            onChangeText={text => this.setState({ age: text })}
          />
          <Text style={{ color: "black", fontSize: 16 }}>lat +</Text>
        </RCView>
        <RCView
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center">
          <Text style={{ color: "black", fontSize: 16 }}>Czas gry</Text>
          <TextInput
            style={{ textAlign: "right", fontSize: 16, width: 35 }}
            keyboardType="phone-pad"
            value={this.state.time}
            maxLength={3}
            onChangeText={time => this.setState({ time })}
          />
          <Text style={{ color: "black", fontSize: 16 }}>min</Text>
        </RCView>
        <RCView>
          <TextInput
            placeholder={"Wydawca"}
            value={this.state.publisher}
            style={{ fontSize: 16 }}
            onChangeText={publisher => this.setState({ publisher })}
          />
        </RCView>
        <RCView>
          <TextInput
            placeholder={"Typ gry"}
            value={this.state.type}
            style={{ fontSize: 16 }}
            onChangeText={type => this.setState({ type })}
          />
        </RCView>
        <RCView>
          <TextInput
            placeholder={"Mechaniki planszówki"}
            value={this.state.mechanic}
            style={{ fontSize: 16 }}
            onChangeText={mechanic => this.setState({ mechanic })}
          />
        </RCView>
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
