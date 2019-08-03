export default class User {
    public id: number = 0;
    public firstname: string = "";
    public lastname: string = "";
    public email: string = "";
    public password: string = "";
    public city: string = "";
    public age: number = 0;
    public token: string = "";
    public tokenExpired: Date = new Date();
    public privilegeId: number = 0;
}