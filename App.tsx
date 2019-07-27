import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import LoadingScreen from "./src/scene/LoadingScreen";
import List from "./src/scene/List";
import Item from "./src/scene/Item";
import Camera from "./src/scene/Camera";
import AddItem from "./src/scene/AddItem";
import Login from "./src/scene/Login";
import Register from "./src/scene/Register";
import Profile from "./src/scene/Profile";
import BorrowBooks from "./src/scene/BorrowBooks";
import Example from "./src/scene/Example";
import Person from "./src/scene/Person";
import LoanGame from "./src/scene/LoanGame";

import DeviceInfo from "react-native-device-info";
import Language from "./src/Language";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen
    },
    List: {
      screen: List
    },
    Item: {
      screen: Item
    },
    Camera: {
      screen: Camera
    },
    AddItem: {
      screen: AddItem
    },
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    Profile: {
      screen: Profile
    },
    BorrowBooks: {
      screen: BorrowBooks
    },
    Example: {
      screen: Example
    },
    Person:{
      screen:Person
    },
    LoanGame:{
      screen:LoanGame
    }
  },
  {
    headerMode: "none",
    initialRouteName:'LoanGame'
  }
);

export default createAppContainer(AppNavigator);
// export default class App extends Component {
//   componentWillMount() {
//     Language.setL(DeviceInfo.getDeviceLocale().substring(0, 2));
//   }
//   render() {
//     // return (
//     //   <Router>
//     //     <Stack key="root">
//     //       <Scene key="Loading" component={LoadingScreen} hideNavBar />
//     //       <Scene key="List" component={List} hideNavBar />
//     //       <Scene key="Item" component={Item} hideNavBar />
//     //       <Scene key="Camera" component={Camera} hideNavBar />
//     //       <Scene key="AddItem" component={AddItem} hideNavBar />
//     //       <Scene key="Login" component={Login} hideNavBar />
//     //       <Scene key="Register" component={Register} hideNavBar />
//     //       <Scene key="Profile" component={Profile} hideNavBar />
//     //       <Scene key="BorrowBooks" component={BorrowBooks} hideNavBar />
//     //       <Scene key="Example" component={Example} hideNavBar />
//     //     </Stack>
//     //   </Router>
//     // );
//   }
// }
