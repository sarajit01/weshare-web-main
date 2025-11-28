import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ROUTES} from "../../../core/routes";
import {ListingService} from "../../../services/listing.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {AuthService} from "../../../services/auth.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {environment} from "../../../../environments/environment";
import {Step} from "../../../models/Step";
import {Router} from "@angular/router";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PromotionFormComponent),
      multi: true,
    }
  ]
})
export class PromotionFormComponent implements OnInit {

  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  promotionSaveProgress = false ;
  @Input() promotion: any = null;
  @Input() userId: any = undefined;
  @Input() isAdmin: any = false;
  steps: Step[] = [{name: "Pricing"},{name: "Details"},{name: "Timeline"},{name: "Gallery"}] ;
  activeStep: number = 0 ;
  images : string[] = [] ;
  files: File[] = [];
  private validated:boolean = true



  formPromotionInfo = this.fb.group({
    promotion_id: '' ,
    user_id: [''],
    search_business: [''],
    business: [],
    business_id: ['', [Validators.required]],
    promotion_type: ['', [Validators.required]],
    promotion_title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price_original: ['', [Validators.required]],
    price_offered: ['', [Validators.required]],
    price_discount: ['', [Validators.required]],
    discount_percentage: [''],
    maximum: [''],
    minimum_product_purchase: ['' , [Validators.required]],
    start_at: ['', [Validators.required]],
    ends_at: [''],
    about: ['', [Validators.required]],
    terms: ['', [Validators.required]],
    restrictions: ['', [Validators.required]],
    code: ['', [Validators.required]],
    status: [''],
    images: [] ,
  });
  search: any;
  fileProgress: boolean = false;
  heading: string = "General";

  constructor(
    private fb: UntypedFormBuilder,
    private _listingService: ListingService,
    private snackbarService: SnackbarService,
    public authService: AuthService,
    public sweetAlertService: SweetAlertService,
    public uploadService: FileUploadService,
    private router: Router
  ) {


  }

   ngOnInit(): void {
    this.getMyBusinessListings();
    if (this.promotion) {
      this.activeStep = -1 ;
      this.formPromotionInfo.controls.promotion_id.setValue(this.promotion.id);
      this.formPromotionInfo.controls.user_id.setValue(this.promotion.user_id);
      if(this.promotion.business){
        this.formPromotionInfo.controls.business.setValue(this.promotion.business);
      }
      this.formPromotionInfo.controls.business_id.setValue(this.promotion.business_id);
      this.formPromotionInfo.controls.promotion_type.setValue(this.promotion.promotion_type);
      this.formPromotionInfo.controls.promotion_title.setValue(this.promotion.promotion_title);
      this.formPromotionInfo.controls.description.setValue(this.promotion.description);
      this.formPromotionInfo.controls.price_original.setValue(this.promotion.price_original);
      this.formPromotionInfo.controls.price_offered.setValue(this.promotion.price_offered);
      this.formPromotionInfo.controls.price_discount.setValue(this.promotion.price_discount);
      this.formPromotionInfo.controls.maximum.setValue(this.promotion.maximum);
      this.formPromotionInfo.controls.minimum_product_purchase.setValue(this.promotion.minimum_product_purchase);
      this.formPromotionInfo.controls.start_at.setValue(this.promotion.start_at);
      this.formPromotionInfo.controls.ends_at.setValue(this.promotion.ends_at);
      this.formPromotionInfo.controls.about.setValue(this.promotion.about);
      this.formPromotionInfo.controls.terms.setValue(this.promotion.terms);
      this.formPromotionInfo.controls.restrictions.setValue(this.promotion.restrictions);
      this.formPromotionInfo.controls.code.setValue(this.promotion.code);
      this.formPromotionInfo.controls.status.setValue(this.promotion.status);
      this.calculateDiscountAmount();

      if(this.promotion.gallery){
        this.promotion.gallery.forEach((img: any) => {
          this.images.push(img.img);
        });
      }





    } else {
      this.formPromotionInfo.controls.user_id.setValue(this.authService.getUserID());
    }
  }

  calculateDiscountAmount(){
    if( this.formPromotionInfo.controls.price_original.value > this.formPromotionInfo.controls.price_offered.value)
      this.formPromotionInfo.controls.price_discount.setValue(this.formPromotionInfo.controls.price_original.value - this.formPromotionInfo.controls.price_offered.value) ;

      let discount_percent =  ( this.formPromotionInfo.controls.price_discount.value / this.formPromotionInfo.controls.price_original.value ) * 100 ;
      this.formPromotionInfo.controls.discount_percentage.setValue(discount_percent);

  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);

  }

  validateGeneral(){
    this.clearValidation()
    if(!this.formPromotionInfo.controls.business.value){
      this.snackbarService.openSnackBar("Please select a business");
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.promotion_title.valid){
      this.formPromotionInfo.controls.promotion_title.markAsTouched();
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.promotion_type.valid){
      this.snackbarService.openSnackBar("Please select promotion type");
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.price_original.valid){
      this.formPromotionInfo.controls.price_original.markAsTouched()
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.price_offered.valid){
      this.formPromotionInfo.controls.price_offered.markAsTouched()
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.minimum_product_purchase.valid){
      this.formPromotionInfo.controls.minimum_product_purchase.markAsTouched()
      this.validated = false
    }
    //discount_percentage
    if(this.formPromotionInfo.controls.promotion_type.value === "Discount"){
      if(!this.formPromotionInfo.controls.discount_percentage.value){
        this.formPromotionInfo.controls.discount_percentage.markAsTouched()
        this.validated = false
      }
    }
  }

  validateDetails(){
    this.clearValidation();
    if(!this.formPromotionInfo.controls.description.valid){
      this.formPromotionInfo.controls.description.markAsTouched();
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.about.valid){
      this.formPromotionInfo.controls.about.markAsTouched();
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.terms.valid){
      this.formPromotionInfo.controls.terms.markAsTouched();
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.restrictions.valid){
      this.formPromotionInfo.controls.restrictions.markAsTouched();
      this.validated = false
    }
  }

  validateTimeline(){
    this.clearValidation();
    if(!this.formPromotionInfo.controls.start_at.value){
      this.formPromotionInfo.controls.start_at.markAsTouched();
      this.validated = false
    }
    if(!this.formPromotionInfo.controls.code.valid){
      this.formPromotionInfo.controls.code.markAsTouched();
      this.validated = false
    }
  }

  clearValidation(){
    this.validated = true
  }
  nextStep(){
    if (this.activeStep < this.steps.length){
      if(this.activeStep === 0){
        this.validateGeneral()
      }

      if (this.activeStep === 1) {
        this.validateDetails();
      }

      if (this.activeStep === 2) {
        this.validateTimeline()
      }

      if(this.validated) {
        if(this.activeStep < 3) {
          this.activeStep = this.activeStep + 1
        } else {
          this.submitForm();
        }
      }
    }
  }

  prevStep(){
    if (this.activeStep > 0){
      this.activeStep = this.activeStep - 1
    }
  }

  deleteImage(img: string){
    this.images.splice(this.images.indexOf(img), 1);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }

  async onUpload() {
    if (!this.files[0]) {
      if(this.images.length < 1) {
        alert('Please upload at least one image !');
        return;
      }
    }

    try {
      this.fileProgress = true ;
      for (let i= 0 ; i<this.files.length ; i++){
        let data = new FormData();
        data.append('file' , this.files[i]) ;
        data.append('upload_preset' , environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if(resp.secure_url){
          this.images.push(resp.secure_url);
        }

      }
    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    } finally {
      this.fileProgress = false ;
    }

    //   return false ;


  }
  async submitForm() {
    if(this.formPromotionInfo.controls.business.value){
      this.formPromotionInfo.controls.business_id.setValue(this.formPromotionInfo.controls.business.value.id);

    }

    if(!this.formPromotionInfo.controls.business_id.value){
      this.snackbarService.openSnackBar("Business ID is missing from your request");
      return;
    }

    console.log(this.formPromotionInfo.value);


    if (!this.formPromotionInfo.valid) {
      console.log(this.formPromotionInfo.errors);

      this.formPromotionInfo.markAllAsTouched();
    } else {
      console.log(this.formPromotionInfo.value);





      if(this.files[0]){
        await this.onUpload();
      }

      if(this.images.length){
        this.formPromotionInfo.controls.images.setValue(this.images);
      }

      await this.savePromotion(this.formPromotionInfo.value);

    }

  }

  async savePromotion(data:any) {

    try {
      this.promotionSaveProgress = true ;
      const resp = await this._listingService.savePromotion(data).toPromise();
      console.log(resp);
      if(resp.success){

        this.sweetAlertService.successNotification('Promotion saved successfully' , resp.success);
        setTimeout(() =>{
          if (resp.promotion && resp.promotion.id){

            if(!this.promotion) {
              this.router.navigate(['/business/edit-promotion/' + resp.promotion.id])
            } else {
              this.promotion = resp.promotion ;
              this.goStep(-1);
            }
          } else {

            // window.location.reload();
          }
        } , 2000);
      }
      if(resp.error){
        this.sweetAlertService.errorNotification('Promotion failed to save' , resp.error);

      }

    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification('Promotion save failed' , 'Something went wrong !');


    } finally {
      this.promotionSaveProgress = false ;
    }

  }

  async getMyBusinessListings() {

    let userId ;
    if(this.authService.isAdmin() && this.userId){
      userId = this.userId ;
    } else  {
      userId = this.authService.getUserID();
    }

    try {
      const resp = await this._listingService.getListing('business', userId,'', 'approved').toPromise();
      console.log(resp);
      if(resp.data){

        this.businesses = resp.data ;
        console.log(this.businesses);
        if(this.promotion){
          this.businesses.forEach((data: any) => {
            if (data.id === this.promotion.business_id) {
              this.formPromotionInfo.controls.business.setValue(data);
            }
          });
        }

      }

    } catch ($ex) {

    }

  }


  goStep(number: number) {
    this.activeStep = number
    if(this.activeStep == 0){
      this.heading = "General Info"
    }
    if(this.activeStep == 1){
      this.heading = "Description"
    }
    if(this.activeStep == 2){
      this.heading = "Timeline & Coupon Code"
    }
    if(this.activeStep == 3){
      this.heading = "Gallery"
    }
  }

  save() {
    if (this.activeStep < this.steps.length) {
      if (this.activeStep === 0) {
        this.validateGeneral()
      }

      if (this.activeStep === 1) {
        this.validateDetails();
      }

      if (this.activeStep === 2) {
        this.validateTimeline()
      }

      if (this.validated) {
        this.submitForm();
      }
    }
  }
}
