import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Stores from "../../stores";
import NavigationService from "../navigation/NavigationService";
import Scenes from "../navigation/utils/Scenes";

export default class ErrorUtil {
    public static async errorService(error: any) {
        const connectionInfo = await NetInfo.fetch();
        const internetConnectionStatus =
            connectionInfo.type !== "none" && connectionInfo.type !== "unknown";
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        } else if (error.code === 401) {
            Stores.authStore.clearUser();
            await AsyncStorage.removeItem("User");
            axios.defaults.headers.common["authorization"] = null;
            NavigationService.navigate(Scenes.Login);
            Toast.show(`Brak Autoryzacji zaloguj się ponownie.`, Toast.LONG);
        } else if (error) {
            console.log({error});
            Toast.show(
                `Coś poszło nie tak skontaktuj się z obsługą, bądź administratorem.`,
                Toast.LONG
            );
        }
    }
}
