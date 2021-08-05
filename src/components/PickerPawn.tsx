import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";
import { RCView } from "./StyledComponent";

interface Props {
    onValueChange: (value: number) => void;
    maxPlayers: number;
    initPlayers: number;
}

interface State {
    minPlayers: number;
}

class PickerPawn extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            minPlayers: props.initPlayers
        };
    }
    render() {
        return (
            <RCView flexDirection="row" justifyContent="center">
                <FlatList
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    extraData={this.state.minPlayers}
                    data={this.createArray(
                        this.state.minPlayers,
                        this.props.maxPlayers
                    )}
                    keyExtractor={(item, index) => String(index)}
                    horizontal
                    renderItem={(item: any) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setValue(item.index + 1);
                            }}>
                            <Icon
                                name={"pawn"}
                                size={16}
                                color={item.item ? "#c30000" : "black"}
                            />
                        </TouchableOpacity>
                    )}
                />
                <View>
                    <Text style={{ color: "grey", fontSize: 16 }}>
                        {this.state.minPlayers}
                    </Text>
                </View>
            </RCView>
        );
    }
    createArray(count: number, max: number) {
        let active: any[] = new Array(count).fill(true);
        let disactive: any[] = new Array(max - count).fill(false);
        return active.concat(disactive);
    }
    setValue(value: number) {
        this.setState({ minPlayers: value });
        this.props.onValueChange(value);
    }
}

export default PickerPawn;
