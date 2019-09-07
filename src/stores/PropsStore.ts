import { observable, action } from "mobx";
import { Game, User } from "../models";
import Scenes from "../Scenes";
import TypeItem from "../TypeItem";

export default class PropsStore {
    @observable
    game: Game | null = null;
    @observable
    listgame = observable<Game>([])
    @observable
    user: User | null = null;
    @observable
    code: string = "";
    @observable
    routeName: Scenes = Scenes.List;
    @observable
    typeItem: TypeItem = TypeItem.User;

    @action setGame(game: Game | null) {
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

    @action setCode(code: string) {
        this.code = code;
    }

    @action setRouteName(routeName: Scenes) {
        this.routeName = routeName;
    }
    
    @action setTypeItem(typeItem:TypeItem){
        this.typeItem = typeItem;
    }
}