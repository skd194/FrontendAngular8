import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() {}

  ngOnInit() {}

  updateRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  // getValues() {
  //   this.http.get("http://localhost:5001/api/values").subscribe(
  //     response => {
  //       this.values = response;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
