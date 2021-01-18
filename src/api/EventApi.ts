import axios from "../Axios";

export default class EventApi {
    public static apiName = "event";
    public static async add(
        name: string,
        start: Date,
        end: Date,
        description: string
    ) {
        return await axios.post(`/${this.apiName}/add`, {
            name,
            start,
            end,
            description
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(eventId: number) {
        return await axios.get(`/${this.apiName}/${eventId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(
        name: string,
        start: Date,
        end: Date,
        description: string,
        eventId: number
    ) {
        return await axios.post(`/${this.apiName}/edit/`, {
            name,
            start,
            end,
            description,
            eventId
        });
    }
    public static async remove(eventId: number) {
        return await axios.delete(`/${this.apiName}/remove/${eventId}`);
    }
}
