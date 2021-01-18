import React, {Component} from "react";
import {Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import {RCView} from "../components/StyledComponent";
import {Button, PickerPawn, ViewText} from "./index";

interface Props {
    onChangeMin: (value: number) => void;
    onChangeMax: (value: number) => void;
    minPlayers: number;
    maxPlayers: number;
}
interface State {
    modal: boolean;
    validate: boolean;
}
class ModalPickerPawn extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modal: false,
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
                    label={"Min/Max graczy"}
                    error={
                        (this.props.minPlayers === 0 ||
                            this.props.maxPlayers === 0) &&
                        this.state.validate
                    }
                    text={`${this.props.minPlayers}/${this.props.maxPlayers}`}
                    onPress={() => this.setState({ modal: true })}
                />
                <Modal
                    visible={this.state.modal}
                    animationType={"slide"}
                    transparent
                    onRequestClose={() => this.setState({ modal: false })}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ modal: false })}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <RCView
                                style={{
                                    height: "40%",
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
                                    <Text>Min graczy</Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            alignSelf: "flex-start"
                                        }}>
                                        <PickerPawn
                                            initPlayers={this.props.minPlayers}
                                            maxPlayers={10}
                                            onValueChange={minPlayers =>
                                                this.props.onChangeMin(minPlayers)
                                            }
                                        />
                                    </View>
                                    <Text>Max graczy</Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            alignSelf: "flex-start"
                                        }}>
                                        <PickerPawn
                                            initPlayers={this.props.maxPlayers}
                                            maxPlayers={10}
                                            onValueChange={maxPlayers =>
                                                this.props.onChangeMax(maxPlayers)
                                            }
                                        />
                                    </View>
                                    <Button
                                        text={"Zapisz"}
                                        onPress={() =>
                                            this.setState({ modal: false })
                                        }
                                    />
                                </View>
                            </RCView>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}

export default ModalPickerPawn;
