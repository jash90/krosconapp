import React from "react";
import { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Container,
  ViewText,
  ModalPickerPawn,
  ModalSingleList,
  ModalMultiList
} from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { RCView } from "../components/StyledComponent";
import { withScanner } from "../components/withScanner";
import Scenes from"../Scenes";
const WithScannerText = withScanner(ViewText);
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
  modalVisible: boolean;
  maxPlayers: number;
  listDrop: string[];
  selected: string;
  modalVisible2: boolean;
  types: string[];
  description: string;
}
export default class AddBoardGame extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      age: "",
      minPlayers: 2,
      maxPlayers: 5,
      name: "",
      time: "0",
      publisher: "",
      type: "",
      mechanic: "",
      uuid: "",
      value: false,
      modalVisible: false,
      listDrop: ["test"],
      selected: "",
      modalVisible2: false,
      types: [],
      description: "",
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
          text={this.state.uuid}
          value={this.state.value}
          onPress={() => {
            this.props.navigation.navigate(Scenes.Camera, {
              changeUuid: this.changeUuid,
              routeName: "AddBoardGame"
            });
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
        <RCView
          style={{ height: 100, alignItems: "flex-start", paddingTop: 5 }}>
          <TextInput
            value={this.state.description}
            placeholder={"Opis gry"}
            multiline
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={description => this.setState({ description })}
          />
        </RCView>
        <ModalPickerPawn
          minPlayers={this.state.minPlayers}
          maxPlayers={this.state.maxPlayers}
          onChangeMin={minPlayers => this.setState({ minPlayers })}
          onChangeMax={maxPlayers => this.setState({ maxPlayers })}
        />
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
        <ModalSingleList
          placeholder={"Wydawca"}
          value={this.state.publisher}
          list={[
            "publisher1",
            "publisher2",
            "publisher3",
            "publisher4",
            "publisher5",
            "publisher6",
            "publisher7"
          ]}
          onChangeValue={publisher => this.setState({ publisher })}
        />
        <ModalMultiList
          placeholder={"Typy gry"}
          value={this.state.types}
          list={[
            "publisher1dfgdfgdfgdfgdfgdfgdfg",
            "publisher2dfgdfg",
            "publisher3",
            "publisher4",
            "publisher5",
            "publisher6",
            "publisher7"
          ]}
          onChangeValue={types => this.setState({ types })}
        />
         <ModalMultiList
          placeholder={"Mechaniki gry"}
          value={this.state.mechanic}
          list={[
            "publisher1dfgdfgdfgdfgdfgdfgdfg",
            "publisher2dfgdfg",
            "publisher3",
            "publisher4",
            "publisher5",
            "publisher6",
            "publisher7"
          ]}
          onChangeValue={mechanic => this.setState({ mechanic })}
        />
      </Container>
    );
  }
  save = () => {
    this.props.navigation.navigate(Scenes.List);
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
  changeUuid = (uuid: string) => {
    this.setState({ uuid });
    this.setState({ value: true });
  };
  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
