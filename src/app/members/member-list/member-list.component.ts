import { Component, OnInit } from "@angular/core";
import { IUser } from "../../_models/user-models";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { IPagination, GridFilter } from "src/app/_models/pagination-models";
import { PaginatedResult } from "../../_models/pagination-models";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: IUser[];
  pagination: IPagination;
  constructor(
    private readonly userService: UserService,
    private readonly alertify: AlertifyService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      ({ response }: { response: PaginatedResult<IUser[]> }) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers(this.pagination.currentPage);
  }

  loadUsers(currentPage: number) {
    this.userService
      .getUsers(new GridFilter().setPageNumber(currentPage))
      .subscribe((data: PaginatedResult<IUser[]>) => {
        this.users = data.result;
        this.pagination = data.pagination;
      });
  }
}
