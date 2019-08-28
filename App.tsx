import { Provider } from "mobx-react";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { createAppContainer, createStackNavigator } from "react-navigation";
import {
  AddItem,
  BoardGame,
  Camera,
  ChangePassword,
  EditProfile,
  List,
  LoadingScreen,
  LoanGame,
  Login,
  Panel,
  Privilege,
  QR,
  Register
 } from "./src/scenes/index";
import store from "./src/stores";
import { NetInfo } from "react-native";
import { Props } from "./src/interfaces";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen,
    List,
    BoardGame,
    Camera,
    AddItem,
    Login,
    Register,
    LoanGame,
    Panel,
    QR,
    Privilege,
    EditProfile,
    ChangePassword
  },
  {
    headerMode: "none"
  }
);

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      isConnected:false
    };
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected:any) => {
      this.setState({ isConnected });
  };

  render() {
    return (
      <MenuProvider>
        <Provider {...store}>
          <RootNavigator screenProps={{isConnected: this.state.isConnected}}/>
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
