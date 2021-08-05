import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { AuthApi } from "../../api";
import axios from "../../Axios";
import ErrorUtil from "../../ErrorUtil";
import NavigationService from "../../NavigationService";
import Scenes from "../../Scenes";
import Store from "../../stores";

export async function LoginProcess(login: string, password: string) {
    try {
        let { data } = await AuthApi.login(login, password);

        if (data) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            data.token = `Bearer ${data.token}`;

            Store.authStore.setUser(data);

            await AsyncStorage.setItem(
                "User",
                JSON.stringify(data)
            );

            NavigationService.reset(Scenes.List);
        } else if (data.error) {
            Toast.show("Niepoprawny login lub hasło.");
        }
    } catch (error) {
        ErrorUtil.errorService(error);
    }
}
