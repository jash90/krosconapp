import axios from "../Axios";
export default class TableApi {
    public static apiName = "table";
    public static async add(
        name: string) {
        return await axios.post(`/${this.apiName}/add`, {
            name
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async get(tableId: number) {
        return await axios.get(`/${this.apiName}/${tableId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(name: string, tableId :number) {
        return await axios.post(`/${this.apiName}/edit/`,{
            name,
            tableId
        });
    }
    public static async remove(tableId: number) {
        return await axios.delete(`/${this.apiName}/remove/${tableId}`)
    }
}