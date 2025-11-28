import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {


  isLoading: boolean = false ;
  form = this.fb.group({
    token: [ this.route.snapshot.queryParamMap.get('token'), [Validators.required]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required]
  });

  constructor(
    public userService: UserService,
    private fb : UntypedFormBuilder ,
    public snackbarService: SnackbarService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  async resetPass() {
    try {
      this.isLoading = true;
      const resp = await this.userService.resetForgotPass(this.form.value).toPromise();
      console.log(resp);
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        this.form.reset();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }

      if(resp.errors && resp.errors.token){
        this.snackbarService.openSnackBar(resp.errors.email[0]);
      }

      if(resp.errors && resp.errors.password){
        this.snackbarService.openSnackBar(resp.errors.password[0]);
      }

    } catch (e) {
      console.log(e);
      this.snackbarService.openSnackBar('Something went wrong');
    } finally {
      this.isLoading = false;
    }
  }



}
