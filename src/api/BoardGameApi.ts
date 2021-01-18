import axios from "../Axios";
export default class BoardGameApi {
    public static apiName = "boardGames";
    public static async add(
        name: string,
        uuid: string,
        description: string,
        minPlayers: number,
        maxPlayers: number,
        playingTime: number,
        image = null,
        minAge: number,
        publisherId: number
    ) {
        return await axios.post(`/${this.apiName}/add`, {
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            playingTime,
            image,
            minAge,
            publisherId
        });
    }
    public static async all() {
        return await axios.get(`/${this.apiName}s`);
    }
    public static async available() {
        return await axios.get(`/${this.apiName}/available`);
    }
    public static async get(boardGameId: number) {
        return await axios.get(`/${this.apiName}/${boardGameId}`);
    }
    public static async offset(id: number = 0) {
        return await axios.get(`/${this.apiName}/offset/${id}`);
    }
    public static async edit(
        name: string,
        uuid: string,
        description: string,
        minPlayers: number,
        maxPlayers: number,
        playingTime: number,
        image = null,
        minAge: number,
        publisherId: number,
        boardGameId: number
    ) {
        return await axios.post(`/${this.apiName}/edit`, {
            name,
            uuid,
            description,
            minPlayers,
            maxPlayers,
            playingTime,
            image,
            minAge,
            publisherId,
            boardGameId
        });
    }
    public static async remove(boardGameId: number) {
        return await axios.delete(`/${this.apiName}/remove/${boardGameId}`);
    }

    public static async search(search: any) {
        return await axios.post(`/${this.apiName}/search`, search);
    }

    public static async searchByUUID(uuid: string) {
        return await axios.get(`/${this.apiName}/search/uuid/${uuid}`);
    }
}
