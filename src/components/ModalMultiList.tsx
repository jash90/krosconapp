import React, {Component} from "react";
import {FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import FullButton from "./FullButton";
import {RCText, RCView} from "./StyledComponent";

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
            <View style={{width: "100%"}}>
                {!!length && (
                    <View
                        style={{
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({modal: true})}
                        >
                            <View
                                style={{margin: 5, backgroundColor: "White"}}
                            >
                                <Text>{this.props.placeholder}</Text>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            horizontal
                            data={this.props.value}
                            contentContainerStyle={{
                                flex: 1,
                                flexWrap: "wrap"
                            }}
                            renderItem={this.renderTag}
                        />
                    </View>
                )}
                {!length && (
                    <TouchableOpacity
                        onPress={() => this.setState({modal: true})}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                paddingHorizontal: 20,
                                marginVertical: 10,
                                width: "100%",
                                height: 50,
                                borderRadius: 20,
                                justifyContent: "center"
                            }}
                        >
                            <RCText>{this.props.placeholder}</RCText>
                        </View>
                    </TouchableOpacity>
                )}
                <Modal
                    visible={this.state.modal}
                    animationType={"slide"}
                    transparent
                    onRequestClose={() => this.setState({modal: false})}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
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
                                <RCView style={{borderWidth: 1}}>
                                    <TextInput
                                        value={this.state.value}
                                        placeholder={this.props.placeholder}
                                        style={{flex: 1, fontSize: 16}}
                                        onChangeText={value =>
                                            this.setState({value})
                                        }
                                    />
                                </RCView>
                                <FlatList
                                    data={this.props.list}
                                    renderItem={({item}) =>
                                        this.renderItem(item)
                                    }
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </RCView>
                        <View style={{width: "100%"}}>
                            <FullButton
                                color="black"
                                colorText="white"
                                text="Zapisz"
                                onPress={() => this.setState({modal: false})}
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
                    <Text style={{color: selected ? "white" : "black"}}>
                        {item}
                    </Text>
                </RCView>
            </TouchableOpacity>
        );
    }

    renderTag = ({item}: any) => {
        return (
            <View
                style={{
                    margin: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "black"
                }}
            >
                <Text>{item}</Text>
            </View>
        );
    };
}

export default ModalMultiList;
