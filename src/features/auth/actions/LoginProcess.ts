import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import ErrorUtil from "../../../services/error/ErrorUtil";
import NavigationService from "../../../services/navigation/NavigationService";
import Scenes from "../../../services/navigation/utils/Scenes";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";

export async function LoginProcess(login: string, password: string) {
    try {
        let {data} = await networkService.login(login, password);

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
        await ErrorUtil.errorService(error);
    }
}
