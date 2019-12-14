import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule
} from "ngx-bootstrap";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { appRoutes } from "./routes";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { environment } from "src/environments/environment";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [environment.getApiUrl() + "auth"]
      }
    })
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}
