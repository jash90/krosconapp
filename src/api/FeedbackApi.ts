import axios from "../Axios";

export default class FeedbackApi {
    public static apiName = "feedback";
    public static async add(
        userId: number,
        boardGameId: number,
        loanGameId: number,
        rating: number
    ) {
        return await axios.post(`/${this.apiName}/add`, {
            userId,
            boardGameId,
            loanGameId,
            rating
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(feedbackId: number) {
        return await axios.get(`/${this.apiName}/${feedbackId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(
        userId: number,
        boardGameId: number,
        loanGameId: number,
        rating: number
    ) {
        return await axios.post(`/${this.apiName}/edit/`, {
            userId,
            boardGameId,
            loanGameId,
            rating
        });
    }
    public static async remove(feedbackId: number) {
        return await axios.delete(`/${this.apiName}/remove/${feedbackId}`);
    }
}
