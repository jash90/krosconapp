import { Publisher, Type, Mechanic, LoanGame } from ".";
export default class Game {
    public id: number = 0;
    public uuid: string = "";
    public name: string = "";
    public minPlayers: number = 0;
    public maxPlayers: number = 0;
    public playingTime: number = 0;
    public minAge: number = 0;
    public description: string = "";
    public publisher: Publisher = new Publisher();
    public loanGames: LoanGame[] = [];
    public types: Type[] = [];
    public mechanics: Mechanic[] = [];

    public Game() {
        this.id = 0;
        this.uuid = "";
        this.name = "";
        this.minPlayers = 0;
        this.maxPlayers = 0;
        this.playingTime = 0;
        this.minAge = 0;
        this.description = "";
        this.publisher = new Publisher();
    }
    public setGame(game: Game) {
        this.id = game.id;
        this.uuid = game.uuid;
        this.name = game.name;
        this.minPlayers = game.minPlayers;
        this.maxPlayers = game.maxPlayers;
        this.playingTime = game.playingTime;
        this.minAge = game.minAge;
        this.description = game.description;
        this.publisher = game.publisher;
    }
    public clear() {
        this.setGame(new Game());
    }
}
