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
import { RCView } from "../components/StyledComponent";
import { ViewText, PickerPawn, Button } from "./index";

interface Props {
  onChangeValue: (value: string) => void;
  value: string;
  list: string[];
  placeholder:string;
}
interface State {
  modal: boolean;
  value: string;
}
class ModalSingleList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      value: ""
    };
  }
  render() {
    return (
      <View>
        <ViewText
          label={"Wydawca"}
          text={`${this.props.value}`}
          onPress={() => this.setState({ modal: true })}
        />
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
                    onChangeText={publisher =>
                      this.setState({ value: publisher })
                    }
                  />
                </RCView>
                <FlatList
                  data={this.props.list.filter(text => {
                    if (this.state.value) {
                      return (
                        text.includes(this.state.value) ||
                        text === this.props.value
                      );
                    }
                    return true;
                  })}
                  renderItem={({ item }) => this.renderItem(item)}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </RCView>
          </View>
        </Modal>
      </View>
    );
  }
  renderItem(item: string) {
    const selected = item === this.props.value;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onChangeValue(item);
          this.setState({ modal: false });
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
}

export default ModalSingleList;
