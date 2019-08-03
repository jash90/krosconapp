import { observable, action } from "mobx";
import { User } from "../models";

export default class AuthStore {
  @observable
  token: string = "";
  @observable
  email: string = "";
  @observable
  tokenExpired: Date = new Date();
  @observable
  privilegeId: number = 0;
  @observable
  firstname: string = "";
  @observable
  lastname: string = "";
  @observable
  city: string = "";
  @observable
  age: number = 0;


  setToken(token: string) {
    this.token = token;
  }

  setTokenExpired(tokenExpired: Date) {
    this.tokenExpired = tokenExpired;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPrivilegeId(privilegeId: number) {
    this.privilegeId = privilegeId;
  }

  setAge(age: number) {
    this.age = age;
  }

  setCity(city: string) {
    this.city = city;
  }

  setFirstname(firstname: string) {
    this.firstname = firstname;
  }

  setLastname(lastname: string) {
    this.lastname = lastname;
  }

  setUser(user:User){
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.age = user.age;
    this.city = user.city;
    this.email = user.email;
    this.token = user.token;
    this.tokenExpired = user.tokenExpired;
    this.privilegeId = user.privilegeId;
  }

  clearUser(){
    this.firstname = "";
    this.lastname = "";
    this.age = 0;
    this.city = "";
    this.email = "";
    this.token = "";
    this.tokenExpired = new Date();
    this.privilegeId = 0;
  }

}
