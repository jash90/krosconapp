import axios from "../Axios";
export default class LoanGameApi {
    public static apiName = "loanGame";
    public static async add(
        userId: number,
        hireUserId: number,
        boardGameId: number,) {
        return await axios.post(`/${this.apiName}/add`, {
            userId,
            hireUserId,
            boardGameId
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(loanGameId: number) {
        return await axios.get(`/${this.apiName}/${loanGameId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(loanGameId:number) {
        return await axios.get(`/${this.apiName}/edit/${loanGameId}`);
    }
    public static async remove(loanGameId: number) {
        return await axios.delete(`/${this.apiName}/remove/${loanGameId}`)
    }
}