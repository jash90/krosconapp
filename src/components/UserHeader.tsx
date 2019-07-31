import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import StarRating from "react-native-star-rating";
import { withNavigation } from "react-navigation";
interface User {
  fistname: string;
  lastname: string;
  countLoan: number;
  allLoan: number;
}

interface Props {
  fistname: string;
  lastname: string;
  countLoan: number;
  allLoan: number;
  navigation: any;
}
export default class UserHeader extends Component<Props> {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          margin: 10,
          borderRadius: 20
        }}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          {`${this.props.fistname} ${this.props.lastname}`}
        </Text>
        <Text style={{ fontSize: 18 }}>{`Numer dokumentu: 1234555555`}</Text>
        <Text style={{ fontSize: 18 }}>
          {`Liczba wypożyczonych gier: ${this.props.countLoan}`}
        </Text>
      </View>
    );
  }
}
