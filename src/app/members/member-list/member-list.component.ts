import { Component, OnInit } from "@angular/core";
import { IUser } from "../../_models/user-models";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: IUser[];

  constructor(
    private readonly userService: UserService,
    private readonly alertify: AlertifyService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }
}
