import axios from "../Axios";
export default class BoardGameMechanicApi {
    public static apiName = "boardGameMechanic";
    public static async add(
        boardGameId: number,
        mechanicId: number, ) {
        return await axios.post(`/${this.apiName}/add`, {
            boardGameId,
            typeId: mechanicId
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(boardGameMechanicId: number) {
        return await axios.get(`/${this.apiName}/${boardGameMechanicId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(boardGameId: number,
        mechanicId: number, boardGameMechanicId: number) {
        return await axios.post(`/${this.apiName}/edit/`, {
            boardGameId,
            mechanicId,
            boardGameMechanicId
        });
    }
    public static async remove(boardGameMechanicId: number) {
        return await axios.delete(`/${this.apiName}/remove/${boardGameMechanicId}`)
    }
}