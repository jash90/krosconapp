import axios from "../Axios";
export default class ReservationApi {
    public static apiName = "reservation";
    public static async add(
        userId: number,
        boardGameId: number,
        tableId: number,
        time: Date
    ) {
        return await axios.post(`/${this.apiName}/add`, {
            userId,
            boardGameId,
            tableId,
            time
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(reservationId: number) {
        return await axios.get(`/${this.apiName}/${reservationId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(
        userId: number,
        boardGameId: number,
        tableId: number,
        time: Date
    ) {
        return await axios.post(`/${this.apiName}/edit/`, {
            userId,
            boardGameId,
            tableId,
            time
        });
    }
    public static async remove(reservationId: number) {
        return await axios.delete(`/${this.apiName}/remove/${reservationId}`);
    }
}
