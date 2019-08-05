import axios from "../Axios";
export default class MechanicApi {
    public static apiName = "mechanic";
    public static async add(
        name: string) {
        return await axios.post(`/${this.apiName}/add`, {
            name
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}/all`);
    }
    public static async get(mechanicId: number) {
        return await axios.get(`/${this.apiName}/${mechanicId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(name: string, mechanicId :number) {
        return await axios.post(`/${this.apiName}/edit/`,{
            name,
            mechanicId
        });
    }
    public static async remove(mechanicId: number) {
        return await axios.delete(`/${this.apiName}/remove/${mechanicId}`)
    }
}