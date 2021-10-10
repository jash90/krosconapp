import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import Toast from "react-native-simple-toast";
import FullButton from "../../../components/FullButton";
import Input from "../../../components/Input";
import Logo from "../../../components/Logo";
import ScreenContainer from "../../../components/ScreenContainer";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {SceneProps} from "../../../utils/interfaces";
import {LoginProcess} from "../actions/LoginProcess";

interface State {
  email: string;
  password: string;
  errorEmail: boolean;
  errorPassword: boolean;
}

class Login extends Component<SceneProps, State> {
  public emailInput: Input | null | undefined;
  public passwordInput: Input | null | undefined;

  constructor(props: SceneProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false
    };
  }

  render() {
    return (
      <ScreenContainer
        left
        leftIcon={"arrow-back"}
        leftPress={() => NavigationService.reset(Scenes.List)}
        right
        scrollView
        icon={"person-add"}
        text={"Zaloguj"}
        onPress={() => NavigationService.navigate(Scenes.Register)}
      >
        <Logo size={150} />
        <Input
          ref={ref => (this.emailInput = ref)}
          autoCapitalize={"none"}
          value={this.state.email}
          placeholder={"Email"}
          error={this.state.email.length === 0}
          errorText={"Uzupełnij email"}
          onChangeText={(email: any) => this.setState({ email })}
        />
        <Input
          ref={ref => (this.passwordInput = ref)}
          autoCapitalize={"none"}
          value={this.state.password}
          placeholder={"Hasło"}
          secureTextEntry
          errorText={"Uzupełnij hasło"}
          error={this.state.password.length === 0}
          onChangeText={(password: any) => this.setState({ password })}
        />
        <FullButton
          accentColor
          colorText={"white"}
          text={"Zaloguj"}
          onPress={this.login}
        />
      </ScreenContainer>
    );
  }

  login = async () => {
    const { email, password } = this.state;
    Input.validate([this.emailInput, this.passwordInput]);
    if (!email) {
      Toast.show("Uzupełnij email");
      return;
    }
    if (!password) {
      Toast.show("Uzupełnij hasło");
      return;
    }

    await LoginProcess(email, password);
  };
}

export default inject("authStore", "propsStore")(observer(Login));
