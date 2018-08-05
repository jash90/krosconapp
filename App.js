import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import LoadingScreen from './src/scene/LoadingScreen';
import List from './src/scene/List';
import Item from './src/scene/Item';
import Camera from './src/scene/Camera';
import AddItem from './src/scene/AddItem';
import Login from './src/scene/Login';
import Register from './src/scene/Register';
import Profile from './src/scene/Profile';
import BorrowBooks from './src/scene/BorrowBooks';
import Example from "./src/scene/Example";

import DeviceInfo from 'react-native-device-info';
import Language from './src/Language'
export default class App extends Component {
  componentWillMount() {
    Language.setL(DeviceInfo.getDeviceLocale().substring(0, 2));
  }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Loading" component={LoadingScreen} hideNavBar/>
          <Scene key="List" component={List} hideNavBar/>
          <Scene key="Item" component={Item} hideNavBar/>
          <Scene key="Camera" component={Camera} hideNavBar/>
          <Scene key="AddItem" component={AddItem} hideNavBar/>
          <Scene key="Login" component={Login} hideNavBar initial/>
          <Scene key="Register" component={Register} hideNavBar/>
          <Scene key="Profile" component={Profile} hideNavBar/>
          <Scene key="BorrowBooks" component={BorrowBooks} hideNavBar/>
          <Scene key="Example" component={Example} hideNavBar/>
        </Stack>
      </Router>
    );
  }
}