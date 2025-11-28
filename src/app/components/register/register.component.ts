import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SocialLoginService} from "../../services/social-login.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../assets/css/theme.css']
})
export class RegisterComponent implements OnInit {

  routes = ROUTES ;
  public isLoading = false;

  public respData : any ;

  public role : any ;
  public roleIndex = 0 ;
  form = this.fb.group({
    username: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password_confirm: [''],
    role: ['' , [Validators.required]]
  });

  constructor(
      private fb: UntypedFormBuilder,
      private snackbarService: SnackbarService,
      private authService : AuthService ,public router : Router , private activatedRoute: ActivatedRoute ,
  public socialLoginService : SocialLoginService
  ) {


  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) =>  {
      this.role= params.get('role');
      console.log(this.role);
      if(this.role === 'customer'){
        this.roleIndex = 1 ;
      } else {
        this.roleIndex = 0 ;
      }
      this.form.controls.role.setValue(this.role);
    });

  }

  async registerV2() {
    if (this.form.invalid){
      return
    }
    this.form.controls.password_confirm.setValue(this.form.controls.password.value);
    console.log(this.form.value)
    try {
      this.isLoading = true;
      const resp = await this.authService.register( this.form.value , this.role ).toPromise();
      console.log(resp);
      this.respData = resp ;
      if(this.respData.success){
        this.snackbarService.openSnackBar(this.respData.success)
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.goToLogin();
        }, 2000);
      }
      if(this.respData.errors){
        if (this.respData.errors['username']){
          this.snackbarService.openSnackBar(this.respData.errors['username'])
        } else if(this.respData.errors['first_name']){
          this.snackbarService.openSnackBar(this.respData.errors['first_name'])
        } else if(this.respData.errors['last_name']){
          this.snackbarService.openSnackBar(this.respData.errors['last_name'])
        } else if(this.respData.errors['email']){
          this.snackbarService.openSnackBar(this.respData.errors['email'])
        } else if(this.respData.errors['phone']){
          this.snackbarService.openSnackBar(this.respData.errors['phone'])
        } else if(this.respData.errors['password']){
          this.snackbarService.openSnackBar(this.respData.errors['password'])
        }
      }

      if(this.respData.error){
        this.snackbarService.openSnackBar(this.respData.error)
      }

    } catch (e) {
      console.log(e);
      this.respData = {
        error : "Something went wrong ! please try again later !"
      }
      this.snackbarService.openSnackBar(this.respData.error)

    } finally {
      this.isLoading = false;
    }
  }

  async register(data:any , role:any) {
    try {
      this.isLoading = true;
      console.log(data);
      const resp = await this.authService.register(data ,role ).toPromise();
      console.log(resp);
      this.respData = resp ;
      if(this.respData.success){
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.goToLogin();
        }, 2000);
      }

    } catch (e) {
      console.log(e);
      this.respData = {
        error : "Something went wrong ! please try again later !"
      }
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin(){
    this.router.navigate(['/sign-in']);
  }

}
