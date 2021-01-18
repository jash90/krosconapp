import {BoardGameApi} from "../../api";
import ErrorUtil from "../../ErrorUtil";
import Store from "../../stores";

export async function BoardGamesProcess(page: number = 0){
    try {
        const { data } = await BoardGameApi.offset(page);

        Store.propsStore.listgame = data.rows;
    }
    catch (error) {
        ErrorUtil.errorService(error);
    };
}
