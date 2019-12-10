import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { IUser } from "../_models/user-models";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class MemberDetailResolver implements Resolve<IUser> {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly alertify: AlertifyService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    return this.userService.getUser(route.params.id).pipe(
      catchError(error => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(["/members"]);
        return of(null);
      })
    );
  }
}
