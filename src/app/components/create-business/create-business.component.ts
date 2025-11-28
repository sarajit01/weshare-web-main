import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from '@angular/material/chips';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {FileUploadService} from "../../services/file-upload.service";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {UserStatisticsComponent} from "../../shared/common/user-statistics/user-statistics.component";
import {UserService} from "../../services/user.service";
import {BusinessDetailComponent} from "../../business/business-detail/business-detail.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
export interface Feature {
  icon : string ;
  name: string;
}
export interface WorkingHour {
  day : string ,
  starts_at : string ,
  ends_at : string ,
  open_24_h : number
}
export interface SocialMediaLink {
  name : string ;
  icon : string ;
  link : string
}

export interface Category {
  name : string ;
  icon : string ;
  id : string,
  custom_attributes: any[]
}



@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent extends UserStatisticsComponent implements OnInit {

  @ViewChild('ck-toolbar') d1: ElementRef | undefined;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags : string[] = [] ;
  categories : string[] = [] ;
  categoryOptions : Category[] | undefined ;
  working_hours : WorkingHour[] = [] ;
  social_media_links : SocialMediaLink[] = [] ;
  features : Feature[] = [] ;
  images : string[] = [] ;
  logo : string | undefined ;
  custom_attributes: any[] = [] ;

  formGeneralInfo = this.fb.group({
    country : ['' , Validators.required] ,
    city : ['' , [ Validators.required]] ,
    business_name_prefix : ['' , [ Validators.required]] ,
    business_name : ['', [ Validators.required]] ,
    business_type : ['', [ Validators.required]] ,
    slogan : ['', [ Validators.required]] ,
    address : ['', [ Validators.required]] ,
    latitude: [''],
    longitude: [''] ,
    description : ['', [ Validators.required]] ,
    summary : ['', [ Validators.required]] ,
    tags : [this.tags] ,
    business_email : ['', [ Validators.required]] ,
    business_phone : ['', [ Validators.required]] ,
    cell_phone : ['', [ Validators.required]] ,
    website : ['', [ Validators.required]] ,
  });

  formCategoryInfo = this.fb.group({
    categories : [ this.categories , Validators.required ] ,
    main_category_id : ['', [ Validators.required]] ,
  });

  formFeatureInfo = this.fb.group({
    features : [ this.features ] ,
  });

  formPriceInfo = this.fb.group({
    price_level : ['', [ Validators.required]] ,
    price_from : ['', [ Validators.required]] ,
    price_to : ['', [ Validators.required]] ,

  });

  formWorkingHourInfo = this.fb.group({
    working_hour_day : [''] ,
    working_hour_starts_at : [''] ,
    working_hour_ends_at : [''] ,
    working_hour_open_24_h : [''] ,
    working_hours : [ this.working_hours ] ,
  });

  formSocialMediaInfo = this.fb.group({
    social_media_links : [ this.social_media_links ] ,

    social_media_name : [''] ,
    social_media_link : [''] ,
  });

  formFAQ = this.fb.group({

  });


  formContactInfo = this.fb.group({
    contact_email : ['', [ Validators.required]] ,
  });

  public fileProgress:  boolean | undefined;
  public saveBusinessProgress:  boolean | undefined;



  addWorkingHour(): void {


      if (!this.formWorkingHourInfo.controls.working_hour_starts_at.value) {
        this.snackbarService.openSnackBar('Select starting time to add ');
        return;
      }
      if (!this.formWorkingHourInfo.controls.working_hour_ends_at.value) {
        this.snackbarService.openSnackBar('Select end time to add ');
        return;
      }

      this.working_hours.push({
        day: this.formWorkingHourInfo.controls.working_hour_day.value,
        ends_at: this.formWorkingHourInfo.controls.working_hour_ends_at.value,
        open_24_h: this.formWorkingHourInfo.controls.working_hour_open_24_h.value,
        starts_at: this.formWorkingHourInfo.controls.working_hour_starts_at.value
      });



  }

  ngAfterViewInit() {
    // @ts-ignore
   // this.d1.nativeElement.insertAdjacentHTML('beforeend', '<button class="ck ck-button ck-off" type="button" tabindex="-1" aria-labelledby="ck-editor__aria-label_ed628a44b822648a80867986762f3f77e" aria-pressed="false"><svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"></path></svg><span class="ck ck-tooltip ck-tooltip_s"><span class="ck ck-tooltip__text">Bold (Ctrl+B)</span></span><span class="ck ck-button__label" id="ck-editor__aria-label_ed628a44b822648a80867986762f3f77e">Bold</span></button>');
  }

  addSocialMedia(): void {


      this.social_media_links.push({
        icon: '' ,
        link: this.formSocialMediaInfo.controls['social_media_link'].value ,
        name: this.formSocialMediaInfo.controls['social_media_name'].value
      });


  }


  addTags(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addCategories(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  removeTag(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  removeCategory(value: string): void {
    const index = this.categories.indexOf(value);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  removeWorkingHour(workingHour: WorkingHour): void {
    const index = this.working_hours.indexOf(workingHour);

    if (index >= 0) {
      this.working_hours.splice(index, 1);
    }
  }

  removeSocialMedia(social_media: SocialMediaLink): void {
    const index = this.social_media_links.indexOf(social_media);

    if (index >= 0) {
      this.social_media_links.splice(index, 1);
    }
  }

  public Editor = ClassicEditor;
  constructor(private fb : UntypedFormBuilder , private listingService : ListingService , private uploadService : FileUploadService

  , private categoryService: CategoryService , private snackbarService : SnackbarService , public authService : AuthService

              , private sweet : SweetAlertService,
              public userService: UserService,
              public sanitizer: DomSanitizer

  ) {

    super(userService, authService);

  }



  days = [

    { day : 'Monday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Tuesday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Wednesday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Thursday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Friday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Saturday' , time : '9:00 AM - 8 PM'} ,
    { day : 'Sunday' , time : '9:00 AM - 8 PM'} ,
  ];


  url: string = "http://localhost:4200/business-details/16";
  urlSafe: SafeResourceUrl | undefined;




  ngOnInit(): void {

    this.getCategories();
    this.getStatistics();

    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);


  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }


  currentStep = 1 ;



  async nextStep(formGroup: UntypedFormGroup) {

    if (! formGroup.valid) {
      console.log(formGroup.value);

      formGroup.markAllAsTouched();
    } else {
      // console.log( this.formGeneralInfo.value);
      this.goNextTab();
    }

    return ;

    this.goNextTab()
    return;

    if (this.currentStep === 1) {

      console.log('validation ' + this.formGeneralInfo.valid);


    } else if (this.currentStep === 2) {

      if (!this.formCategoryInfo.valid) {
        this.validateAllFormFields(this.formGeneralInfo);
      } else {
        this.goNextTab();
      }

    } else if (this.currentStep === 3) {

      if (!this.formFeatureInfo.valid) {
        this.validateAllFormFields(this.formFeatureInfo);
      } else {
        this.goNextTab();
      }


    } else if (this.currentStep === 4) {

      if (!this.formPriceInfo.valid) {
        this.validateAllFormFields(this.formPriceInfo);
      } else {
        this.goNextTab();
      }


    } else if (this.currentStep === 5) {

      if (this.working_hours.length < 1) {
        this.snackbarService.openSnackBar('Please add at least one working day !');
      } else {
        this.goNextTab();
      }


    } else if (this.currentStep === 6) {

      if (!this.formSocialMediaInfo.valid) {
        this.validateAllFormFields(this.formSocialMediaInfo);
      } else {

        this.goNextTab();
      }


    } else if (this.currentStep === 7) {

      this.goNextTab();

    } else if (this.currentStep === 9) {

      if (!this.formContactInfo.valid) {
        console.log(this.formContactInfo.value);

        this.formContactInfo.markAllAsTouched();
      } else {
        // console.log( this.formGeneralInfo.value);

         this.createListing();

      }
    }


  }

  goNextTab(){
    console.log('next');
    if (this.currentStep < 9) {
      this.currentStep++;

      window.scrollTo(200, 200);

    }
  }



  stepBack(){
    if(this.currentStep > 1){
      this.currentStep -- ;
      window.scrollTo(200, 200);


    }

  }
  options: string[] = ['Not to say','$ - Inexpensive' , '$$ - Moderate', '$$$ - Pricey' , '$$$$ - Ultra High'];


  files: File[] = [];
  logoFiles : File[] = [] ;

  onSelect(event: { addedFiles: any; } , scope:string) {
    console.log(event);
      this.files.push(...event.addedFiles);

  }

  onSelectLogo(event: { addedFiles: any; } , scope:string) {
    console.log(event);
    if (this.logoFiles.length === 1) {
      this.snackbarService.openSnackBar('You can upload only one business logo !');
      return;
    } else {
      this.logoFiles.push(...event.addedFiles);
    }

  }

  onRemove(event: File , scope: string) {
    console.log(event);
    if(scope === 'images'){
      this.files.splice(this.files.indexOf(event), 1);
    } else {
      this.logoFiles.splice(this.logoFiles.indexOf(event), 1);
    }
  }

  async onUpload() {
    if (!this.files[0]) {
      alert('Please upload at least one image !');
      return ;
    }
    if (!this.logoFiles[0]) {
      alert('Please upload logo !');
      return ;
    }

    try {
      this.fileProgress = true ;
       for (let i= 0 ; i<this.files.length ; i++){
         let data = new FormData();
         data.append('file' , this.files[i]) ;
         data.append('upload_preset' , 'gef5jpdf');
         let resp = await this.uploadService.upload(data).toPromise();
         console.log(resp);
         if(resp.secure_url){
           this.images.push(resp.secure_url);
         }

       }


        let data = new FormData();
        data.append('file' , this.logoFiles[0]) ;
        data.append('upload_preset' , 'gef5jpdf');
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if(resp.secure_url){
          this.logo = resp.secure_url ;
        }

        this.fileProgress = false ;

        this.currentStep = this.currentStep + 1 ;
        this.goNextTab();
    } catch ($exception) {
        console.log($exception)
    }

 //   return false ;


  }

  async getCategories() {

    const resp = await this.categoryService.getCategories('').toPromise();

    console.log(resp);

    this.categoryOptions = resp ;


  }

  setDefaultLatLang(){
    this.formGeneralInfo.controls.latitude.setValue(40) ;
    this.formGeneralInfo.controls.longitude.setValue(74);
  }


  setCustomAttribute(attribute: any){
    let cAttrIndex = this.custom_attributes.findIndex(item => item.id === attribute.id);
    if(cAttrIndex === -1){
      this.custom_attributes.push(attribute);
    } else {
      this.custom_attributes.splice(cAttrIndex, 1);
    }
    console.log("Custom attr list from main", this.custom_attributes);
  }

  async createListing() {

   // console.log(this.form.value);

    if(! this.formGeneralInfo.controls.latitude.value || ! this.formGeneralInfo.controls.longitude.value){
      this.setDefaultLatLang();
    }

    this.saveBusinessProgress = true ;

    let data = {
      user_id : this.authService.getUserID() ,
      auth_token : this.authService.getAuthToken() ,
      country : this.formGeneralInfo.controls.country.value ,
      city : this.formGeneralInfo.controls.city.value ,
      business_name_prefix : this.formGeneralInfo.controls.business_name_prefix.value ,
      business_name : this.formGeneralInfo.controls.business_name.value  ,
      business_type : this.formGeneralInfo.controls.business_type.value  ,
      slogan : this.formGeneralInfo.controls.slogan.value  ,
      address : this.formGeneralInfo.controls.address.value  ,
      description : this.formGeneralInfo.controls.description.value  ,
      summary : this.formGeneralInfo.controls.summary.value  ,
      tags : this.tags  ,
      business_email : this.formGeneralInfo.controls.business_email.value  ,
      business_phone :this.formGeneralInfo.controls.business_phone.value  ,
      cell_phone : this.formGeneralInfo.controls.cell_phone.value  ,
      website : this.formGeneralInfo.controls.website.value  ,
      categories : this.formCategoryInfo.controls.categories.value ,
      main_category_id : this.formCategoryInfo.controls.main_category_id.value,
      features : [] ,
      price_level : this.formPriceInfo.controls.price_level.value ,
      price_from : this.formPriceInfo.controls.price_from.value ,
      price_to : this.formPriceInfo.controls.price_to.value ,
      contact_email : this.formContactInfo.controls.contact_email.value ,
      working_hours : this.working_hours ,
      social_media : this.social_media_links ,
      images : this.images ,
      logo : this.logo,
      latitude: this.formGeneralInfo.controls.latitude.value ,
      longitude: this.formGeneralInfo.controls.longitude.value,
      custom_attributes: this.custom_attributes
    }

    console.log(data);

    try {
      const resp = await this.listingService.saveBusiness(data).toPromise();


      console.log(resp);

      if (resp.success) {
        this.snackbarService.openSnackBar(resp.success);
        this.sweet.successNotification('Business Created Successfully !' , resp.success);

        setTimeout(() =>{
          window.location.reload();
        } , 2000);

      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($exception: any){
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.saveBusinessProgress = false;

    }


  }

  // toggleMainSidebar() {
  //   let sidebar = document.getElementById("section-collapse-sidebar");
  //   // @ts-ignore
  //   sidebar.classList.toggle("d-none");
  // }
  @ViewChild('iframe', {static: false}) iframe: ElementRef | undefined;
  doc: any
  compRef: ComponentRef<BusinessDetailComponent> | undefined;
  business: any;

  setBusinessDataForSimulator(business: any){
    this.business = business;
    console.log(this.business);
  }



}
