import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import { RCView, RCText } from "../components/StyledComponent";
import { ViewText, PickerPawn, Button } from "./index";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  onChangeValue: (value: string[]) => void;
  value: string[];
  list: string[];
  placeholder: string;
}
interface State {
  modal: boolean;
  value: string;
}
class ModalMultiList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      value: ""
    };
  }
  render() {
    const length = this.props.value.length;
    return (
      <View>
        {!!length && (
          <TouchableOpacity
            onPress={() => this.setState({ modal: true })}
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <View style={{ margin: 5, backgroundColor: "White" }}>
              <Text>{this.props.placeholder}</Text>
            </View>
            <FlatList
              horizontal
              data={this.props.value}
              contentContainerStyle={{
                flex: 1,
                flexWrap: "wrap"
              }}
              renderItem={this.renderTag}
            />
          </TouchableOpacity>
        )}
        {!length && (
          <TouchableOpacity
            onPress={() => this.setState({ modal: true })}
            style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                marginVertical: 10,
                width: "100%",
                height: 50,
                borderRadius: 20,
                justifyContent: "center"
              }}>
              <RCText>{this.props.placeholder}</RCText>
            </View>
          </TouchableOpacity>
        )}
        <Modal
          visible={this.state.modal}
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setState({ modal: false })}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <RCView
              style={{
                height: "60%",
                width: "90%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between"
              }}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  paddingVertical: 10,
                  justifyContent: "space-between"
                }}>
                <RCView style={{ borderWidth: 1 }}>
                  <TextInput
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    style={{ fontSize: 16, flex: 1 }}
                    onChangeText={value => this.setState({ value })}
                  />
                </RCView>
                <FlatList
                  data={this.props.list}
                  renderItem={({ item }) => this.renderItem(item)}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </RCView>
            <View style={{ width: "90%" }}>
              <Button
                color="black"
                colorText="white"
                text="Zapisz"
                onPress={() => this.setState({ modal: false })}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  renderItem(item: string) {
    const selected = this.props.value.includes(item);
    return (
      <TouchableOpacity
        onPress={() => {
          const list = this.props.value;
          if (!list.includes(item)) list.push(item);
          else list.splice(list.indexOf(item), 1);
          this.props.onChangeValue(list);
        }}>
        <RCView
          style={{
            borderWidth: 1,
            backgroundColor: selected ? "black" : "white"
          }}>
          <Text style={{ color: selected ? "white" : "black" }}>{item}</Text>
        </RCView>
      </TouchableOpacity>
    );
  }

  renderTag = ({ item }: any) => {
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
  };
}

export default ModalMultiList;
