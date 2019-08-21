import React, { Component } from "react";
import LoadingScreen from "./src/scenes/LoadingScreen";
import List from "./src/scenes/List";
import Item from "./src/scenes/Item";
import Camera from "./src/scenes/Camera";
import AddItem from "./src/scenes/AddItem";
import Login from "./src/scenes/Login";
import Register from "./src/scenes/Register";
import LoanGame from "./src/scenes/LoanGame";
import Admin from "./src/scenes/Admin";
import QR from "./src/scenes/QR";
import LoanStatus from "./src/scenes/LoanStatus";
import Privilege from "./src/scenes/Privilege";
import EditProfile from "./src/scenes/EditProfile";
import ChangePassword from "./src/scenes/ChangePassword";

import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "mobx-react";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen,
    List,
    Item,
    Camera,
    AddItem,
    Login,
    Register,
    LoanGame,
    Admin,
    QR,
    LoanStatus,
    Privilege,
    EditProfile,
    ChangePassword
  },
  {
    headerMode: "none"
  }
);
import store from "./src/stores";
import { MenuProvider } from "react-native-popup-menu";

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Provider {...store}>
          <RootNavigator />
        </Provider>
      </MenuProvider>
    );
  }
}

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
