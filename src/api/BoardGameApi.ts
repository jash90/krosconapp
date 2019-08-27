import axios from "../Axios";
export default class BoardGameApi {
    public static apiName = "boardGame";
    public static async add(name: string,
        uuid: string,
        minPlayers: number,
        maxPlayers: number,
        playingTime: number,
        minAge: number,
        publisherId: number) {
        return await axios.post(`/${this.apiName}/add`, {
            name,
            uuid,
            minPlayers,
            maxPlayers,
            playingTime,
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
        return await axios.get(`/${this.apiName}/${boardGameId}`)
    }
    public static async offset(id: number) {
        return await axios.get(`/${this.apiName}/offset/${id}`)
    }
    public static async edit(name: string,
        uuid: string,
        minPlayers: number,
        maxPlayers: number,
        playingTime: number,
        minAge: number,
        publisherId: number,
        boardGameId: number) {
        return await axios.post(`/${this.apiName}/edit`, {
            name,
            uuid,
            minPlayers,
            maxPlayers,
            playingTime,
            minAge,
            publisherId,
            boardGameId
        });
    }
    public static async remove(boardGameId: number) {
        return await axios.delete(`/${this.apiName}/remove/${boardGameId}`)
    }

    public static async search(name: string | null = null,
        minPlayers: number | null = null,
        maxPlayers: number | null = null,
        playingTime: number | null = null,
        minAge: number | null = null,
        publisherId: number | null = null,
        uuid: string | null = null
    ) {
        return await axios.post(`/${this.apiName}/search`, {
            name,
            minPlayers,
            maxPlayers,
            playingTime,
            minAge,
            publisherId,
            uuid
        })
    }
}