import axios from "../Axios";
export default class BoardGameTypeApi {
    public static apiName = "boardGameType";
    public static async add(boardGameId: number, typeId: number) {
        return await axios.post(`/${this.apiName}/add`, {
            boardGameId,
            typeId
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(boardGameTypeId: number) {
        return await axios.get(`/${this.apiName}/${boardGameTypeId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(
        boardGameId: number,
        typeId: number,
        boardGameTypeId: number
    ) {
        return await axios.post(`/${this.apiName}/edit/`, {
            boardGameId,
            typeId,
            boardGameTypeId
        });
    }
    public static async remove(boardGameTypeId: number) {
        return await axios.delete(`/${this.apiName}/remove/${boardGameTypeId}`);
    }
}
