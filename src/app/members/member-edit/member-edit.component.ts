import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IUser } from "src/app/_models/user-models";
import { AlertifyService } from "src/app/_services/alertify.service";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  user: IUser;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly alertify: AlertifyService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(this.user);
      this.user = data.user;
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success("Profile updated successfully");
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
