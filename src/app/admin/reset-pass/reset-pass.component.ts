import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  form = this.fb.group({
    current_password : ['', [Validators.required]] ,
    new_password: ['', [Validators.required]] ,
    confirm_password: ['', [Validators.required]]
  });
  progress: boolean = false;

  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    private sweetAlert : SweetAlertService,
    private route : ActivatedRoute,
    private userService: UserService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
  }

  async resetPass() {
    try {
      this.progress = true;
      const resp = await this.userService.changePass(this.authService.getUserID() , this.form.value).toPromise();
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        this.form.reset();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }

}
