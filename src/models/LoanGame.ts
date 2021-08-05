import { Game, User } from ".";

export default class LoanGame {
    public id: number = 0;
    public user: User = new User();
    public boardGame: Game = new Game();
    public hireUser: User = new User();
    public startLoan: Date = new Date();
    public endLoan: Date | null = null;

    public LoanGame() {
        this.id = 0;
        this.user = new User();
        this.boardGame = new Game();
        this.hireUser = new User();
        this.startLoan = new Date();
        this.endLoan = null;
    }
    public setGame(loanGame: LoanGame) {
        this.id = loanGame.id;
        this.user.setUser(loanGame.user);
        this.boardGame.setGame(loanGame.boardGame);
        this.hireUser.setUser(loanGame.hireUser);
        this.startLoan = loanGame.startLoan;
        this.endLoan = null;
    }
    public clear() {
        this.setGame(new LoanGame());
    }
}
