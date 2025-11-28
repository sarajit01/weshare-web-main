import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {ThemeService} from "../../services/theme.service";
import {ROUTES} from "../../core/routes";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {PaymentService} from "../../services/payment.service";
import {HasBillingAddress} from "../../models/Card";
import {countriesList, statesList} from "../../core/data/location";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PaymentsFilterBSComponent} from "../../components/payments-filter-bs/payments-filter-bs.component";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.css']
})
export class MyPaymentsComponent implements OnInit, HasBillingAddress {

  user: any
  userAction: string | undefined
  appTheme: string | null | undefined = this.themeService.getAppTheme()
  appLang: string | null | undefined = localStorage.getItem("user_lang")
  formAddCard = this.fb.group({
    user_id: [this.authService.getUserID()],
    card_number : ['', [Validators.required]] ,
    card_exp: ['', [Validators.required]] ,
    card_cvv: ['', [Validators.required]],
    holder_name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required]],

  });
  addCardErrors: any = {}
  transactions: any = {}

  formProfile = this.fb.group({
    username : [ '', [Validators.required]] ,
    first_name : ['', [Validators.required]] ,
    last_name : ['', [Validators.required]] ,
    email : ['', [Validators.required]] ,
    phone : ['', [Validators.required]] ,
  });

  progress: boolean = false;
  tab: string | undefined
  paymentMethods: any = []
  filterData: any = {
    user_id: this.authService.getUserID()
  }

  constructor(
      private fb : UntypedFormBuilder ,
      private snackbarService : SnackbarService ,
      private sweetAlert : SweetAlertService,
      private route : ActivatedRoute,
      private userService: UserService,
      public authService: AuthService,
      private router: Router,
      public sweet: SweetAlertService,
      private themeService: ThemeService,
      private paymentService: PaymentService,
      private _bottomSheet: MatBottomSheet,
      private overlay: Overlay

  ) { }

  ngOnInit(): void {
    this.formAddCard.get('country')?.setValue('HN');
    this.filterStates()
    this.route.queryParams.subscribe((params) => {
      if (params["tab"]){
        this.tab = params["tab"];
        this.userAction = this.tab
      } else {
        this.tab = undefined
        this.userAction = this.tab
      }

      if (this.tab === "Payment Methods"){
        this.getPaymentMethods();
      }
      if (this.tab === "Payment History"){
        this.getTransactions();
      }
    });
  }



  setUserAction(action: string | undefined){
    this.userAction = action
  }

  changeAppTheme(theme: string){
    this.appTheme = theme ;
    this.themeService.setAppTheme(theme)

    setTimeout(()=> {
      window.location.reload()
    }, 1500)

  }

  changeAppLang(lang: string){
    localStorage.setItem("user_lang", lang);
    this.snackbarService.openSnackBar('Please reload to apply updated language settings');
    // window.location.reload();
  }

  async tokenizeCard() {
    try {
      this.progress = true;
      const resp = await this.paymentService.tokenizeCard(this.formAddCard.value).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweet.successNotification("Card Added", "Card added successfully, you can use it for next purchases easily")
        setTimeout(() => {
          this.router.navigate(['/business/payments'], {queryParams: {'tab': "Payment Methods"}})
        }, 2000)
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
      if(resp.errors){
        console.log(resp.errors)
        this.addCardErrors = resp.errors

        if (resp.errors.number){
          this.formAddCard.controls['card_number'].setErrors(resp.errors.number)
        }
        if (resp.errors.expire_month){
          this.formAddCard.controls['card_exp'].setErrors(resp.errors.expire_month)
        }
        if (resp.errors.expire_year){
          this.formAddCard.controls['card_exp'].setErrors(resp.errors.expire_year)
        }
        if (resp.errors.cvv2){
          this.formAddCard.controls['card_cvv'].setErrors(resp.errors.cvv2)
        }
        if (resp.errors.cardholder){
          this.formAddCard.controls['holder_name'].setErrors(resp.errors.cardholder)
        }
        if (resp.errors.address){
          this.formAddCard.controls['address'].setErrors(resp.errors.address)
        }
        if (resp.errors.city){
          this.formAddCard.controls['city'].setErrors(resp.errors.city)
        }
        if (resp.errors.phone){
          this.formAddCard.controls['phone'].setErrors(resp.errors.phone)
        }
        if (resp.errors.state){
          this.formAddCard.controls['state'].setErrors(resp.errors.state)
        }
        if (resp.errors.country){
          this.formAddCard.controls['country'].setErrors(resp.errors.country)
        }
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }



  async getPaymentMethods() {
    try {
      this.progress = true;
      const resp = await this.paymentService.getPaymentMethods().toPromise();
      console.log(resp);
      if (resp.payment_methods){
        this.paymentMethods = resp.payment_methods
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }

  async deleteTokenizedCard(paymentMethodId: number) {
    let userConfirmation = confirm("Are you sure you want to delete this card?");
    if (!userConfirmation){
      return
    }
    try {
      this.progress = true;
      const resp = await this.paymentService.deleteTokenizeCard(paymentMethodId).toPromise();
      console.log(resp);
      if (resp.success){
        this.snackbarService.openSnackBar(resp.success);
        this.getPaymentMethods();
      }
      if (resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }

  async getTransactions() {

    try {
      this.progress = true;
      const resp = await this.paymentService.getTransactionHistory(this.filterData).toPromise();
      console.log("My transactions")
      console.log(resp);
      if (resp.data){
        this.transactions = resp;
      }
      if (resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }


  accountCloseConfirmation(){
    Swal.fire({
      title: 'Are you sure to close this account ?',
      text: 'All data related to this account will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.closeAccount();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async closeAccount() {
    try {
      this.progress = true;
      const resp = await this.userService.closeAccount(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweet.successNotification('Account Closed', resp.success);
        this.logout();
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }


    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }

  async logout() {
    try {
      this.authService.removeAuthCredentials();
      this.router.navigate([ROUTES.login]);

      const resp = await this.authService.logout().toPromise();


    } catch (err) {

    }


  }

  countries: any = countriesList;
  filteredStates: any = [];
  states: any = statesList;

  filterStates(): void {
    let selectedCountry = this.formAddCard.controls['country'].value;
    console.log(selectedCountry);
    if (selectedCountry) {
      this.filteredStates = this.states.filter((x:  any) => x.country_code === this.formAddCard.controls['country'].value)

    }
  }


  showPaymentsFilter(){
    this._bottomSheet.open(PaymentsFilterBSComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }).afterDismissed().subscribe((data: any) => {
      console.log('Filter data');
      this.filterData = data ;
      this.getTransactions()
    })
  }



  // async getUserDetails() {
  //   try {
  //     this.progress = true;
  //     const resp = await this.userService.getDetails(this.authService.getUserID()).toPromise();
  //     console.log('User profile', resp);
  //     if(resp.user){
  //       this.user = resp.user ;
  //       this.formProfile.controls.username.setValue(this.user.username);
  //       this.formProfile.controls.first_name.setValue(this.user.first_name);
  //       this.formProfile.controls.last_name.setValue(this.user.last_name);
  //       this.formProfile.controls.email.setValue(this.user.email);
  //       this.formProfile.controls.phone.setValue(this.user.phone);
  //       // this.onUserLoaded.emit(this.user);
  //
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     this.snackbarService.openSnackBar("Failed to retrieve profile information");
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  //
  // async updateProfile() {
  //
  //   if(! this.formProfile.valid){
  //     this.snackbarService.openSnackBar("All the fields are required");
  //     return;
  //   }
  //
  //   try {
  //     this.progress = true;
  //     const resp = await this.userService.updateProfile(this.authService.getUserID(), this.formProfile.value).toPromise();
  //     console.log(resp);
  //     if(resp.success){
  //       this.snackbarService.openSnackBar(resp.success);
  //     }
  //     if(resp.user){
  //       this.user = resp.user ;
  //     }
  //
  //   } catch (e) {
  //     console.log(e);
  //     this._snackbarService.openSnackBar("Failed to retrieve profile information");
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  //


}
