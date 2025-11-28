import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userId: any ;
  @Output() onUserLoaded: EventEmitter<any> = new EventEmitter();
  isLoading: boolean = false;
  user: any;

  form = this.fb.group({
    username : [ '', [Validators.required]] ,
    first_name : ['', [Validators.required]] ,
    last_name : ['', [Validators.required]] ,
    email : ['', [Validators.required]] ,
    phone : ['', [Validators.required]] ,
  });

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    private fb : UntypedFormBuilder ,

  ) { }

  ngOnInit(): void {
    this.getUserDetails().then(r => {});
  }

  async getUserDetails() {
    try {
      this.isLoading = true;
      const resp = await this._userService.getDetails(this.userId).toPromise();
      console.log('User profile', resp);
      if(resp.user){
        this.user = resp.user ;
        this.form.controls.username.setValue(this.user.username);
        this.form.controls.first_name.setValue(this.user.first_name);
        this.form.controls.last_name.setValue(this.user.last_name);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.phone.setValue(this.user.phone);
        this.onUserLoaded.emit(this.user);

      }
    } catch (e) {
      console.log(e);
      this._snackbarService.openSnackBar("Failed to retrieve profile information");
    } finally {
      this.isLoading = false;
    }
  }

  async updateProfile() {

    if(! this.form.valid){
      this._snackbarService.openSnackBar("All the fields are required");
      return;
    }

    try {
      this.isLoading = true;
      const resp = await this._userService.updateProfile(this.userId, this.form.value).toPromise();
      console.log(resp);
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
      }
      if(resp.user){
        this.user = resp.user ;
      }

    } catch (e) {
      console.log(e);
      this._snackbarService.openSnackBar("Failed to retrieve profile information");
    } finally {
      this.isLoading = false;
    }
  }




}
