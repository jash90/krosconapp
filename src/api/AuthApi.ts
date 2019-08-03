import axios from "../Axios";
export class AuthApi {
  public static async login(email: string, password: string) {
    return await axios.post("/login", {
      email: email,
      password: password
    });
  }
  public static async register(email: string, password: string, firstname: string, lastname: string) {
    return await axios.post("/register", {
      email,
      password,
      firstname,
      lastname
    });
  }
}