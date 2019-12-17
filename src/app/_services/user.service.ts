import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { IUser } from "../_models/user-models";
import { PaginatedResult, GridFilter } from "../_models/pagination-models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = `${environment.getApiUrl()}User/`;

  constructor(private http: HttpClient) {}

  getUsers(gridFilter?: GridFilter): Observable<PaginatedResult<IUser[]>> {
    const paginationResult = new PaginatedResult<IUser[]>();
    let params = new HttpParams();
    if (gridFilter != null) {
      params = params.append("pageNumber", gridFilter.pageNumber.toString());
      params = params.append("pageSize", gridFilter.pageSize.toString());
    }

    return this.http
      .get<IUser[]>(`${this.baseUrl}`, {
        observe: "response",
        params
      })
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          const paginationInHeader = response.headers.get("Pagination");
          if (paginationInHeader != null) {
            paginationResult.pagination = JSON.parse(paginationInHeader);
          }
          return paginationResult;
        })
      );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}${id}`);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(this.baseUrl + id, user);
  }
}
