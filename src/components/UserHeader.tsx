import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";

interface User {
    firstname: string;
    lastname: string;
    email: string | null;
    age: number | null;
    city: string | null;
    // countLoan: number;
    // allLoan: number;
    privilegeId: number;
}

interface Props {
    user: User;
    edit?: boolean;
}
export default class UserHeader extends Component<Props> {
    render() {
        const {
            firstname,
            lastname,
            email,
            age,
            city,
            privilegeId
        } = this.props.user;
        return (
            <View
                style={{
                    backgroundColor: "white",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 20
                }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            {`${firstname ? firstname : "-"} ${lastname ? lastname : "-"
                                }`}
                        </Text>
                        <Text style={{ fontSize: 16 }}>{`${email}`}</Text>
                    </View>
                    {this.props.edit && (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "flex-end"
                            }}>
                            <TouchableOpacity onPress={this.goToEdit}>
                                <Icon
                                    name={"edit"}
                                    size={30}
                                    style={{ padding: 5 }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Text style={{ fontSize: 16 }}>{`${age ? age : "-"} lat`}</Text>
                <Text style={{ fontSize: 16 }}>{`Miasto: ${city ? city : "-"
                    }`}</Text>
                {this.props.children}
            </View>
        );
    }

    goToEdit = () => {
        NavigationService.navigate(Scenes.EditProfile);
    };
}
