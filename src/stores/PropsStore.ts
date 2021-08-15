import {action, observable} from "mobx";
import User from "../features/auth/models/User";
import Game from "../features/boardGame/models/Game";
import LoanGame from "../features/loanGame/models/LoanGame";
import ScanQRItem from "../features/loanGame/models/ScanQRItem";
import Scenes from "../services/navigation/utils/Scenes";

export default class PropsStore {
    @observable
    game: Game = new Game();
    @observable
    listgame = observable<Game>([]);
    @observable
    maxPageBoardGame: number = 0;
    @observable
    user: User = new User();
    @observable
    code: string = "";
    @observable
    routeName: Scenes = Scenes.List;
    @observable
    ScanQRItem: ScanQRItem = ScanQRItem.User;
    @observable
    historyLoan: LoanGame[] = [];

    @action setGame(game: Game) {
        this.game = game;
    }

    @action setListGame(listGame: any) {
        this.listgame = listGame;
    }

    @action setMaxPageBoardGame(maxPageBoardGame: number) {
        this.maxPageBoardGame = maxPageBoardGame;
    }

    @action setUser(user: User) {
        this.user = user;
    }

    @action clearUser() {
        this.user = new User();
    }

    @action clearGame() {
        this.game = new Game();
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

    @action setScanQRItem(ScanQRItem: ScanQRItem) {
        this.ScanQRItem = ScanQRItem;
    }

    @action setHistoryLoan(historyLoan: LoanGame[]) {
        this.historyLoan = historyLoan;
    }
}
