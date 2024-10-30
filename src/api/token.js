import jwtDecode from "jwt-decode";
import { TOKEN } from "../config/constants";

export class Token {
  
  setToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();

    if (currentDate > expireDate) {
      return true;
    } else {
      return false;
    }
  }
}
