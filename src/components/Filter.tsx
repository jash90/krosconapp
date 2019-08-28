import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { RCView, RCViewFlex } from "../components/StyledComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  ModalPickerPawn,
  ModalMultiList,
  ModalSingleList,
  Button,
  ViewText
} from ".";
import { PublisherApi } from "../api";
import ErrorUtil from "../ErrorUtil";

interface Props {
  onChangeValue: (value: any) => void;
}
interface State {
  modal: boolean;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  minAge: string;
  playingTime: string;
  publisher: any;
  types: string[];
  mechanics: string[];
  publishers: any[];
}
class Filter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      minPlayers: 0,
      maxPlayers: 0,
      minAge: "",
      playingTime: "",
      publisher: "",
      types: [],
      mechanics: [],
      publishers: []
    };
  }

  componentDidMount() {
    PublisherApi.all()
      .then(response => {
        this.setState({ publishers: response.data.items });
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }

  render() {
    const {
      minPlayers,
      maxPlayers,
      minAge: age,
      playingTime: time,
      publisher,
      types,
      mechanics
    } = this.state;
    return (
      <View>
        <RCViewFlex
          style={{
            marginLeft: 20,
            marginRight: 20,
            paddingVertical: 10,
            flexDirection: "column"
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.name}
              placeholder={"Nazwa gry planszowej"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(name:any)=>this.setState({name})}
              onEndEditing={this.onChangeValue}
              returnKeyType={"search"}
            />

            <TouchableOpacity
              onPress={() => this.setState({ modal: true })}
              style={{ justifyContent: "center" }}>
              <Icon name={"filter-list"} size={30} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%" }}>
            {minPlayers > 0 && maxPlayers > 0 && (
              <View style={{ paddingVertical: 10 }}>
                <ViewText
                  onlyText
                  label={"Min/max graczy:"}
                  text={`${minPlayers}/${maxPlayers}`}
                />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            {Number(age) > 0 && (
              <View style={{ paddingVertical: 10 }}>
                <ViewText onlyText label={"Wiek:"} text={`${age}+`} />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            {Number(time) > 0 && (
              <View style={{ paddingVertical: 10 }}>
                <ViewText
                  onlyText
                  label={"Czas rozgrywki:"}
                  text={`${time}min+`}
                />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            {!!publisher.length && (
              <View style={{ paddingVertical: 10 }}>
                <ViewText onlyText label={"Wydawca:"} text={`${publisher}`} />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            {!!mechanics.length && (
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text>{"Mechaniki: "}</Text>
                </View>
                <FlatList
                  horizontal
                  data={mechanics}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }: any) => {
                    return (
                      <View
                        style={{
                          margin: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: "black"
                        }}>
                        <Text>{item}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>

          <View style={{ width: "100%" }}>
            {!!types.length && (
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text>{"Typy: "}</Text>
                </View>
                <FlatList
                  horizontal
                  data={types}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }: any) => {
                    return (
                      <View
                        style={{
                          margin: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: "black"
                        }}>
                        <Text>{item}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </RCViewFlex>
        <Modal
          visible={this.state.modal}
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setState({ modal: false })}>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <RCView
              style={{
                width: Dimensions.get("window").width - 40,
                height: "90%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                backgroundColor: "#d2d2d2"
              }}>
              <ScrollView
                style={{ flex: 1, width: "100%" }}
                showsVerticalScrollIndicator={false}>
                <RCView style={{ width: "100%" }}>
                  <TextInput
                    value={this.state.name}
                    placeholder={"Nazwa gry planszowej"}
                    style={{ flex: 1, fontSize: 16 }}
                    onChangeText={(name:any)=>this.setState({name})}
                  />
                </RCView>
                <ModalPickerPawn
                  minPlayers={this.state.minPlayers}
                  maxPlayers={this.state.maxPlayers}
                  onChangeMin={minPlayers => this.setState({ minPlayers })}
                  onChangeMax={maxPlayers => this.setState({ maxPlayers })}
                />
                <RCView style={{ width: "100%" }} flexDirection="row">
                  <Text style={{ color: "black", fontSize: 16 }}>Wiek</Text>
                  <TextInput
                    style={{
                      flex: 1,
                      textAlign: "right",
                      fontSize: 16,
                      width: 25
                    }}
                    keyboardType="phone-pad"
                    value={this.state.minAge}
                    maxLength={2}
                    onChangeText={text => this.setState({ minAge: text })}
                  />
                  <Text style={{ color: "black", fontSize: 16 }}>lat +</Text>
                </RCView>
                <RCView
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="100%">
                  <Text style={{ color: "black", fontSize: 16 }}>Czas gry</Text>
                  <TextInput
                    style={{
                      flex: 1,
                      textAlign: "right",
                      fontSize: 16,
                      width: 35
                    }}
                    keyboardType="phone-pad"
                    value={this.state.playingTime}
                    maxLength={3}
                    onChangeText={time => this.setState({ playingTime: time })}
                  />
                  <Text style={{ color: "black", fontSize: 16 }}>min</Text>
                </RCView>
                <ModalSingleList
                  placeholder={"Wydawca"}
                  value={this.state.publisher}
                  list={this.state.publishers}
                  onChangeValue={publisher => this.setState({ publisher })}
                />

                {/* <ModalMultiList
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
                  value={this.state.mechanics}
                  list={[
                    "publisher1dfgdfgdfgdfgdfgdfgdfg",
                    "publisher2dfgdfg",
                    "publisher3",
                    "publisher4",
                    "publisher5",
                    "publisher6",
                    "publisher7"
                  ]}
                  onChangeValue={mechanics => this.setState({ mechanics })}
                /> */}
              </ScrollView>
              <Button
                outline
                color="black"
                text="Wyczyść"
                onPress={() =>
                  this.setState({
                    name: "",
                    minPlayers: 0,
                    maxPlayers: 0,
                    minAge: "",
                    playingTime: "",
                    publisher: "",
                    types: [],
                    mechanics: []
                  })
                }
              />
              <Button
                color="black"
                colorText="white"
                text="Filtruj"
                onPress={this.filterBoardGame}
              />
            </RCView>
          </View>
        </Modal>
      </View>
    );
  }
  onChangeValue = () => {
    const {
      name,
      minPlayers,
      maxPlayers,
      minAge,
      playingTime,
      publisher
    } = this.state;
    let game: any = {
      name: null,
      minPlayers: null,
      maxPlayers: null,
      minAge: null,
      playingTime: null,
      publisherId: null
    };
    if (name && name.length && name.length > 0) {
      game.name = name;
    }
    if (minPlayers && minPlayers > 0) {
      game.minPlayers = minPlayers;
    }
    if (maxPlayers && maxPlayers > 0) {
      game.maxPlayers = maxPlayers;
    }
    if (minAge && minAge.length && minAge.length > 0 && Number(minAge) > 0) {
      game.minAge = minAge;
    }
    if (
      playingTime &&
      playingTime.length &&
      playingTime.length > 0 &&
      Number(playingTime) > 0
    ) {
      game.playingTime = playingTime;
    }
    if (publisher && publisher.id && publisher.id > 0) {
      game.publisherId = publisher.id;
    }

    console.log(game);

    this.props.onChangeValue(game);
  };

  filterBoardGame = () => {
    this.onChangeValue();
    this.setState({ modal: false });
  };
}

export default Filter;
