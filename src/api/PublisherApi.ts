import axios from "../Axios";
export default class PublisherApi {
    public static apiName = "publisher";
    public static async add(name: string) {
        return await axios.post(`/${this.apiName}/add`, {
            name
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(publisherId: number) {
        return await axios.get(`/${this.apiName}/${publisherId}`);
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(name: string, publisherId: number) {
        return await axios.post(`/${this.apiName}/edit/`, {
            name,
            publisherId
        });
    }
    public static async remove(publisherId: number) {
        return await axios.delete(`/${this.apiName}/remove/${publisherId}`);
    }
}
