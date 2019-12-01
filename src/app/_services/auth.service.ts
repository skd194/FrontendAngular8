import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUser, RegisterUser } from "../_models/user-models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5001/api/auth/";

  constructor(private http: HttpClient) {}

  login(model: LoginUser) {
    return this.http.post(`${this.baseUrl}login`, model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }

  register(registerUser: RegisterUser) {
    return this.http.post(`${this.baseUrl}register`, registerUser);
  }
}
