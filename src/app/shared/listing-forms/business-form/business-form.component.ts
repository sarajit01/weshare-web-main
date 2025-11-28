import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ListingService} from "../../../services/listing.service";
import {AuthService} from "../../../services/auth.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FileUploadService} from "../../../services/file-upload.service";
import {CategoryService} from "../../../services/category.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Category,
  Feature,
  SocialMediaLink,
  WorkingHour
} from "../../../components/create-business/create-business.component";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {CountryService} from "../../../services/country.service";
import {environment} from "../../../../environments/environment";
import {Accordian, Step} from "../../../models/Step";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialMedia} from "../../../models/Social";
import {DeviceService} from "../../../services/device.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {
  BusinessCreationCourageBottomSheetComponent
} from "../business-creation-courage-bottom-sheet/business-creation-courage-bottom-sheet.component";
// @ts-ignore
@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'] ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessFormComponent),
      multi: true,
    }
  ]
})
export class BusinessFormComponent implements ControlValueAccessor{


  @ViewChild('summary') inputTextArea: ElementRef | undefined;
  progress: boolean = false;
  countries: any = [];
  selectedCountry: any = null ;
  steps: Step[] = [{name: "General"},{name: "Details"},{name: "Category"},{name: "Logo"},{name: "Gallery"}] ;
  accordians: Accordian[] = [
    {name: "General Info", step: 0, visible: true},
    {name: "Description", step: 1, visible: true},
    {name: "Categories", step: 2, visible: true},
    {name: "Services", step: 5, visible: true},
    {name: "Working Hours", step: 6, visible: true},
    {name: "Custom Features", step: 7, visible: true},
    {name: "Pricing", step: 8, visible: true},
    {name: "FAQ", step: 9, visible: true},
    {name: "Contact Information", step: 10, visible: true},
    {name: "Social Media Links", step: 11, visible: true},
    {name: "Business Logo", step: 3, visible: true},
    {name: "Gallery", step: 4, visible: true},
    {name: "Add Service", step: 12, visible: false},
    {name: "Add FAQ", step: 13, visible: false},
    {name: "Add Working Hour", step: 14, visible: false},

  ];

  socialMedias: SocialMedia[] = [
    {name: "facebook", link: ""},
    {name: "twitter", link: ""},
    {name: "youtube", link: ""},
    {name: "instagram", link: ""},
    {name: "google", link: ""},
    {name: "whatsapp", link: ""}
  ]

  activeStep: number = 0 ;
  private validated:boolean = true
  heading: string = "General";

  ngAfterViewInit() {

  }

  @Input() business:any ;
  @Input() scope: string | undefined;
  @Input() isAdmin: boolean = false ;
  @Output() businessData = new EventEmitter();
  parent_id: any = '' ;
  cat_progress: any= false;
  cat: any = null;
  catForm = this.fb.group({
    search : ['']
  });
  faqEditable: any = null;


  constructor(
    private fb : UntypedFormBuilder ,
    private listingService : ListingService ,
    private uploadService : FileUploadService,
    private categoryService: CategoryService ,
    public snackbarService : SnackbarService ,
    public authService : AuthService,
    private sweet : SweetAlertService,
    private _countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
    private device: DeviceService,
    private bottomSheet: MatBottomSheet

  ) { }

  onChange: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.business = obj;
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags : string[] = [] ;
  categories :any = [] ;
  services : any = [] ;
  categoryOptions : any = [];
  subCategoryOptions : any = [] ;
  selectedCategories: any = [] ;
  working_hours : WorkingHour[] = [] ;
  social_media_links : SocialMedia[] = [] ;
  features : Feature[] = [] ;
  images : string[] = [] ;
  logo : string | undefined ;
  service_deletable : any = [] ;
  faq_deletable : any = [] ;
  workingHourEditable: any;

  serviceEditable:any = null;
  isCategorySelectionComplete = false ;
  categoryLoading = false ;
  faqs: any = [] ;
  custom_attributes: any[] = [] ;

  addWorkingHour(): boolean {

    if (!this.formWorkingHourInfo.controls.working_hour_day.value) {
      this.snackbarService.openSnackBar('Select business day to add ');
      return false
    }
    if (!this.formWorkingHourInfo.controls.working_hour_starts_at.value) {
      this.snackbarService.openSnackBar('Select starting time to add ');
      return false
    }
    if (!this.formWorkingHourInfo.controls.working_hour_ends_at.value) {
      this.snackbarService.openSnackBar('Select end time to add ');
      return false
    }

    this.working_hours.push({
      day: this.formWorkingHourInfo.controls.working_hour_day.value,
      ends_at: this.formWorkingHourInfo.controls.working_hour_ends_at.value,
      open_24_h: this.formWorkingHourInfo.controls.working_hour_open_24_h.value,
      starts_at: this.formWorkingHourInfo.controls.working_hour_starts_at.value
    });

    return true


  }

  updateWorkingHour(){
    if (!this.workingHourEditable.day) {
      this.snackbarService.openSnackBar('Please Select day');
      return;
    }
    if (!this.workingHourEditable.working_hour_starts_at) {
      this.snackbarService.openSnackBar('Select starting time to save ');
      return;
    }
    if (!this.workingHourEditable.working_hour_ends_at) {
      this.snackbarService.openSnackBar('Select end time to save');
      return;
    }

    this.workingHourEditable = null ;

  }

  addSocialMedia(): void {
    this.social_media_links.push({
      link: this.formSocialMediaInfo.controls['social_media_link'].value ,
      name: this.formSocialMediaInfo.controls['social_media_name'].value
    });
  }

  addService(): boolean {

   if(! this.formServiceInfo.valid ) {
     this.formServiceInfo.markAllAsTouched();
     return false;
   }

    this.services.push({
        service_name: this.formServiceInfo.controls.service_name.value ,
        service_description: this.formServiceInfo.controls.service_description.value ,
        price: this.formServiceInfo.controls.price.value ,
        booking_enabled : this.formServiceInfo.controls.booking_enabled.value
    });

    this.formServiceInfo.reset();
    return true
  }

  addFaq(): boolean{
    if(! this.formFAQ.valid ) {
      this.formFAQ.markAllAsTouched();
      return false;
    }

    this.faqs.push({
      question: this.formFAQ.controls.question.value ,
      answer: this.formFAQ.controls.answer.value ,
    });

    this.formFAQ.markAsUntouched();
    this.formFAQ.reset();
    return true
  }

  editService(service: any){
    this.serviceEditable =   this.services.indexOf(service);
    console.log('edit '+this.serviceEditable);
    this.formServiceInfo.controls.id.setValue(service.id);
    this.formServiceInfo.controls.service_name.setValue(service.service_name);
    this.formServiceInfo.controls.service_description.setValue(service.service_description);
    this.formServiceInfo.controls.price.setValue(service.price);
    this.formServiceInfo.controls.booking_enabled.setValue(service.booking_enabled);
  }

  editFaq(faq: any){
    this.faqEditable = this.faqs.indexOf(faq);
    this.formFAQ.controls.id.setValue(faq.id);
    this.formFAQ.controls.question.setValue(faq.question);
    this.formFAQ.controls.answer.setValue(faq.answer);
  }

  closeServiceEditor(){
    this.serviceEditable = null ;
    this.formServiceInfo.reset();
  }

  closeFaqEditor(){
    this.faqEditable = null ;
    this.formFAQ.reset();
  }

  updateService(){
    try {
      if(this.serviceEditable !== undefined){
        // @ts-ignore
        let serviceEditable = this.services[this.serviceEditable];

        serviceEditable.service_name = this.formServiceInfo.controls.service_name.value ;
        serviceEditable.service_description = this.formServiceInfo.controls.service_description.value ;
        serviceEditable.price = this.formServiceInfo.controls.price.value ;
        serviceEditable.booking_enabled = this.formServiceInfo.controls.booking_enabled.value ;

        this.closeServiceEditor();

      }

    } catch ($ex){

    }


  }

  updateFAQ(){
    try {
      if(this.faqEditable !== undefined){
        // @ts-ignore
        let faqEditable = this.faqs[this.faqEditable];
        faqEditable.question = this.formFAQ.controls.question.value ;
        faqEditable.answer = this.formFAQ.controls.answer.value ;
        this.closeFaqEditor();
      }
    } catch ($ex){
    }
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

  removeService(service: any){
      const index = this.services.indexOf(service);
      if (index >= 0) {
      this.services.splice(index, 1);
      this.service_deletable.push(service.id);
      }
  }
  removeFAQ(faq: any){
    const index = this.faqs.indexOf(faq);
    if (index >= 0) {
      this.faqs.splice(index, 1);
      this.faq_deletable.push(faq.id);
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

  editWorkingHour(workingHour: WorkingHour): void {
    this.workingHourEditable = workingHour
  }



  removeSocialMedia(social_media: SocialMedia): void {
    const index = this.socialMedias.indexOf(social_media);

    if (index >= 0) {
      this.socialMedias.splice(index, 1);
    }
  }

  public Editor = ClassicEditor;



  days = [

    { day : 'Domingo' , time : '9:00 AM - 8 PM'} ,
    { day : 'Lunes' , time : '9:00 AM - 8 PM'} ,
    { day : 'Martes' , time : '9:00 AM - 8 PM'} ,
    { day : 'Miércoles' , time : '9:00 AM - 8 PM'} ,
    { day : 'Jueves' , time : '9:00 AM - 8 PM'} ,
    { day : 'Viernes' , time : '9:00 AM - 8 PM'} ,
    { day : 'Sabado' , time : '9:00 AM - 8 PM'} ,
  ];


  formGeneralInfo = this.fb.group({
    country : ['' , Validators.required] ,
    city : ['' , [ Validators.required]] ,
    business_name_prefix : [''] ,
    business_name : ['', [ Validators.required]] ,
    business_type : ['', [ Validators.required]] ,
    slogan : ['', [ Validators.required]] ,
    address : [''] ,
    description : [''] ,
    summary : [''] ,
    tags : [this.tags] ,
    business_email : [''] ,
    business_phone : [''] ,
    cell_phone : [''] ,
    website : [''] ,
    latitude: [''],
    longitude: [''] ,
  });

  formDetails = this.fb.group({
    description : [ '', [ Validators.required]] ,
    summary : ['', [ Validators.required]] ,
    tags : [this.tags] ,
  });


  formCategoryInfo = this.fb.group({
    categories : [ this.categories ] ,
    main_category_id : [''] ,
    main_search : [''] ,
    sub_search : [''] ,
  });

  formFeatureInfo = this.fb.group({
    features : [ this.features ] ,
  });

  formPriceInfo = this.fb.group({
    price_level : ['', [ Validators.required]] ,
    price_from : ['', [ Validators.required]] ,
    price_to : ['', [ Validators.required]] ,
  });

  formFAQ = this.fb.group({
    id: '',
    question : ['', [ Validators.required]] ,
    answer : ['', [ Validators.required]] ,
  });

  formServiceInfo = this.fb.group({
    id : [''] ,
    service_name : ['' , [ Validators.required , Validators.maxLength(80)]] ,
    service_description : ['' , [ Validators.required , Validators.minLength(20) , Validators.maxLength(2500) ]] ,
    price : [''] ,
    booking_enabled : ['']
  });
  formWorkingHourInfo = this.fb.group({
    working_hour_day : ['' , [Validators.required]] ,
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



  formContactInfo = this.fb.group({
    contact_email : ['', [ Validators.required]] ,
    business_email : ['', [Validators.required]] ,
    business_phone : ['', [Validators.required]] ,
    cell_phone : ['', [Validators.required]] ,
  });

  public fileProgress:  boolean | undefined;
  public saveBusinessProgress:  boolean | undefined;




  ngOnInit(): void {

    this.getCountries();
    // this.loadCategoryOptions();
    this.getCats()

    if(this.business){
      this.activeStep = -1
      this.formGeneralInfo.controls.country.setValue(this.business.country);
      this.formGeneralInfo.controls.city.setValue(this.business.city);
      this.formGeneralInfo.controls.business_type.setValue(this.business.business_type);
      this.formGeneralInfo.controls.business_name_prefix.setValue(this.business.business_name_prefix);
      this.formGeneralInfo.controls.business_name.setValue(this.business.business_name);
      this.formGeneralInfo.controls.slogan.setValue(this.business.slogan);

      this.formGeneralInfo.controls.address.setValue(this.business.address);
      this.formDetails.controls.description.setValue(this.business.description);
      this.formDetails.controls.summary.setValue(this.business.business_summary)

      this.business.tags.forEach((tag: { tag: string; }) => {
        this.tags.push(tag.tag);
      });

      let cats: any[] = [] ;



      this.formCategoryInfo.controls.categories.setValue(cats);


      this.formGeneralInfo.controls.business_email.setValue(this.business.contacts.business_email);
      this.formGeneralInfo.controls.business_phone.setValue(this.business.contacts.business_phone);
      this.formGeneralInfo.controls.cell_phone.setValue(this.business.contacts.cell_phone);
      this.formGeneralInfo.controls.website.setValue(this.business.social_media.website);
      this.formGeneralInfo.controls.description.setValue(this.business.description);
      this.formGeneralInfo.controls.summary.setValue(this.business.business_summary);
      this.formCategoryInfo.controls.main_category_id.setValue(this.business.main_category_id);
      this.formPriceInfo.controls.price_level.setValue(this.business.price_level);
      this.formPriceInfo.controls.price_from.setValue(this.business.price_from);
      this.formPriceInfo.controls.price_to.setValue(this.business.price_to);
      //this.working_hours = this.business.working_hours ;
      this.formContactInfo.controls.contact_email.setValue(this.business.contacts.contact_email);
      this.logo = this.business.logo ;
      this.business.working_hours.forEach((working_hour: any) => {
        this.working_hours.push({
          day: working_hour.day,
          ends_at: working_hour.ends_at,
          open_24_h: working_hour.open_24_h,
          starts_at: working_hour.starts_at
        });


      });
      this.business.categories.forEach((cat: any) => {
        if(cat.category){
          this.selectCategory(cat.category)
         // this.selectedCategories.push(cat.category);
        }
      });
      this.business.services.forEach((service: any) => {
        this.services.push({
          id : service.id ,
          service_name: service.service_name ,
          service_description: service.service_description ,
          price: service.price ,
          booking_enabled : service.booking_enabled
        });
      });
      this.business.faqs.forEach((faq: any) => {
        this.faqs.push({
          id : faq.id ,
          question : faq.question ,
          answer: faq.answer
        });
      });
      this.business.gallery.forEach((img: any) => {
        this.images.push(img.img);
      });

      if (this.business.social_media !== null){

        var mediaNames = ['facebook', 'youtube','twitter','google', 'whatsapp' ]

        mediaNames.forEach(media => {
          this.fillSocialMedia(media);
        })

        // if (this.business.social_media['youtube']){
        //   var fb = this.socialMedias.filter((media: SocialMedia) => media.name === 'youtube') ;
        //   if (fb[0]){
        //     fb[0].link = this.business.social_media['youtube']
        //   }
        // }

      }


    } else {
      this.business = {
        custom_attributes: []
      }



      this.activeStep = 0
    }

    this.route.queryParams.subscribe(params => {
       if(params['step'] !== undefined && params['step'] !== null){
          this.setStep(parseInt(params['step']));
       }
    })

  }

  fillSocialMedia(name: string){
    if (this.business.social_media[name]){
      var media = this.socialMedias.filter((media: SocialMedia) => media.name === name) ;
      if (media[0]){
        media[0].link = this.business.social_media[name]
      }
    }
  }

  // async loadCategoryOptions() {
  //   this.categoryOptions = await this.getCats();
  //
  // }

  // get business details

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

  getCatById(id: any){
    if(this.categoryOptions){
      let cat = this.categoryOptions.filter(function(node : Category) {
        return node.id.toString()===id.toString();
      });


      return cat[0].name || '' ;
    }
    return null ;
  }

  async getCustomAttributes(cat: Category) {
    try {
      const resp = await this.categoryService.getCustomAttributes(cat.id).toPromise();
      console.log(resp);
      if (resp.attributes) {
        cat.custom_attributes = resp.attributes ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
    }

  }


  async nextStep(formGroup: UntypedFormGroup , validationRequired: boolean = true) {

    if (! formGroup.valid && validationRequired) {
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
  bankFilterCtrl: any;
  cat_search: any;

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

  deleteImage(img: string){
    this.images.splice(this.images.indexOf(img), 1);
  }

  onRemove(event: File , scope: string) {
    console.log(event);
    if(scope === 'images'){
      this.files.splice(this.files.indexOf(event), 1);
    } else {
      this.logoFiles.splice(this.logoFiles.indexOf(event), 1);
    }
  }

  async onUploadLogo() {
    if (!this.logoFiles[0]) {
      // if(! this.logo) {
      //   this.snackbarService.openSnackBar("Please upload a logo")
      //   return;
      // }
      this.snackbarService.openSnackBar("Please upload a logo")
    }

    try {

      let data = new FormData();
      if(this.logoFiles[0]) {
        data.append('file', this.logoFiles[0]);
        data.append('upload_preset', environment.cloudinary.preset);
        this.fileProgress = true
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.logo = resp.secure_url;
        }
        this.fileProgress = false ;
        // if (this.business && this.business.id){
        //   this.createListing();
        // }
      }
    } catch ($exception: any) {
      this.fileProgress = false
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    } finally {
      this.fileProgress = false
    }
  }

  async onUploadGallery() {
    if (!this.files[0]) {
      this.snackbarService.openSnackBar('Please upload at least one image')
      return
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
      this.fileProgress = false ;

      this.goStep(-1)
    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    } finally {
      this.fileProgress = false ;
    }
  }



  async onUpload() {
    if (!this.files[0]) {
      if(this.images.length < 1) {
        alert('Please upload at least one image !');
        return;
      }
    }
    if (!this.logoFiles[0]) {
      if(! this.logo) {
        alert('Please upload logo !');
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


      let data = new FormData();
      if(this.logoFiles[0]) {
        data.append('file', this.logoFiles[0]);
        data.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.logo = resp.secure_url;
        }
      }

      this.fileProgress = false ;

      this.currentStep = this.currentStep + 1 ;
      this.goNextTab();
    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('File upload failed');
    }

    //   return false ;


  }

  async getCategories(parentId: any , container: any=[]) {
    this.categoryLoading = true ;
    const resp = await this.categoryService.getCategories(parentId).toPromise();
    this.categoryLoading = false ;
    console.log(resp);
  }


  setDefaultLatLang(){
    this.formGeneralInfo.controls.latitude.setValue(40) ;
    this.formGeneralInfo.controls.longitude.setValue(74);
  }


  setCustomAttribute(attribute: any){

    let cIndex = this.business.custom_attributes.findIndex( (obj:any) => obj.name === attribute.name);

    if(cIndex === -1){
      this.business.custom_attributes.push(attribute)
    } else {
      this.business.custom_attributes[cIndex] = attribute;
    }

    console.log("Custom attr list from child component", this.business.custom_attributes);
  }

  removeAttr(attribute: any){

    let cIndex = this.business.custom_attributes.findIndex( (obj:any) => obj.name === attribute.name);

    if(cIndex !== -1){
      this.business.custom_attributes.splice(cIndex, 1)
    }

    console.log("Custom attr list from child component", this.business.custom_attributes);
  }


  async createListing() {

    if(! this.formGeneralInfo.controls.latitude.value || ! this.formGeneralInfo.controls.longitude.value){
      this.setDefaultLatLang();
    }

    // console.log(this.form.value);

    this.saveBusinessProgress = true ;

    let business_id = null ;
    if(this.business && this.business.id){
      business_id = this.business.id ;
    }

    let user_id = null ;
    if(this.business && this.business.id){
      user_id = this.business.user_id ;
    } else {
      user_id = this.authService.getUserID() ;
    }


    let data = {
      user_id : user_id ,
      auth_token : this.authService.getAuthToken() ,
      country : this.formGeneralInfo.controls.country.value ,
      city : this.formGeneralInfo.controls.city.value ,
      business_name_prefix : this.formGeneralInfo.controls.business_name_prefix.value ,
      business_name : this.formGeneralInfo.controls.business_name.value  ,
      business_type : this.formGeneralInfo.controls.business_type.value  ,
      slogan : this.formGeneralInfo.controls.slogan.value  ,
      address : this.formGeneralInfo.controls.address.value  ,
      description : this.formDetails.controls.description.value  ,
      business_summary : this.formDetails.controls.summary.value  ,
      tags : this.tags  ,
      business_email : this.formContactInfo.controls.business_email.value  ,
      business_phone :this.formContactInfo.controls.business_phone.value  ,
      cell_phone : this.formContactInfo.controls.cell_phone.value  ,
      website : this.formGeneralInfo.controls.website.value  ,
      categories : this.selectedCategories ,
      services : this.services ,
      service_deletable : this.service_deletable ,
    //  main_category_id : this.formCategoryInfo.controls.main_category_id.value,
      features : [] ,
      price_level : this.formPriceInfo.controls.price_level.value ,
      price_from : this.formPriceInfo.controls.price_from.value ,
      price_to : this.formPriceInfo.controls.price_to.value ,
      contact_email : this.formContactInfo.controls.contact_email.value ,
      working_hours : this.working_hours ,
      social_media : this.socialMedias ,
      images : this.images ,
      logo : this.logo,
      business_id : business_id,
      faqs: this.faqs,
      latitude: this.formGeneralInfo.controls.latitude.value ,
      longitude: this.formGeneralInfo.controls.longitude.value,
      custom_attributes: this.business.custom_attributes
    };

    console.log(data);

    try {
      const resp = await this.listingService.saveBusiness(data).toPromise();


      console.log(resp);

      if (resp.success) {
        if (business_id) {
          this.snackbarService.openSnackBar(resp.success);
        } else {
          this.bottomSheet.open(BusinessCreationCourageBottomSheetComponent, {
            data: {

            }
          });
          this.snackbarService.openSnackBar('Business saved successfully')
        }
        let event_name = '' ;
        if(this.business && this.business.id){
          event_name = 'Business Updated successfully !'
        } else {
          event_name = 'Business Created Successfully !';
        }


        if (!this.device.isMobile()) {
          this.sweet.successNotification(event_name, resp.success);
        }

        if(resp.business) {
          this.business = resp.business ;
          if (! business_id) {
            this.router.navigate(['/business/edit/' + this.business.id])
          } else {
            if (this.activeStep === 12){
               this.goStep(5);
            } else if (this.activeStep === 14){
              this.goStep(6);
            } else if (this.activeStep === 13){
              this.goStep(9);
            } else {
              this.goStep(-1);
            }
          }
        } else {
          setTimeout(() =>{
            window.location.reload();
          } , 2000);
        }

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

  defaultImages = [
    {img:  environment.frontend + '/' + 'assets/img/placeholders/placeholder-2-1.png'}
  ]

  defaultLogo = environment.frontend + '/' + 'assets/img/placeholders/placeholder-1-1.png';

  buildBusinessDataFromForm(){

    let images: any = this.images;
    if (this.images.length < 1){
      images = this.defaultImages;
    } else {
      this.images.forEach(image => {
        images.push({
          img: image
        });
      })
    }

    let data = {
      id: Date.now(),
      auth_token : this.authService.getAuthToken() ,
      country : this.formGeneralInfo.controls.country.value ,
      city : this.formGeneralInfo.controls.city.value ,
      business_name_prefix : this.formGeneralInfo.controls.business_name_prefix.value ,
      business_name : this.formGeneralInfo.controls.business_name.value  ,
      business_type : this.formGeneralInfo.controls.business_type.value  ,
      slogan : this.formGeneralInfo.controls.slogan.value  ,
      address : this.formGeneralInfo.controls.address.value  ,
      description : this.formDetails.controls.description.value  ,
      business_summary : this.formDetails.controls.summary.value  ,
      tags : this.tags  ,
      business_email : this.formContactInfo.controls.business_email.value  ,
      business_phone :this.formContactInfo.controls.business_phone.value  ,
      cell_phone : this.formContactInfo.controls.cell_phone.value  ,
      website : this.formGeneralInfo.controls.website.value  ,
      categories : this.selectedCategories ,
      services : this.services ,
      service_deletable : this.service_deletable ,
      //  main_category_id : this.formCategoryInfo.controls.main_category_id.value,
      features : [] ,
      price_level : this.formPriceInfo.controls.price_level.value ,
      price_from : this.formPriceInfo.controls.price_from.value ,
      price_to : this.formPriceInfo.controls.price_to.value ,
      contact_email : this.formContactInfo.controls.contact_email.value ,
      working_hours : this.working_hours ,
      social_media : this.socialMedias ,
      images : images,
      logo : this.logo || this.defaultLogo,
      faqs: this.faqs,
      latitude: this.formGeneralInfo.controls.latitude.value ,
      longitude: this.formGeneralInfo.controls.longitude.value,
      custom_attributes: this.business.custom_attributes
    };

    return data;

  }


  handleAddressChange(address: Address) {
    console.log(address);
  }

  async selectCategory(cat: any) {
    if (this.isSelected(cat) === false) {
      this.selectedCategories.push(cat);
      await this.getCustomAttributes(cat);
      this.selectedCategories[this.selectedCategories.indexOf(cat)].sub_cats = [];
      // this.selectedCategories[this.selectedCategories.indexOf(cat)].sub_cats = await this.getCategories(cat.id, this.selectedCategories[this.selectedCategories.indexOf(cat)].sub_cats);
    } else {
      let selected = this.selectedCategories.filter(function(node : Category) {
        return node.id.toString()=== cat.id.toString();
      });

      if (selected[0]){
        this.selectedCategories.splice(this.selectedCategories.indexOf(selected[0]), 1);
      }
    }

    console.log(this.selectedCategories);

  }

  isSelected(cat: any){
    if(this.selectedCategories){
      let selected = this.selectedCategories.filter(function(node : Category) {
        return node.id.toString()=== cat.id.toString();
      });

      if (selected[0]){
        return true ;
      }
      return false ;
    }

    return false ;

  }

  nextCategories() {

  }



  async getCat() {
    try {
      const resp = await this.categoryService.getCategory(this.parent_id).toPromise();
      console.log(resp);
      if(resp.category){
        this.cat = resp.category ;
      }
    } catch ($ex) {
      console.log($ex);
    }

  }

  async getCats() {

    try {
      this.cat_progress = true;
      console.log(this.parent_id);
      const resp = await this.categoryService.getCategories(this.parent_id , this.formCategoryInfo.controls.main_search.value).toPromise();
      if (resp) {
        this.categories = resp ;
        console.log('Categories from b form', this.categories);

      }

    } catch ($ex) {
      console.log($ex);
    } finally {
      this.cat_progress = false ;
    }

  }

  subCats(id: any){
    this.parent_id = id;
    this.getCat();
    this.getCats();
  }

  desc:any = undefined ;
  updateDes() {
    console.log('updated');

  }

  GetContainerText(_container: any){
    let _containerText = _container.innerText;
    let _containerHTML = _container.innerHTML;
    return _containerHTML ;
  }


  async getCountries() {
    try {
      this.progress = true ;
      const resp = await this._countryService.getAll().toPromise();
      if(resp.countries){
        this.countries = resp.countries ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  selectCountry(value: any) {
    this.formGeneralInfo.controls.country.setValue(value.country_name);
    this.selectedCountry = value ;
  }

  async stepForward() {

    // @ts-ignore

    try {
      this.businessData.emit(this.buildBusinessDataFromForm())
    } catch ($ex){
      this.businessData.emit($ex);
    }


    if (this.activeStep < this.steps.length) {
      if (this.activeStep == 0) {
        if (!this.formGeneralInfo.valid) {
          this.formGeneralInfo.markAllAsTouched()
          // this.snackbarService.openSnackBar('Please correct all the fields')
          return
        }
      }
      if (this.activeStep == 1) {
        if (!this.formDetails.valid) {
          this.formDetails.markAllAsTouched()
          return
        }
      }
      if (this.activeStep == 2) {
        if (!this.selectedCategories.length) {
          this.snackbarService.openSnackBar("Please select at least one category")
          return
        }
        console.log("Selected -- cats", this.selectedCategories);
      }

      if (this.activeStep == 3) {
        await this.onUploadLogo()
        if( !this.logo){
          return
        }
      }

      if (this.activeStep == 4) {
        await this.onUploadGallery()
        if( !this.images || !this.images.length){
          return
        }
        this.createListing();
      }

      this.activeStep = this.activeStep + 1


    }
  }

  async save() {

    switch (this.activeStep) {
      // Business General Info
      case 0 : {
        if (!this.formGeneralInfo.valid) {
          this.formGeneralInfo.markAllAsTouched()
          return
        }
        await this.createListing();
        break
      }
      // Business details info
      case 1 : {
        if (!this.formDetails.valid) {
          this.formDetails.markAllAsTouched()
          return
        }
        await this.createListing();
        break
      }
      // Business category info
      case 2 : {
        if (!this.selectedCategories.length) {
          this.snackbarService.openSnackBar("Please select at least one category")
          return
        }
        console.log("Selected -- cats", this.selectedCategories);
        await this.createListing();
        break
      }
      // Business Logo
      case 3 : {
        await this.onUploadLogo();
        await this.createListing()
        break
      }
      // Business Gallery
      case 4 : {
        await this.onUploadGallery()
        await this.createListing()
        break
      }
      // Business details info
      case 8 : {
        if (!this.formPriceInfo.valid) {
          this.formPriceInfo.markAllAsTouched()
          return
        }
        await this.createListing();
        break
      }
      // Business Contact Info
      case 10 : {
        if (!this.formContactInfo.valid) {
          this.formContactInfo.markAllAsTouched()
          return
        }
        await this.createListing();
        break
      }
      // Business Social Media Info
      case 11 : {
        await this.createListing();
        break
      }
      // Service Add
      case 12 : {
        var serviceAdded = this.addService()
        if (serviceAdded) {
          await this.createListing();
        }
        break
      }
      // Faq Add
      case 13 : {
        var faqAdded = this.addFaq()
        if (faqAdded) {
          await this.createListing()
        }
        break
      }
      // Add working hours
      case 14 : {
        var whAdded = this.addWorkingHour()
        if (whAdded) {
          await this.createListing()
        }
        break
      }
    }
  }

  stepPrev(){
    if(this.activeStep > 0){
      this.activeStep = this.activeStep - 1 ;
    }
  }

  goStep(number: number) {
    this.router.navigate(['/business/edit/' + this.business.id ], { queryParams: { step: number}})

  }

  backToPreviousStep(){
    if(this.activeStep === 12){
       this.goStep(5);
    }
    else if(this.activeStep === 13){
       this.goStep(9);
    }
    else if(this.activeStep === 14){
       this.goStep(6);
    }
    else {this.goStep(-1);}
  }


  setStep(number: number){
    this.activeStep = number ;
    var accordian = this.accordians.filter((x: Accordian) => x.step === number);
    if(accordian && accordian[0]){
      this.heading = accordian[0].name
    } else {
      this.heading = this.business.name
    }
  }




}
