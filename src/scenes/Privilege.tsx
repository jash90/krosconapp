import React, { Component } from "react";
import Color from "../Color";
import { Button, Container, UserHeader } from "../components";
import { View, Text, FlatList } from "react-native";
import axios from "../Axios";

interface State {
  users: any[];
}

export default class Privilege extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const response = await axios.get("/users");
    if (response.data.items) {
      this.setState({ users: response.data.items });
    }
  }
  render() {
    return (
      <Container
        text={"Lista użytkowników"}
        navigation={this.props.navigation}
        styleContent={{}}>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => (
            <UserHeader
              navigation={this.props.navigation}
              firstname={item.firstname}
              lastname={item.lastname}
              email={item.email}
              city={item.city}
              age={item.age}
              privilegeId={item.privilegeId}
              allLoan={9}
              countLoan={1}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 10,
                  justifyContent: "space-between"
                }}>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    borderWidth: 1
                  }}>
                  <Text>{"użytkownik"}</Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    borderWidth: 1
                  }}>
                  <Text>{"obsługa"}</Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    borderWidth: 1
                  }}>
                  <Text>{"admin"}</Text>
                </View>
              </View>
            </UserHeader>
          )}
        />
      </Container>
    );
  }
}