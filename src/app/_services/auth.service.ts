import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUser, RegisterUser } from "../_models/user-models";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseUrl = "http://localhost:5001/api/auth/";
  private jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: LoginUser) {
    return this.http.post(`${this.baseUrl}login`, model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem("token", user.token);
          this.setDecodedToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  setDecodedToken(token: string) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(registerUser: RegisterUser) {
    return this.http.post(`${this.baseUrl}register`, registerUser);
  }
}
