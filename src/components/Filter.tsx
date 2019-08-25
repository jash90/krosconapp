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

interface Props {
  onChangeValue: (value: string) => void;
  value: string;
  placeholder: string;
}
interface State {
  modal: boolean;
  value: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  age: string;
  time: string;
  publisher: string;
  types: string[];
  mechanics: string[];
}
class Filter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      value: "",
      name: "",
      minPlayers: 0,
      maxPlayers: 0,
      age: "",
      time: "",
      publisher: "",
      types: [],
      mechanics: []
    };
  }
  render() {
    const {
      minPlayers,
      maxPlayers,
      age,
      time,
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
              paddingVertical: 10
            }}>
            <TextInput
              autoCapitalize={"none"}
              value={this.props.value}
              placeholder={this.props.placeholder}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(search: any) => this.props.onChangeValue(search)}
              returnKeyType={"search"}
            />

            <TouchableOpacity onPress={() => this.setState({ modal: true })}>
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
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    style={{ fontSize: 16 }}
                    onChangeText={(search: any) => this.props.onChangeValue(search)}
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
                  alignItems="center"
                  width="100%">
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
                />
              </ScrollView>
              <Button
                color="black"
                colorText="white"
                text="Filtruj"
                onPress={() => this.setState({ modal: false })}
              />
            </RCView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Filter;
