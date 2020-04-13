import { Provider } from "mobx-react";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import {
    createAppContainer,
    NavigationContainerComponent
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
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
    Register,
    HistoryLoan,
    About
} from "./src/scenes/index";
import store from "./src/stores";
import NavigationService from "./src/NavigationService";
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';


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
        ChangePassword,
        HistoryLoan,
        About
    },
    {
        headerMode: "none"
        //   initialRouteName:"About"
    }
);

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends React.Component {

     render() {
        return (
            <MenuProvider>
                <Provider {...store}>
                    <RootNavigator
                        ref={(navigatorRef: NavigationContainerComponent) => {
                            NavigationService.setTopLevelNavigator(
                                navigatorRef
                            );
                        }}
                    />
                </Provider>
            </MenuProvider>
        );
    }
}