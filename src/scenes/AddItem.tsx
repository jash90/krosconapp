import React from "react";
import { Component } from "react";
import { View, TouchableOpacity, Image, TextInput, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Container,
  ViewText,
  ModalPickerPawn,
  ModalSingleList,
  ModalMultiList,
  Dropdown
} from "../components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { RCView } from "../components/StyledComponent";
import { withScanner } from "../components/withScanner";
import Scenes from "../Scenes";
import { PublisherApi, BoardGameApi } from "../api";
import Toast from "react-native-simple-toast";
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
  publisher: any;
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
  publishers: any[];
  items: string[];
}
export default class AddItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      age: "",
      minPlayers: 2,
      maxPlayers: 5,
      name: "",
      time: "0",
      publisher: {},
      type: "",
      mechanic: "",
      uuid: "",
      value: false,
      modalVisible: false,
      listDrop: ["test"],
      selected: "Gra",
      modalVisible2: false,
      types: [],
      description: "",
      publishers: [],
      items: ["Wydawca", "Gra"]
    };
  }

  componentDidMount = () => {
    PublisherApi.all()
      .then(response => {
        this.setState({ publishers: response.data.items });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container
        navigation={this.props.navigation}
        scrollView={true}
        right
        icon={"save"}
        onPress={() => this.save()}>
        <Dropdown
          items={this.state.items}
          value={this.state.selected}
          onSelect={(item: any) => {
            this.setState({ selected: item });
          }}
        />
        {this.state.selected === "Gra" && (
          <WithScannerText
            label={"UUID"}
            text={this.state.uuid}
            value={!!this.state.uuid}
            onPress={() => {
              this.props.navigation.navigate(Scenes.Camera, {
                changeCode: (uuid: any) => this.setState({ uuid }),
                routeName: Scenes.AddItem,
                typeItem: 3
              });
            }}
          />
        )}
        <RCView>
          <TextInput
            value={this.state.name}
            placeholder={"Nazwa"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={name => this.setState({ name })}
          />
        </RCView>
        {this.state.selected === "Gra" && (
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
        )}
        {this.state.selected === "Gra" && (
          <ModalPickerPawn
            minPlayers={this.state.minPlayers}
            maxPlayers={this.state.maxPlayers}
            onChangeMin={minPlayers => this.setState({ minPlayers })}
            onChangeMax={maxPlayers => this.setState({ maxPlayers })}
          />
        )}
        {this.state.selected === "Gra" && (
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
        )}
        {this.state.selected === "Gra" && (
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
        )}
        {this.state.selected === "Gra" && (
          <ModalSingleList
            placeholder={"Wydawca"}
            value={this.state.publisher}
            list={this.state.publishers}
            onChangeValue={publisher => this.setState({ publisher })}
          />
        )}
        {false && (
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
        )}
        {false && (
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
        )}
      </Container>
    );
  }
  save = () => {
    const {
      name,
      uuid,
      minPlayers,
      maxPlayers,
      time,
      age,
      publisher
    } = this.state;
    if (this.state.selected === "Gra") {
      BoardGameApi.add(
        name,
        uuid,
        minPlayers,
        maxPlayers,
        Number(time),
        Number(age),
        publisher.id
      )
        .then(item => {
          console.log(item);
          Toast.show("Zapisano");
        })
        .catch(error => {});
    }
    if (this.state.selected === "Wydawca") {
      PublisherApi.add(name)
        .then(item => {
          console.log(item);
          Toast.show("Zapisano");
        })
        .catch(error => {});
    }
  };

  changeUuid = (uuid: string) => {
    this.props.navigation.navigate(Scenes.Camera, {
      changeCode: (user: any) => this.setState({ uuid }),
      routeName: Scenes.LoanGame,
      typeItem: 2
    });
  };
  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
