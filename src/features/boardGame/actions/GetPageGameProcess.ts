import ErrorUtil from "../../../services/error/ErrorUtil";
import {networkService} from "../../../services/network/NetworkService";
import Store from "../../../stores";

export async function GetPageGameProcess(page: number = 0) {
    try {
        const response = await networkService.offsetBoardGames(page);

        console.log({response});

        Store.propsStore.listgame = response.data.rows;
    } catch (error) {
        await ErrorUtil.errorService(error);
    }
}
