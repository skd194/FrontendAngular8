import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RegisterUser } from "../_models/user-models";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // @Input() data: any;
  @Output() cancelRegister = new EventEmitter();
  registerUser = new RegisterUser();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  cancel() {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

  register() {
    this.authService.register(this.registerUser).subscribe(
      response => {
        console.log("Registered sucessfully.");
      },
      error => {
        console.log(error);
      }
    );
  }
}