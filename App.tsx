import {Provider} from "mobx-react";
import React from "react";
import {MenuProvider} from "react-native-popup-menu";
import {createAppContainer, NavigationContainerComponent} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {ThemeProvider} from "styled-components";
import About from "./src/features/about/screens/About";
import ChangePassword from "./src/features/auth/screens/ChangePassword";
import EditProfile from "./src/features/auth/screens/EditProfile";
import Login from "./src/features/auth/screens/Login";
import Panel from "./src/features/auth/screens/Panel";
import Privilege from "./src/features/auth/screens/Privilege";
import QR from "./src/features/auth/screens/QR";
import Register from "./src/features/auth/screens/Register";
import AddItem from "./src/features/boardGame/screens/AddItem";
import BoardGame from "./src/features/boardGame/screens/BoardGame";
import List from "./src/features/boardGame/screens/List";
import LoadingScreen from "./src/features/loading/screens/LoadingScreen";
import Camera from "./src/features/loanGame/screens/Camera";
import HistoryLoan from "./src/features/loanGame/screens/HistoryLoan";
import LoanGame from "./src/features/loanGame/screens/LoanGame";
import NavigationService from "./src/services/navigation/NavigationService";
import store from "./src/stores";

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
                    <ThemeProvider theme={{
                        colors: {
                            primaryColor: "#ccc",
                            secondaryColor: "#000",
                            accentColor: "#d80000",
                            textColor: "#000",
                            placeholderColor: "#b8b8b8",
                            disabledColor: "#e9e9e9",
                            backgroundColor: "#fff",
                            googleColor: "#756d6d",
                            facebookColor: "#3b5998"
                        }
                    }}
                    >
                        <RootNavigator
                            ref={(navigatorRef: NavigationContainerComponent) => {
                                NavigationService.setTopLevelNavigator(
                                    navigatorRef
                                );
                            }}
                        />
                    </ThemeProvider>
                </Provider>
            </MenuProvider>
        )
    }
}
