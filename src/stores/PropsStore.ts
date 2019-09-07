import { observable, action } from "mobx";
import { Game, User } from "../models";

export default class PropsStore {
    @observable
    game: Game|null = null;
    @observable
    listgame = observable<Game>([])
    @observable
    user: User|null = null;

    @action setGame(game: Game|null) {
        this.game = game;
    }

    @action setListGame(listGame: any) {
        this.listgame = listGame;
    }

    @action setUser(user: User) {
        this.user = user;
    }

    @action clearUser() {
        this.user = null;
    }
    @action clearGame() {
        this.game = null;
    }

    @action clearListGame() {
        this.listgame = observable([]);
    }

}
