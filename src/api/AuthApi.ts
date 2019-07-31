import axios from "../Axios";
export class AuthApi {
  public static async login(email: string, password: string) {
    return await axios.post("/login", {
      email: email,
      password: password
    });
  }
}