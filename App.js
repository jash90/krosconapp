import React from 'react';
import {createStackNavigator} from 'react-navigation';
import LoadingScreen from './src/scene/LoadingScreen';
import List from './src/scene/List';
import Item from './src/scene/Item';
const RootStack = createStackNavigator({
  Home: {
    screen: LoadingScreen
  },
  List: {
    screen: List
  },
  Item:{
    screen:Item
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}