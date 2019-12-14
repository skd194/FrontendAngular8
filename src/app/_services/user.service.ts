import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../_models/user-models";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = `${environment.getApiUrl()}User/`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}`);
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}${id}`);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(this.baseUrl + id, user);
  }
}
