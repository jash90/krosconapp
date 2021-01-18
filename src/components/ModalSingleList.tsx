import React, {Component} from "react";
import {FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {RCView} from "../components/StyledComponent";
import {ViewText} from "./index";

interface Props {
    onChangeValue: (value: any) => void;
    value: any;
    list: any[];
    placeholder: string;
}
interface State {
    modal: boolean;
    value: string;
    validate: boolean;
}
class ModalSingleList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modal: false,
            value: "",
            validate: false
        };
    }

    public validate() {
        this.setState({ validate: true });
    }

    public static validate(ref: any) {
        if (ref) ref.validate();
    }

    render() {
        return (
            <View style={{ width: "100%" }}>
                <ViewText
                    label={"Wydawca"}
                    error={
                        (!this.props.value ||
                            !this.props.value.name ||
                            this.props.value.name.length === 0) &&
                        this.state.validate
                    }
                    text={`${
                        this.props.value.name ? this.props.value.name : ""
                    }`}
                    onPress={() => this.setState({ modal: true })}
                />
                <Modal
                    visible={this.state.modal}
                    animationType={"slide"}
                    transparent
                    onRequestClose={() => this.setState({ modal: false })}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ modal: false })}
                            style={{
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center"
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
                                                this.setState({
                                                    value: publisher
                                                })
                                            }
                                        />
                                    </RCView>
                                    <FlatList
                                        data={this.props.list.filter(text => {
                                            if (this.state.value) {
                                                return (
                                                    text.name.includes(
                                                        this.state.value
                                                    ) ||
                                                    text.name ===
                                                        this.props.value.name
                                                );
                                            }
                                            return true;
                                        })}
                                        renderItem={({ item }) =>
                                            this.renderItem(item)
                                        }
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                            </RCView>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
    renderItem(item: any) {
        const selected = item === this.props.value;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onChangeValue(item);
                    this.setState({ modal: false, validate: true });
                }}>
                <RCView
                    style={{
                        borderWidth: 1,
                        backgroundColor: selected ? "black" : "white"
                    }}>
                    <Text style={{ color: selected ? "white" : "black" }}>
                        {item.name}
                    </Text>
                </RCView>
            </TouchableOpacity>
        );
    }
}

export default ModalSingleList;
