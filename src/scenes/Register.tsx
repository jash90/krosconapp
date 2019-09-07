import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { TextInput, View } from "react-native";
import Toast from "react-native-simple-toast";
import AuthApi from "../api/AuthApi";
import { Button, Container, Logo } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import Language from "../Language";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
interface State {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
class Register extends Component<SceneProps, State> {
  constructor(props: SceneProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    };
  }

  render() {
    return (
      <Container scrollView>
        <Logo size={50} />
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <RCView>
            <TextInput
              value={this.state.firstname}
              placeholder={"Imię"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(firstname: any) => this.setState({ firstname })}
            />
          </RCView>

          <RCView>
            <TextInput
              value={this.state.lastname}
              placeholder={"Nazwisko"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(lastname: any) => this.setState({ lastname })}
            />
          </RCView>

          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.email}
              placeholder={"Email"}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(email: any) => this.setState({ email })}
            />
          </RCView>

          <RCView>
            <TextInput
              autoCapitalize={"none"}
              value={this.state.password}
              placeholder={"Hasło"}
              secureTextEntry={true}
              style={{ flex: 1, fontSize: 16 }}
              onChangeText={(password: any) => this.setState({ password })}
            />
          </RCView>
        </View>

        <Button
          primary
          color={"black"}
          colorText={"white"}
          text={Language.get("register")}
          onPress={() => this.register()}
        />
      </Container>
    );
  }
  register() {
    const { email, password, firstname, lastname } = this.state;
    if (!email || !password || !firstname || !lastname) {
      Toast.show("Wypełnij wszystkie pola w celu rejestracji");
      return;
    }
    AuthApi.register(
      this.state.email,
      this.state.password,
      this.state.firstname,
      this.state.lastname
    )
      .then(response => {
        const data = response.data;
        if (data.item) {
          Toast.show(`Utworzyłeś konto ${this.state.email}.`);
          NavigationService.navigate(Scenes.Login);
        }
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }
}
export default inject("authStore","propsStore")(observer(Register));
