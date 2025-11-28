import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading: boolean = false ;
  form = this.fb.group({
    email: ['', [Validators.required]]
  });

  constructor(
   public userService: UserService,
   private fb : UntypedFormBuilder ,
   public snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async sendEmail() {
    try {
      this.isLoading = true;
      const resp = await this.userService.sendPasswordResetLink(this.form.value).toPromise();
      console.log(resp);
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        this.form.reset();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }

      if(resp.errors && resp.errors.email){
        this.snackbarService.openSnackBar(resp.errors.email[0]);
      }

    } catch (e) {
      console.log(e);
      this.snackbarService.openSnackBar('Something went wrong');
    } finally {
      this.isLoading = false;
    }
  }


}
