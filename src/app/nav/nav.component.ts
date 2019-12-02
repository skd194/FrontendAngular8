import { Component, OnInit } from "@angular/core";
import { LoginUser } from "../_models/user-models";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loginUser = new LoginUser();

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.loginUser).subscribe(
      next => {
        this.alertify.success("logged in successfully");
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
  }
}
