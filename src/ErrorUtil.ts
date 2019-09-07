import { NetInfo } from "react-native";
import Toast from "react-native-simple-toast";
import { Crashlytics } from 'react-native-fabric';
export default class ErroUtil {
    public static async errorService(error: any) {
        const connectionInfo = await NetInfo.getConnectionInfo();
        const internetConnectionStatus = connectionInfo.type !== 'none' && connectionInfo.type !== 'unknown';
        if (!internetConnectionStatus) {
            Toast.show("Brak połączenia z internetem", Toast.LONG);
        }
        else if (error) {
            Toast.show(`Coś poszło nie tak skontaktuj się z obsługą, bądź administratorem.`, Toast.LONG);
        }
        Crashlytics.recordError({
            code: "123",
            message: JSON.stringify(error),
        });
    }
}