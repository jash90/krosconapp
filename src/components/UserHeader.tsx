import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
const SIcon = createIconSetFromIcoMoon(selection);
import StarRating from "react-native-star-rating";
import { withNavigation } from "react-navigation";
import { Spacer } from "./StyledComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
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
  navigation: any;
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
          padding: 10,
          paddingHorizontal: 20,
          margin: 10,
          marginHorizontal: 20,
          borderRadius: 20
        }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {`${firstname ? firstname : "-"} ${lastname ? lastname : "-"}`}
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
                <Icon name={"edit"} size={30} style={{ padding: 5 }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={{ fontSize: 16 }}>{`${age ? age : "-"} lat`}</Text>
        <Text style={{ fontSize: 16 }}>{`Miasto: ${city ? city : "-"}`}</Text>
        {this.props.children}
      </View>
    );
  }

  goToEdit = () => {
    this.props.navigation.navigate(Scenes.EditProfile, {
      user: this.props.user
    });
  };
}
