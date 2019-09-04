import { observable, action } from "mobx";
import { Game, User } from "../models";

export default class PropsStore {
    @observable
    game: Game = new Game();
    @observable
    user: User = new User();

    setGame(game: Game) {
        this.game.setGame(game);
    }

    setUser(user: User) {
        this.user.setUser(user);
    }

    clearUser() {
        this.user.clear();
    }
    clearGame() {
        this.game.clear();
    }

}
