import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ROUTES} from "../../core/routes";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {UserStatisticsComponent} from "../../shared/common/user-statistics/user-statistics.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent extends UserStatisticsComponent implements OnInit {


  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  promotionSaveProgress = false ;

  formPromotionInfo = this.fb.group({
    user_id : this.authService.getUserID() ,
    search_business : [''] ,
    business_id :  ['', [ Validators.required]] ,
    promotion_type :  ['', [ Validators.required]] ,
    promotion_title :  ['', [ Validators.required]] ,
    description :  ['', [ Validators.required]] ,
    price_original :  ['', [ Validators.required]] ,
    price_offered :  ['', [ Validators.required]] ,
    price_discount :  [ '' , [ Validators.required]] ,
    discount_percentage :  [''] ,
    maximum :  ['', [ Validators.required]] ,
    minimum_product_purchase :  [''] ,
    start_at :  ['', [ Validators.required]] ,
    ends_at :  ['', [ Validators.required]] ,
    about :  ['', [ Validators.required]] ,
    terms :  ['', [ Validators.required]] ,
    restrictions :  ['', [ Validators.required]] ,
    code :  ['', [ Validators.required]] ,
    status :  ['', [ Validators.required]] ,
  });
  search: any;

  constructor(

    private fb : UntypedFormBuilder ,
    private _listingService : ListingService ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    public sweetAlertService : SweetAlertService,
    public userService: UserService
  ) {
    super(userService, authService);

  }

  ngOnInit(): void {
    this.getMyBusinessListings();
    this.getStatistics();
  }

  calculateDiscountAmount(){
    if( this.formPromotionInfo.controls.price_original.value > this.formPromotionInfo.controls.price_offered.value)
    this.formPromotionInfo.controls.price_discount.setValue(this.formPromotionInfo.controls.price_original.value - this.formPromotionInfo.controls.price_offered.value) ;
  }

  submitForm(){

    if(! this.formPromotionInfo.valid){
      this.formPromotionInfo.markAllAsTouched();

    } else {
      console.log(this.formPromotionInfo.value);

      this.formPromotionInfo.controls.business_id.setValue(this.formPromotionInfo.controls.business_id.value.id);

      this.savePromotion(this.formPromotionInfo.value);

    }

  }


  async savePromotion(data:any) {

    try {
      this.promotionSaveProgress = true ;
      const resp = await this._listingService.savePromotion(data).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlertService.successNotification('Promotion created successfully !' , resp.success);
        setTimeout(() =>{
          window.location.reload();
        } , 2000);
      }
      if(resp.error){
        this.sweetAlertService.errorNotification('Promotion creation failed' , resp.error);

      }

    } catch ($ex) {
      console.log($ex);
      this.sweetAlertService.errorNotification('Promotion creation failed' , 'Something went wrong !');


    } finally {
      this.promotionSaveProgress = false ;
    }

  }


  async getMyBusinessListings() {

    try {

      const resp = await this._listingService.getListing('business',this.authService.getUserID(),'').toPromise();
      console.log(resp);
      if(resp.data){

        this.businesses = resp.data ;
        console.log(this.businesses);
      }

    } catch ($ex) {

    }

  }


}
