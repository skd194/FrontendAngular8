import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RegisterUser } from "../_models/user-models";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder
} from "@angular/forms";
import { BsDaterangepickerConfig } from "ngx-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // @Input() data: any;
  @Output() cancelRegister = new EventEmitter();
  registerUser = new RegisterUser();
  registerForm: FormGroup;
  bsConfig: Partial<BsDaterangepickerConfig>;

  uiFields = {
    password: "password",
    username: "username",
    confirmPassword: "confirmPassword"
  };

  uiValidatorCondition = {
    isUserNameInvalid: () =>
      this.registerForm.get(this.uiFields.username).errors &&
      this.registerForm.get(this.uiFields.username).touched,
    isPasswordNameInvalid: () =>
      this.registerForm.get(this.uiFields.password).errors &&
      this.registerForm.get(this.uiFields.password).touched,
    isConfirmPasswordInvalid: () =>
      this.registerForm.get(this.uiFields.confirmPassword).touched &&
      (this.registerForm.get(this.uiFields.confirmPassword).errors ||
        this.registerForm.hasError("passwordMismatch"))
  };

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: "theme-dark-blue"
    };
    this.createRegisterForm();

    //#region Alternative way  of building reactive forms
    /**
     *
     * this.registerForm = new FormGroup(
     *   {
     *     [this.uiFields.username]: new FormControl("", Validators.required),
     *     password: new FormControl("", [
     *       Validators.required,
     *       Validators.minLength(4),
     *       Validators.maxLength(12)
     *     ]),
     *     confirmPassword: new FormControl("", Validators.required)
     *   },
     *   this.passwordMatchValidator
     * );
     */
    //#endregion
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator = (formGroup: FormGroup): ValidationErrors | null => {
    return formGroup.get(this.uiFields.password).value ===
      formGroup.get(this.uiFields.confirmPassword).value
      ? null
      : { passwordMismatch: true };
  };

  cancel() {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser).subscribe(
        response => {
          this.alertify.message("Registered sucessfully");
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.registerUser).subscribe(() => {
            this.router.navigate(["/members"]);
          });
        }
      );
    }
  }
}
