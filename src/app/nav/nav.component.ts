import { Component, OnInit } from "@angular/core";
import { LoginUser } from "../_models/user-models";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loginUser = new LoginUser();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.loginUser).subscribe(
      next => {
        console.log("Logged in successfully");
      },
      error => {
        console.log(error);
      }
    );
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    console.log("logged out");
  }
}
