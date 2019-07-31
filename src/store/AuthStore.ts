import { observable, action } from "mobx";

export default class AuthStore {
  @observable 
  token:string = "";
  @observable
  email:string= "";
  @observable
  tokenExpired:Date = new Date();


  getToken() {
    return this.token;
  }

  setToken(token:string) {
    this.token = token;
  }

  getTokenExpired() {
    return this.tokenExpired;
  }

  setTokenExpired(tokenExpired:Date) {
    this.tokenExpired = this.tokenExpired;
  }

  setEmail(email:string) {
    this.email = this.email;
  }

}
