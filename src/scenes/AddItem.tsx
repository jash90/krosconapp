import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-simple-toast";
import { BoardGameApi, PublisherApi } from "../api";
import {
  Container,
  Dropdown,
  ModalMultiList,
  ModalPickerPawn,
  ModalSingleList,
  ViewText
} from "../components";
import { RCView } from "../components/StyledComponent";
import { withScanner } from "../components/withScanner";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
const WithScannerText = withScanner(ViewText);
import Store from "../stores";
interface State {
  name: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: string;
  minAge: string;
  publisher: any;
  type: string;
  mechanic: string;
  uuid: string;
  selected: string;
  types: string[];
  description: string;
  publishers: any[];
  items: string[];
}
class AddItem extends Component<SceneProps, State> {
  constructor(props: SceneProps) {
    super(props);
    this.state = {
      minAge: "",
      minPlayers: 2,
      maxPlayers: 5,
      name: "",
      playingTime: "",
      publisher: {},
      type: "",
      mechanic: "",
      uuid: "",
      selected: "Gra",
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
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
    const game = Store.propsStore.game;
    if (game) {
      const {
        name,
        minPlayers,
        maxPlayers,
        playingTime,
        minAge,
        publisher,
        uuid
      } = game;
      this.setState({
        name,
        minPlayers,
        maxPlayers,
        playingTime: String(playingTime),
        minAge: String(minAge),
        publisher,
        uuid
      });
    }
  };

  render() {
    return (
      <Container
        scrollView
        right
        text={"Dodaj"}
        styleContent={{ flex: 1 }}
        icon={"save"}
        onPress={() => this.save()}>
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          {!Store.propsStore.game && (
            <Dropdown
              items={this.state.items}
              value={this.state.selected}
              onSelect={(item: any) => {
                this.setState({ selected: item });
              }}
            />
          )}
          {this.state.selected === "Gra" && (
            <WithScannerText
              label={"UUID"}
              text={
                Store.propsStore.game
                  ? Store.propsStore.game.uuid
                  : Store.propsStore.code
              }
              value={
                Store.propsStore.game
                  ? !!Store.propsStore.game.uuid
                  : !!Store.propsStore.code
              }
              onPress={() => {
                if (!Store.propsStore.game) {
                  Store.propsStore.setTypeItem(3);
                  Store.propsStore.setRouteName(Scenes.AddItem);
                  NavigationService.navigate(Scenes.Camera);
                }
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
                value={this.state.minAge}
                maxLength={2}
                onChangeText={text => this.setState({ minAge: text })}
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
                value={this.state.playingTime}
                maxLength={3}
                onChangeText={playingTime => this.setState({ playingTime })}
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
        </View>
      </Container>
    );
  }
  save = () => {
    const {
      name,
      uuid,
      description,
      minPlayers,
      maxPlayers,
      playingTime,
      minAge,
      publisher
    } = this.state;

    let game = null;
    game = Store.propsStore.game;
    if (this.state.selected === "Gra" && !game) {
      if (!uuid && uuid.length < 1) {
        Toast.show("Uzupełnij kod gry");
        return;
      }
      if (!name && name.length < 1) {
        Toast.show("Uzupełnij nazwę");
        return;
      }
      if (minPlayers <= 0) {
        Toast.show("Uzupełnij minimalną liczbę graczy");
        return;
      }
      if (maxPlayers <= 0) {
        Toast.show("Uzupełnij maksymalną liczbę graczy");
        return;
      }
      if (Number(playingTime) <= 0) {
        Toast.show("Uzupełnij czas trwania gry");
        return;
      }
      if (Number(minAge) <= 0) {
        Toast.show("Uzupełnij minimalny wiek");
        return;
      }
      if (publisher && publisher.id && publisher.id <= 0) {
        Toast.show("Wybierz wydawcę");
        return;
      }
      BoardGameApi.add(
        name,
        uuid,
        description,
        minPlayers,
        maxPlayers,
        Number(playingTime),
        Number(minAge),
        publisher.id
      )
        .then(response => {
          if (response.data.item) {
            Toast.show("Zapisano");
          } else if (response.data.error) {
            ErrorUtil.errorService(response.data.error);
          }
          Store.propsStore.setCode("");
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }

    if (this.state.selected === "Gra" && !!game) {
      if (!uuid && uuid.length < 1) {
        Toast.show("Uzupełnij kod gry");
        return;
      }
      if (!name && name.length < 1) {
        Toast.show("Uzupełnij nazwę");
        return;
      }
      if (minPlayers <= 0) {
        Toast.show("Uzupełnij minimalną liczbę graczy");
        return;
      }
      if (maxPlayers <= 0) {
        Toast.show("Uzupełnij maksymalną liczbę graczy");
        return;
      }
      if (Number(playingTime) <= 0) {
        Toast.show("Uzupełnij czas trwania gry");
        return;
      }
      if (Number(minAge) <= 0) {
        Toast.show("Uzupełnij minimalny wiek");
        return;
      }
      if (publisher && publisher.id && publisher.id <= 0) {
        Toast.show("Wybierz wydawcę");
        return;
      }
      BoardGameApi.edit(
        name,
        uuid,
        description,
        minPlayers,
        maxPlayers,
        Number(playingTime),
        Number(minAge),
        publisher.id,
        game.id
      )
        .then(response => {
          if (response.data.item) {
            Toast.show("Zapisano");
          } else if (response.data.error) {
            ErrorUtil.errorService(response.data.error);
          }
          Store.propsStore.setCode("");
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
    if (this.state.selected === "Wydawca") {
      if (!name && name.length < 1) {
        Toast.show("Uzupełnij nazwę");
        return;
      }
      PublisherApi.add(name)
        .then(response => {
          if (response.data.item) {
            Toast.show("Zapisano");
          } else if (response.data.error) {
            ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  };
  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
export default inject("authStore", "propsStore")(observer(AddItem));
