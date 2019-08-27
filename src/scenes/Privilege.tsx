import React, { Component } from "react";
import Color from "../Color";
import { Button, Container, UserHeader } from "../components";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "../Axios";
import { AuthApi, UserApi } from "../api";
import Toast from "react-native-simple-toast";

interface State {
  users: any[];
  refreshing: boolean;
}

export default class Privilege extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const response = await UserApi.all();
    if (response.data.items) {
      this.setState({ users: response.data.items });
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    const response = await UserApi.all();
    if (response.data.items) {
      this.setState({ users: response.data.items });
    }
    this.setState({ refreshing: false });
  };

  render() {
    console.log(this.state.users);
    return (
      <Container
        text={"Lista użytkowników"}
        navigation={this.props.navigation}
        styleContent={{}}>
        <FlatList
          data={this.state.users.sort((a, b) => {
            return a.id - b.id;
          })}
          renderItem={({ item }) => (
            <UserHeader navigation={this.props.navigation} user={item}>
              {this.renderPrivilege(item)}
            </UserHeader>
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </Container>
    );
  }
  renderPrivilege(user: any) {
    return (
      <FlatList
        horizontal
        contentContainerStyle={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
        data={[
          { id: 3, text: "admin" },
          { id: 2, text: "obsługa" },
          { id: 1, text: "użytkownik" }
        ]}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => this.changePrivilege(user, item.id)}>
            <View
              style={{
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                backgroundColor:
                  user.privilegeId === item.id ? "black" : "white"
              }}>
              <Text
                style={{
                  color: user.privilegeId === item.id ? "white" : "black"
                }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
  changePrivilege(user: any, privilegeId: number) {
    if (user.privilegeId !== privilegeId) {
      AuthApi.changePrivilege(user.id, privilegeId).then(async item => {
        Toast.show("Zapisane");
        this.fetchData();
      });
    }
  }
}
