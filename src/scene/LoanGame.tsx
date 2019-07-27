import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
} from "react-native";

import {
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import { Actions } from "react-native-router-flux";

import Language from "../Language";

import {
  Separator,
  Logo,
  Input,
  Head,
  Button,
  GameHeader,
  Container,
  UserHeader,
  ScannerComponent
} from "../components";
import { Props } from "../interfaces";
import { withScanner } from "../components/withScanner";
const WithScannerUser = withScanner(UserHeader);
interface State{
  value:boolean
}
export default class LoanGame extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: false
    };
  }

  render() {
    const game = {
      averageRating: 6.56234,
      bggRating: 0,
      forTrade: false,
      gameId: 7865,
      image:
        "https://cf.geekdo-images.com/original/img/k0YHQxddSd7-fTmuamxpZiwI1Xs=/0x0/pic1229634.jpg",
      isExpansion: false,
      maxPlayers: 4,
      minPlayers: 2,
      name: "10 Days in Africa",
      numPlays: 4,
      owned: false,
      playingTime: 30,
      preOrdered: false,
      previousOwned: false,
      rank: 1820,
      rating: -1,
      thumbnail:
        "https://cf.geekdo-images.com/thumb/img/Kk309UtSrQu3flO3Rs_Vxuumvd4=/fit-in/200x150/pic1229634.jpg",
      userComment: "",
      want: false,
      wantToBuy: false,
      wantToPlay: false,
      wishList: false,
      yearPublished: 2003
    };
    return (
      <Container text={"Wypożycz grę"}>
        <GameHeader navigation={this.props.navigation} item={game} />
        <WithScannerUser
          navigation={this.props.navigation}
          fistname={"Bartłomiej"}
          lastname={"Zimny"}
          allLoan={9}
          countLoan={1}
          value={this.state.value}
          loading={false}
          onPress={()=>setTimeout(() => 
            {this.setState({value:true})}
          , 3000)}
        />
        <Button text={"Wypożycz Grę"} />
        {/* <ScannerComponent value={""} /> */}
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  }
});