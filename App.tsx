import { Provider } from 'mobx-react';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components';
import About from './src/features/about/screens/About';
import ChangePassword from './src/features/auth/screens/ChangePassword';
import EditProfile from './src/features/auth/screens/EditProfile';
import Login from './src/features/auth/screens/Login';
import Panel from './src/features/auth/screens/Panel';
import Privilege from './src/features/auth/screens/Privilege';
import QR from './src/features/auth/screens/QR';
import Register from './src/features/auth/screens/Register';
import AddItem from './src/features/boardGame/screens/AddItem';
import BoardGame from './src/features/boardGame/screens/BoardGame';
import List from './src/features/boardGame/screens/List';
import LoadingScreen from './src/features/loading/screens/LoadingScreen';
import Camera from './src/features/loanGame/screens/Camera';
import HistoryLoan from './src/features/loanGame/screens/HistoryLoan';
import LoanGame from './src/features/loanGame/screens/LoanGame';
import NavigationService from './src/services/navigation/NavigationService';
import store from './src/stores';
import Screen from './src/services/navigation/utils/Scenes';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Provider {...store}>
          <ThemeProvider
            theme={{
              colors: {
                primaryColor: '#ccc',
                secondaryColor: '#000',
                accentColor: '#d80000',
                textColor: '#000',
                placeholderColor: '#b8b8b8',
                disabledColor: '#e9e9e9',
                backgroundColor: '#fff',
                googleColor: '#756d6d',
                facebookColor: '#3b5998',
              },
            }}>
            <NavigationContainer ref={NavigationService.navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  header: () => null,
                }}>
                <Stack.Screen
                  name={Screen.LoadingScreen}
                  component={LoadingScreen}
                />
                <Stack.Screen name={Screen.List} component={List} />
                <Stack.Screen name={Screen.BoardGame} component={BoardGame} />
                <Stack.Screen name={Screen.Camera} component={Camera} />
                <Stack.Screen name={Screen.AddItem} component={AddItem} />
                <Stack.Screen name={Screen.Login} component={Login} />
                <Stack.Screen name={Screen.Register} component={Register} />
                <Stack.Screen name={Screen.LoanGame} component={LoanGame} />
                <Stack.Screen name={Screen.Panel} component={Panel} />
                <Stack.Screen name={Screen.QR} component={QR} />
                <Stack.Screen name={Screen.Privilege} component={Privilege} />
                <Stack.Screen
                  name={Screen.EditProfile}
                  component={EditProfile}
                />
                <Stack.Screen
                  name={Screen.ChangePassword}
                  component={ChangePassword}
                />
                <Stack.Screen
                  name={Screen.HistoryLoan}
                  component={HistoryLoan}
                />
                <Stack.Screen name={Screen.About} component={About} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </Provider>
      </MenuProvider>
    );
  }
}
