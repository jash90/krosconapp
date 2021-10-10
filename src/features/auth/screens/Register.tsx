import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import Toast from "react-native-simple-toast";
import FullButton from "../../../components/FullButton";
import Input from "../../../components/Input";
import Logo from "../../../components/Logo";
import ScreenContainer from "../../../components/ScreenContainer";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {networkService} from "../../../services/network/NetworkService";
import {SceneProps} from "../../../utils/interfaces";

interface State {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

class Register extends Component<SceneProps, State> {
  public firstname: any;
  public lastname: any;
  public email: any;
  public password: any;

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
      <ScreenContainer scrollView text={"Zarejestruj"}>
        <Logo size={50} />
        <Input
          ref={ref => (this.firstname = ref)}
          value={this.state.firstname}
          placeholder={"Imię"}
          error={this.state.firstname.length === 0}
          errorText={"Uzupełnij imię"}
          onChangeText={(firstname: any) => this.setState({ firstname })}
        />
        <Input
          ref={ref => (this.lastname = ref)}
          value={this.state.lastname}
          placeholder={"Nazwisko"}
          error={this.state.lastname.length === 0}
          errorText={"Uzupełnij nazwisko"}
          onChangeText={(lastname: any) => this.setState({ lastname })}
        />
        <Input
          ref={ref => (this.email = ref)}
          autoCapitalize={"none"}
          value={this.state.email}
          placeholder={"Email"}
          error={this.state.email.length === 0}
          errorText={"Uzupełnij email"}
          onChangeText={(email: any) => this.setState({ email })}
        />
        <Input
          ref={ref => (this.password = ref)}
          autoCapitalize={"none"}
          value={this.state.password}
          placeholder={"Hasło"}
          secureTextEntry
          error={this.state.password.length < 5}
          errorText={"Hasło musi posiadać conajmniej 5 znaków"}
          onChangeText={(password: any) => this.setState({ password })}
        />
        <FullButton
          color={"black"}
          colorText={"white"}
          text={"Rejestracja"}
          onPress={() => this.register()}
        />
      </ScreenContainer>
    );
  }

  async register() {
    const { email, password, firstname, lastname } = this.state;
    Input.validate([this.firstname, this.lastname, this.email, this.password]);
    if (!email) {
      Toast.show("Uzupełnij email");
      return;
    }
    if (!password) {
      Toast.show("Hasło musi składać się z 5 znaków");
      return;
    }
    if (!firstname) {
      Toast.show("Uzupełnij imię");
      return;
    }
    if (!lastname) {
      Toast.show("Uzupełnij nazwisko");
      return;
    }
    try {
      const { data } = await networkService.register(
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname
      );

      if (data.item) {
        Toast.show(`Utworzyłeś konto ${this.state.email}.`);
        NavigationService.navigate(Scenes.Login);
      } else if (data.error) {
        Toast.show(`Nie udało się utworzyć konta`);
        await ErrorUtil.errorService(data.error);
      }
    } catch (error) {
      await ErrorUtil.errorService(error);
    }
  }
}

export default inject("authStore", "propsStore")(observer(Register));
