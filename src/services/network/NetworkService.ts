import axios, {AxiosInstance} from "axios";

class NetworkService {
    public service: AxiosInstance;

    constructor() {

        this.service = axios.create({
            //baseURL: "https://kroscon-api.raccoonsoftware.pl",
            baseURL: "http://localhost:3300",
            timeout: 20000,
            headers: {"X-Custom-Header": "application/json"}
        });

    }

    async login(email: string, password: string) {
        return await this.service.post("/login", {
            email: email,
            password: password
        });
    }

    async register(
        email: string,
        password: string,
        firstname: string,
        lastname: string
    ) {
        return await this.service.post("/register", {
            email,
            password,
            firstname,
            lastname
        });
    }

    async changePrivilege(userId: number, privilegeId: number) {
        return await this.service.post("/changePrivilege", {
            userId,
            privilegeId
        });
    }

    async changePassword(userId: number, password: string) {
        return await this.service.post("/changePassword", {
            userId,
            password
        });
    }

    async updateUser(
        firstname: string,
        lastname: string,
        city: string,
        age: number,
        userId: number
    ) {
        return await this.service.post(`/user/edit`, {
            firstname,
            lastname,
            city,
            age,
            userId
        });
    }

    async allUsers() {
        return await this.service.get(`/users`);
    }

    async getUser(userId: number) {
        return await this.service.get(`/user/${userId}`);
    }

    async offsetUsers(offset: number = 0) {
        return await this.service.get(`/user/offset/${offset}`);
    }


    async searchUser(email: string) {
        return await this.service.post(`/user/search`, {email});
    }

    async addBoardGame(
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
        return await this.service.post(`/boardGames/add`, {
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

    async allBoardGames() {
        return await this.service.get(`/boardGames`);
    }

    async availableBoardGames() {
        return await this.service.get(`/boardGame/available`);
    }

    async getBoardGame(boardGameId: number) {
        return await this.service.get(`/boardGame/${boardGameId}`);
    }

    async offsetBoardGames(offset: number = 0) {
        return await this.service.get(`/boardGames/offset/${offset}`);
    }

    async updateBoardGame(
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
        return await this.service.post(`/boardGame/edit`, {
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

    async deleteBoardGame(boardGameId: number) {
        return await this.service.delete(`/boardGame/remove/${boardGameId}`);
    }

    async searchBoardGame(search: any) {
        return await this.service.post(`/boardGame/search`, search);
    }

    async searchBoardGameByUUID(uuid: string) {
        return await this.service.get(`/boardGame/search/uuid/${uuid}`);
    }

    async addEvent(
        name: string,
        start: Date,
        end: Date,
        description: string
    ) {
        return await this.service.post(`/event/add`, {
            name,
            start,
            end,
            description
        });
    }

    async allEvents() {
        return await this.service.get(`/events`);
    }

    async getEvent(eventId: number) {
        return await this.service.get(`/event/${eventId}`);
    }

    async offsetEvents(offset: number = 0) {
        return await this.service.get(`/event/offset/${offset}`);
    }

    async updateEvent(
        name: string,
        start: Date,
        end: Date,
        description: string,
        eventId: number
    ) {
        return await this.service.post(`/event/edit/`, {
            name,
            start,
            end,
            description,
            eventId
        });
    }

    async deleteEvent(eventId: number) {
        return await this.service.delete(`/event/remove/${eventId}`);
    }

    async addFeedback(
        userId: number,
        boardGameId: number,
        loanGameId: number,
        rating: number
    ) {
        return await this.service.post(`/feedback/add`, {
            userId,
            boardGameId,
            loanGameId,
            rating
        });
    }

    async allFeedbacks() {
        return await this.service.get(`/feedbacks`);
    }

    async getFeedback(feedbackId: number) {
        return await this.service.get(`/feedback/${feedbackId}`);
    }

    async offsetFeedbacks(offset: number = 0) {
        return await this.service.get(`/feedback/offset/${offset}`);
    }

    async updateFeedback(
        userId: number,
        boardGameId: number,
        loanGameId: number,
        rating: number
    ) {
        return await this.service.post(`/feedback/edit/`, {
            userId,
            boardGameId,
            loanGameId,
            rating
        });
    }

    async deleteFeedback(feedbackId: number) {
        return await this.service.delete(`/feedback/remove/${feedbackId}`);
    }

    async addLecture(
        name: string,
        start: Date,
        end: Date,
        description: string,
        eventId: number
    ) {
        return await this.service.post(`/lecture/add`, {
            name,
            start,
            end,
            description,
            eventId
        });
    }

    async allLectures() {
        return await this.service.get(`/lectures`);
    }

    async getLecture(lectureId: number) {
        return await this.service.get(`/lecture/${lectureId}`);
    }

    async offsetLectures(offset: number = 0) {
        return await this.service.get(`/lecture/offset/${offset}`);
    }

    async updateLecture(
        name: string,
        start: Date,
        end: Date,
        description: string,
        eventId: number
    ) {
        return await this.service.post(`/lecture/edit/`, {
            name,
            start,
            end,
            description,
            eventId
        });
    }

    async deleteLecture(lectureId: number) {
        return await this.service.delete(`/lecture/remove/${lectureId}`);
    }

    async addLoanGame(
        userId: number,
        hireUserId: number,
        boardGameId: number,
        tableId: number
    ) {
        return await this.service.post(`/loanGame/add`, {
            userId,
            hireUserId,
            boardGameId,
            tableId
        });
    }

    async allLoanGames() {
        return await this.service.get(`/loanGames`);
    }

    async getLoanGame(loanGameId: number) {
        return await this.service.get(`/loanGame/${loanGameId}`);
    }

    async offsetLoanGames(offset: number = 0) {
        return await this.service.get(`/loanGame/offset/${offset}`);
    }

    async updateLoanGame(loanGameId: number, hireUserId: number) {
        return await this.service.post(`/loanGame/edit`, {
            loanGameId,
            hireUserId
        });
    }

    async deleteLoanGame(loanGameId: number) {
        return await this.service.delete(`/loanGame/remove/${loanGameId}`);
    }

    async getLoanGamesByUser(userId: number) {
        return await this.service.post(`/loanGame/user`, {userId});
    }

    async addMechanic(name: string) {
        return await this.service.post(`/mechanic/add`, {
            name
        });
    }

    async allMechanics() {
        return await this.service.get(`/mechanics`);
    }

    async getMechanic(mechanicId: number) {
        return await this.service.get(`/mechanic/${mechanicId}`);
    }

    async offsetMechanics(offset: number = 0) {
        return await this.service.get(`/mechanic/offset/${offset}`);
    }

    async updateMechanic(name: string, mechanicId: number) {
        return await this.service.post(`/mechanic/edit/`, {
            name,
            mechanicId
        });
    }

    async deleteMechanic(mechanicId: number) {
        return await this.service.delete(`/mechanic/remove/${mechanicId}`);
    }

    async addPublisher(name: string) {
        return await this.service.post(`/publisher/add`, {
            name
        });
    }

    async allPublishers() {
        return await this.service.get(`/publishers`);
    }

    async getPublisher(publisherId: number) {
        return await this.service.get(`/publisher/${publisherId}`);
    }

    async offsetPublishers(offset: number = 0) {
        return await this.service.get(`/publisher/offset/${offset}`);
    }

    async updatePublisher(name: string, publisherId: number) {
        return await this.service.post(`/publisher/edit/`, {
            name,
            publisherId
        });
    }

    async deletePublisher(publisherId: number) {
        return await this.service.delete(`/publisher/remove/${publisherId}`);
    }

    async addReservation(
        userId: number,
        boardGameId: number,
        tableId: number,
        time: Date
    ) {
        return await this.service.post(`/reservation/add`, {
            userId,
            boardGameId,
            tableId,
            time
        });
    }

    async allReservations() {
        return await this.service.get(`/reservations`);
    }

    async getReservation(reservationId: number) {
        return await this.service.get(`/reservation/${reservationId}`);
    }

    async offsetReservations(offset: number = 0) {
        return await this.service.get(`/reservation/offset/${offset}`);
    }

    async updateReservation(
        userId: number,
        boardGameId: number,
        tableId: number,
        time: Date
    ) {
        return await this.service.post(`/reservation/edit/`, {
            userId,
            boardGameId,
            tableId,
            time
        });
    }

    async deleteReservation(reservationId: number) {
        return await this.service.delete(`/reservation/remove/${reservationId}`);
    }

    async addTable(name: string) {
        return await this.service.post(`/table/add`, {
            name
        });
    }

    async allTables() {
        return await this.service.get(`/tables`);
    }

    async getTable(tableId: number) {
        return await this.service.get(`/table/${tableId}`);
    }

    async offsetTables(offset: number = 0) {
        return await this.service.get(`/table/offset/${offset}`);
    }

    async updateTable(name: string, tableId: number) {
        return await this.service.post(`/table/edit/`, {
            name,
            tableId
        });
    }

    async deleteTable(tableId: number) {
        return await this.service.delete(`/table/remove/${tableId}`);
    }

    async addType(name: string) {
        return await this.service.post(`/type/add`, {
            name
        });
    }

    async allTypes() {
        return await this.service.get(`/types`);
    }

    async getType(typeId: number) {
        return await this.service.get(`/type/${typeId}`);
    }

    async offsetTypes(offset: number = 0) {
        return await this.service.get(`/type/offset/${offset}`);
    }

    async updateType(name: string, typeId: number) {
        return await this.service.post(`/type/edit/`, {
            name,
            typeId
        });
    }

    async deleteType(typeId: number) {
        return await this.service.delete(`/type/remove/${typeId}`);
    }

}

export const networkService: NetworkService = new NetworkService();
