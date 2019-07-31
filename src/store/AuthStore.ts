import { observable, action } from "mobx";

export default class AuthStore {
  @observable
  token;

  getToken() {
    return this.token;
  }

  setToken(token:string) {
    this.token = token;
  }

}
