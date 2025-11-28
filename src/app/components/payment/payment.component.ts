import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../services/plan.service";
import {CommonService} from "../../services/common.service";
import {Step} from "../../models/Step";
import {CountryService} from "../../services/country.service";
import {countriesList, statesList} from "../../core/data/location";
import {HasBillingAddress} from "../../models/Card";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, HasBillingAddress {
  dataProgress:any = false;
  saveProgress:any = false ;
  bank: any = undefined ;
  progress:any = false;
  plan: any = undefined ;

  offlinePaymentEnabled: boolean = true
  selectedPaymentMethod: any
  payment_frequency: number = 1 ;

  steps: Step[] = [

    {name: "Billing"},
    {name: "Payment Method"},
    {name: "Confirmation"}
  ]

  paymentMethods: any = []

  onPaymentMethodSelect(paymentMethod: any){
    this.selectedPaymentMethod = paymentMethod
    if (paymentMethod && paymentMethod !== 'new_card'){
      this.formSubscribe.controls['card_token'].setValue(paymentMethod.token);
    }
  }

  formSettings = this.fb.group({

    auto_renewal : [true]
  });

  formCard = this.fb.group({
    user_id: [this.authService.getUserID()],
    card_number : ['', [Validators.required]] ,
    card_exp: ['', [Validators.required]] ,
    card_cvv: ['', [Validators.required]],
    holder_name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    // zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    allow_tokenization: [''],
    plan_id :  [ '' , [ Validators.required]],
    use_trial: [''],
    auto_renewal: [],
    duration: [ this.payment_frequency ]
  });

  addCardErrors: any = {}


  formPayment = this.fb.group({
    user_id : [this.authService.getUserID()] ,
    bank_name :  ['', [ Validators.required]] ,
    reference_number :  ['', [ Validators.required]] ,
    payment_date :  ['', [ Validators.required]] ,
    plan_id :  [ '' , [ Validators.required]] ,
    currency : ['USD'] ,
    total_payable : [''] ,
    duration : ['1'],
    use_trial: ['']
  });

  formSubscribe = this.fb.group({
    user_id : [this.authService.getUserID()] ,
    plan_id :  [ '' , [ Validators.required]] ,
    card_token :  ['', [Validators.required]] ,
    duration: ['1'],
    use_trial: [''],
    auto_renewal: []
  });

  plans: any = [] ;
  my_plan: any = null;
  free_trial_used: boolean = false

  currentStep: number = 0;
  trialRequested: boolean = false
  hasTrial: boolean = false
  countries = countriesList
  states = statesList
  filteredStates: any = [];
  auto_renewal: boolean = true

  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public paymentService: PaymentService ,
    public sweetAlertService : SweetAlertService ,
    private planService : PlanService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute ,
    private router: Router,
    private common : CommonService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.formCard.get('country')?.setValue('HN');
    this.filterStates();
    this.route.queryParams.subscribe(params  => {
     this.getPlans();
     this.getPlanDetails(params['plan_id'] || '');
     if (params['use_trial']){
       this.trialRequested = true;
     } else {
       this.trialRequested = false;
     }
    })
    this.getBank();
    this.getPaymentMethods();
    // this.getCountries()

  }

  async getPlans() {
    try {
      this.progress = true ;
      const resp = await this.planService.getPlans().toPromise();
      console.log(resp);
      if(resp.plans){
        this.plans = resp.plans ;
      }
      if(resp.my_plan){
        this.my_plan = resp.my_plan ;
      }

      if(resp.free_trial_used){
        this.free_trial_used = resp.free_trial_used ;
        this.hasTrial = false
      } else {
        if (this.trialRequested){
          this.hasTrial = true;
        }
      }


    } catch ($ex) {

    } finally {
      this.progress = false ;
    }

  }


  async getBank() {

    this.dataProgress = true;
    try {

      const resp = await this.paymentService.getOfflineMethod().toPromise();
      console.log(resp);
      if (resp.method && resp.method !== null) {
        this.bank = resp.method ;
      }
    } catch ($ex) {

      console.log($ex);
      this.sweetAlertService.errorNotification(
        'Failed',
        'Something went wrong !',
      );

    } finally {
      this.dataProgress = false;
    }
  }

  async getPlanDetails(planId: any) {

    try {
      this.progress = true;
      const data = await this.planService.getPlanDetails(planId).toPromise();
      console.log(data);
      if (data.plan !== null) {
        this.plan = data.plan;
        this.formPayment.controls.plan_id.setValue(this.plan.id);
        this.formPayment.controls.total_payable.setValue(this.plan.price * this.plan.duration);
        this.formPayment.controls.duration.setValue(this.plan.duration);

        this.formCard.controls.plan_id.setValue(this.plan.id);
        this.formSubscribe.controls.plan_id.setValue(this.plan.id);
      }
    } catch (e){
      this.snackbarService.openSnackBar('Failed to get plan details');
    } finally {
      this.progress = false;
    }

  }

  async saveBankPayment() {

    if( ! this.formPayment.valid){
      this.formPayment.markAllAsTouched();
    } else {

      this.formPayment.controls['duration'].setValue(this.payment_frequency);

      this.formPayment.controls.total_payable.setValue(this.plan.price * this.formPayment.controls.duration.value);
      try {
        this.saveProgress = true;
        const data = await this.paymentService.saveBankPayment(this.formPayment.value).toPromise();
        console.log(data);
        if (data.success) {
          this.sweetAlert.successNotification('Payment Information saved !', data.success);
          this.onPaymentSuccess();
        }
      } catch (e) {
        this.snackbarService.openSnackBar('Failed to submit payment info');
      } finally {
        this.saveProgress = false;
      }
    }

  }

  onPaymentSuccess(){
    setTimeout(() => {
      this.router.navigate(['/business/dashboard'])
    }, 3000)
  }

  async confirmPaymentByCard() {

    if ( ! this.formCard.valid){
      this.formCard.markAllAsTouched();
      return ;
    }
    try {
      if (this.hasTrial){
        this.formCard.controls['use_trial'].setValue('1');
      } else {
        this.formCard.controls['use_trial'].setValue('0');
      }


      // set Auto renewal value
      if (this.auto_renewal){
        this.formCard.controls['auto_renewal'].setValue('1');
      } else {
        this.formCard.controls['auto_renewal'].setValue('0');

      }

      this.formCard.controls['duration'].setValue(this.payment_frequency);

      this.progress = true;
      const resp = await this.planService.subscribe(this.formCard.value).toPromise();
      if(resp.success){
        if (! this.hasTrial) {
          this.sweetAlertService.successNotification("Payment successful", "Subscribed to selected plan successfully")
        } else {
          this.sweetAlertService.successNotification("Enjoy your free trial", "Subscribed to selected plan successfully, your free trial has been started")
        }
        this.getPlans();
        this.currentStep = 2 ;
        this.onPaymentSuccess()
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
      if(resp.errors){
        console.log(resp.errors)
        this.addCardErrors = resp.errors

        if (resp.errors.card_number){
          this.formCard.controls['card_number'].setErrors(resp.errors.card_number)
        }
        if (resp.errors.card_expire){
          this.formCard.controls['card_exp'].setErrors(resp.errors.card_expire)
        }
        // if (resp.errors.expire_year){
        //   this.formCard.controls['card_exp'].setErrors(resp.errors.expire_year)
        // }
        if (resp.errors.card_cvv){
          this.formCard.controls['card_cvv'].setErrors(resp.errors.card_cvv)
        }
        if (resp.errors.card_holder){
          this.formCard.controls['holder_name'].setErrors(resp.errors.card_holder)
        }
        if (resp.errors.billing_address){
          this.formCard.controls['address'].setErrors(resp.errors.billing_address)
        }
        if (resp.errors.billing_city){
          this.formCard.controls['city'].setErrors(resp.errors.billing_city)
        }
        if (resp.errors.billing_phone){
          this.formCard.controls['phone'].setErrors(resp.errors.billing_phone)
        }
        if (resp.errors.billing_state){
          this.formCard.controls['state'].setErrors(resp.errors.billing_state)
        }
        if (resp.errors.billing_country){
          this.formCard.controls['country'].setErrors(resp.errors.billing_country)
        }
      }
    } catch (ex: any){
      console.log(ex)
      this.snackbarService.openSnackBar('Unable to process request');
    } finally {
      this.progress = false
    }
  }


  async confirmPaymentByToken() {
    if ( ! this.formSubscribe.controls['card_token'].value){
      if (!this.hasTrial) {
        this.snackbarService.openSnackBar('Please select a card to pay')
      } else {
        this.snackbarService.openSnackBar('Please select a card to start free trial')
      }
      return ;
    }
    if ( ! this.formSubscribe.controls['plan_id'].value){
      this.snackbarService.openSnackBar('Please select a plan to subscribe')
      return ;
    }

    // set Auto renewal value
    if (this.auto_renewal){
      this.formSubscribe.controls['auto_renewal'].setValue('1');
    } else {
      this.formSubscribe.controls['auto_renewal'].setValue('0');

    }
    this.formCard.controls['duration'].setValue(this.payment_frequency);


    try {
      if (this.hasTrial){
        this.formSubscribe.controls['use_trial'].setValue('1');
      } else {
        this.formSubscribe.controls['use_trial'].setValue('0');
      }
      this.progress = true;

      const resp = await this.planService.subscribe(this.formSubscribe.value).toPromise();
      if(resp.success){
        if (! this.hasTrial) {
          this.sweetAlertService.successNotification("Payment successful", "Subscribed to selected plan successfully")
        } else {
          this.sweetAlertService.successNotification("Enjoy your free trial", "Subscribed to selected plan successfully, your free trial has been started")
        }        this.getPlans();
        this.currentStep = 2 ;
        this.onPaymentSuccess();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
      if (resp.errors){
        console.log(resp.errors);
      }
    } catch (ex: any){
      this.snackbarService.openSnackBar(ex.getMessage());
    } finally {
      this.progress = false
    }
  }


  async getPaymentMethods() {
    try {
      this.progress = true;
      const resp = await this.paymentService.getPaymentMethods().toPromise();
      console.log(resp);
      if (resp.payment_methods){
        this.paymentMethods = resp.payment_methods
        if (this.paymentMethods.length < 1){
          this.onPaymentMethodSelect('new_card')
        }
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
    }
  }

  // async getCountries() {
  //   try {
  //     this.progress = true ;
  //     const resp = await this.countryService.getAll().toPromise();
  //     if(resp.countries){
  //       this.countries = resp.countries ;
  //     }
  //   } catch ($ex) {
  //     console.log($ex);
  //   } finally {
  //     this.progress = false ;
  //   }
  //
  // }


  filterStates() {
    let selectedCountry = this.formCard.controls['country'].value;
    console.log(selectedCountry);
    if (selectedCountry) {
      this.filteredStates = this.states.filter(x => x.country_code === this.formCard.controls['country'].value)

    }
  }
}
