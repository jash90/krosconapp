import axios from "../Axios";
export default class LectureApi {
    public static apiName = "lecture";
    public static async add(name: string, start: Date, end: Date, description: string, eventId:number) {
        return await axios.post(`/${this.apiName}/add`, {
            name,
            start,
            end,
            description,
            eventId,
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(lectureId: number) {
        return await axios.get(`/${this.apiName}/${lectureId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(name: string, start: Date, end: Date, description: string, eventId:number) {
        return await axios.post(`/${this.apiName}/edit/`, {
            name,
            start,
            end,
            description,
            eventId,
        });
    }
    public static async remove(lectureId: number) {
        return await axios.delete(`/${this.apiName}/remove/${lectureId}`)
    }
}