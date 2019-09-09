import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { TextInput } from "react-native";
import Toast from "react-native-simple-toast";
import { UserApi } from "../api/index";
import { Container } from "../components";
import { RCView } from "../components/StyledComponent";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
import Store from "../stores";

interface State {
  firstname: string;
  lastname: string;
  city: string;
  age: number;
  id: number;
}
class EditProfile extends Component<SceneProps, State> {
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
      <Container
        scrollView
        text={"Edycja Profilu"}
        right
        icon={"save"}
        styleContent={{ flex: 1, paddingHorizontal: 20 }}
        onPress={() => this.save()}>
        <RCView>
          <TextInput
            value={this.state.firstname}
            placeholder={"Imię"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={firstname => this.setState({ firstname })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.lastname}
            placeholder={"Nazwisko"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={lastname => this.setState({ lastname })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={this.state.city}
            placeholder={"Miasto"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={city => this.setState({ city })}
          />
        </RCView>
        <RCView>
          <TextInput
            value={String(this.state.age)}
            placeholder={"Wiek"}
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={age => this.setState({ age: Number(age) })}
          />
        </RCView>
      </Container>
    );
  }
  save = () => {
    const { firstname, lastname, city, age, id } = this.state;
    if (!firstname) {
      Toast.show("Wpisz imię");
      return;
    }
    if (!lastname) {
      Toast.show("Wpisz nazwisko");
      return;
    }
    UserApi.edit(firstname, lastname, city, age, id)
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
  };

  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
export default inject("authStore", "propsStore")(observer(EditProfile));
