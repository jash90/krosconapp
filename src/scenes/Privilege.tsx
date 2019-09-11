import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-simple-toast";
import { AuthApi, UserApi } from "../api";
import { Container, UserHeader } from "../components";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";

interface State {
  users: any[];
  refreshing: boolean;
}
class Privilege extends Component<SceneProps, State> {
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
    UserApi.all()
      .then(response => {
        if (response.data.items) this.setState({ users: response.data.items });
        if (response.data.error) ErrorUtil.errorService(response.data.error);
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    this.fetchData();
    this.setState({ refreshing: false });
  };

  render() {
    return (
      <Container text={"Lista użytkowników"}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.users.sort((a, b) => {
            return a.id - b.id;
          })}
          renderItem={({ item }) => (
            <UserHeader user={item}>{this.renderPrivilege(item)}</UserHeader>
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
      AuthApi.changePrivilege(user.id, privilegeId)
        .then(async response => {
          if (response.data.item) {
            Toast.show("Zapisane");
            this.fetchData();
          } else if (response.data.error) {
            ErrorUtil.errorService(response.data.error);
          }
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  }
}
export default inject("authStore", "propsStore")(observer(Privilege));
