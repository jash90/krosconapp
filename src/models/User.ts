export default class User {
    public id: number = 0;
    public firstname: string = "";
    public lastname: string = "";
    public email: string = "";
    public city: string = "";
    public age: number = 0;
    public token: string = "";
    public tokenExpired: Date = new Date();
    public privilegeId: number = 0;
    public User() {
        this.id = 0;
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.city = "";
        this.age = 0;
        this.token = "";
        this.tokenExpired = new Date();
        this.privilegeId = 0;
    }
    public setUser(user: User) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname
        this.email = user.email;
        this.city = user.city;
        this.age = user.age;
        this.token = user.token;
        this.tokenExpired = user.tokenExpired;
        this.privilegeId = user.privilegeId;
    }
    public clear() {
        this.setUser(new User());
    }
}