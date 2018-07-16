import React from 'react';
import {Router,Stack, Scene} from 'react-native-router-flux';
import LoadingScreen from './src/scene/LoadingScreen';
import List from './src/scene/List';
import Item from './src/scene/Item';
import Camera from './src/scene/Camera';
import AddItem from './src/scene/AddItem';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Loading" component={LoadingScreen} hideNavBar/>
          <Scene key="List" component={List} hideNavBar/>
          <Scene key="Item" component={Item} hideNavBar/>
          <Scene key="Camera" component={Camera} hideNavBar />
          <Scene key="AddItem" component={AddItem} hideNavBar />
        </Stack>
      </Router>
    );
  }
}