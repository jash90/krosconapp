import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Alert} from "react-native";
import Toast from "react-native-simple-toast";
import Input from "../../../components/Input";
import ScreenContainer from "../../../components/ScreenContainer";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";
import {SceneProps} from "../../../utils/interfaces";

interface State {
  firstname: string;
  lastname: string;
  city: string;
  age: number;
  id: number;
}

class EditProfile extends Component<SceneProps, State> {
  public firstname: any;
  public lastname: any;

  constructor(props: SceneProps) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      city: "",
      age: 0,
      id: 0
    };
  }

  componentDidMount() {
    const user = Store.authStore;
    if (user) {
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        city: user.city,
        age: Number(user.age),
        id: user.id
      });
    }
  }

  render() {
    return (
      <ScreenContainer
        scrollView
        text={"Edycja Profilu"}
        right
        icon={"save"}
        onPress={() => this.save()}
      >
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
          value={this.state.city}
          placeholder={"Miasto"}
          onChangeText={(city: any) => this.setState({ city })}
        />
        <Input
          value={String(this.state.age)}
          placeholder={"Wiek"}
          onChangeText={(age: any) => this.setState({ age: Number(age) })}
        />
      </ScreenContainer>
    );
  }

  save = () => {
    const { firstname, lastname, city, age, id } = this.state;
    Input.validate([this.firstname, this.lastname]);
    if (!firstname) {
      Toast.show("Wpisz imię");
      return;
    }
    if (!lastname) {
      Toast.show("Wpisz nazwisko");
      return;
    }
    Alert.alert(
      "Edycja użytkownika",
      `Czy chcesz zmienić swoje dane ?`,
      [
        {
          text: "Nie",
          style: "cancel"
        },
        { text: "Tak", onPress: () => this.userEdit() }
      ],
      { cancelable: false }
    );
  };

  userEdit() {
    const { firstname, lastname, city, age, id } = this.state;
    networkService
      .updateUser(firstname, lastname, city, age, id)
      .then(response => {
        if (response.data.item) {
          Store.authStore.setFirstname(firstname);
          Store.authStore.setLastname(lastname);
          Store.authStore.setCity(city);
          Store.authStore.setAge(age);
          NavigationService.navigate(Scenes.List);
          Toast.show("Zapisano");
        } else if (response.data.error) {
          ErrorUtil.errorService(response.data.error);
        }
      })
      .catch(error => {
        ErrorUtil.errorService(error);
      });
  }

  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}

export default inject("authStore", "propsStore")(observer(EditProfile));
