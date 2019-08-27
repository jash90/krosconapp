import React, { Component } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
import { Container } from "../components";
import { RCView } from "../components/StyledComponent";
import Scenes from "../Scenes";
import { UserApi } from "../api/index";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
const Icon = createIconSetFromIcoMoon(selection);
interface Props {
  authStore:AuthStore
}
interface State {
  firstname: string;
  lastname: string;
  city: string;
  age: number;
  id:number;
}
class EditProfile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      city: "",
      age: 0,
      id:0
    };
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    console.log(user);
    if (user) {
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        city: user.city,
        age: Number(user.age),
        id:user.id
      });
    }
  }

  render() {
    return (
      <Container
        navigation={this.props.navigation}
        scrollView={true}
        right
        icon={"save"}
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
    const {firstname,lastname, city, age, id} = this.state;
    UserApi.edit(firstname,lastname,city,age,id).then(item=>{
      this.props.authStore.setFirstname(firstname);
      this.props.authStore.setLastname(lastname);
      this.props.authStore.setCity(city);
      this.props.authStore.setAge(age);
      this.props.navigation.navigate(Scenes.List);
    })
   
  };

  createArray(count: number, max: number) {
    let active: any[] = new Array(count).fill(true);
    let disactive: any[] = new Array(max - count).fill(false);
    return active.concat(disactive);
  }
}
export default inject("authStore")(observer(EditProfile));
