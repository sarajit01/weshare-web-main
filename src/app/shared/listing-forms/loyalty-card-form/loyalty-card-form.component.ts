import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../../services/listing.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {CategoryService} from "../../../services/category.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {AuthService} from "../../../services/auth.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {CountryService} from "../../../services/country.service";
import {ROUTES} from "../../../core/routes";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {environment} from "../../../../environments/environment";
import {Accordian, Step} from "../../../models/Step";
import {ActivatedRoute, Router} from "@angular/router";
import {SharePopupComponent} from "../../share-popup/share-popup.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LCPreviewBottomSheetComponent} from "../lcpreview-bottom-sheet/lcpreview-bottom-sheet.component";
@Component({
  selector: 'app-loyalty-card-form',
  templateUrl: './loyalty-card-form.component.html',
  styleUrls: ['./loyalty-card-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoyaltyCardFormComponent),
      multi: true,
    }
  ]
})
export class LoyaltyCardFormComponent implements OnInit, ControlValueAccessor {

  routes = ROUTES;
  public Editor = ClassicEditor;
  businesses: any | undefined;
  @Input() userId: any = undefined;
  @Input() isAdmin: any = false;
  progress: boolean = false;
  displayLivePreview: boolean = false
  previewState: string = "expanded"
  bg_type: string = "color"
  redemption_img_type: string = "pick"
  displayLogo: string = "yes"

  steps: Step[] = [{name: "General"},{name: "Details"},{name: "Appearance"}, {name: "Images"},{name: "Message"}] ;
  accordians: Accordian[] = [
    {name: "General Information", step: 0, visible: true},
    {name: "Description", step: 1, visible: true},
    {name: "Logo", step: 3, visible: true},
    {name: "Redemption Image", step: 5, visible: true},
    {name: "Appearance", step: 2, visible: true},
    {name: "Messages", step: 4, visible: true},
    {name: "Rewards Configuration", step: 5, visible: true},

  ];

  activeStep: number = -2 ;
  activeSubStep: number = 0
  private validated:boolean = true
  heading: string = "General";
  buttonsDisabled: boolean = false


  formGeneralInfo = this.fb.group({
    id : [''] ,
    user_id: [ this.authService.getUserID()],
    search_business : [''] ,
    business_id :  ['', [ Validators.required]] ,
    card_name : ['', [ Validators.required]] ,
    card_type : ['', [ Validators.required]] ,
    visits_for_cash : [''] ,
    prize_value: [''],
    max_redemption : ['', [ Validators.required]] ,
    card_title : ['', [ Validators.required]] ,
    description : [''] ,
    card_description : [''] ,
    terms : ['', []] ,
    restrictions : [''] ,
    client_url : [''] ,
    redemption_url : [''] ,
  });

  formDescription = this.fb.group({
    description : ['', [ Validators.required]] ,
    card_description : ['', [ Validators.required]] ,
    terms : ['', [ Validators.required]] ,
    restrictions : ['', [ Validators.required]] ,
    client_url : ['', [ Validators.required]] ,
    redemption_url : ['', [ Validators.required]] ,
  });

  formAppearanceInfo = this.fb.group({
    logo : [''] ,
    bg_color : ['', []] ,
    font_family : ['', [ Validators.required]] ,
    font_size : ['', [ Validators.required]] ,
    font_color : ['', [ Validators.required]] ,
    heading_font_size : ['', [ Validators.required]] ,
    heading_font_color : ['', [ Validators.required]] ,
    redemption_img : [''] ,
    // redemption_img_color : ['', [ Validators.required]] ,
    bg_img : [''],
  });

  formRewards = this.fb.group({
    filling_start_on_end : ['', [ Validators.required]] ,
    message_on_complete : ['', [ Validators.required]] ,
    message_on_exchange : ['', [ Validators.required]] ,
    lc_rewards : [],
    customer_reward_percent: [''],
    point_value: ['']
  });


  fileProgress: boolean = false;
  logo: string | undefined;
  @Input() loyalty_card: any


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
    private route: ActivatedRoute

  ) { }

  onChange: any;
  step: number = 1;
  font_families: string[] = ['Arial (sans-serif)', 'Verdana (sans-serif)', 'Tahoma (sans-serif)', 'Trebuchet MS (sans-serif)', 'Times New Roman (serif)', 'Georgia (serif)', 'Garamond (serif)', 'Courier New (monospace)', 'Brush Script MT (cursive)'];
  images : string[] = [] ;
  bg_images : string[] = [] ;


  files: File[] = [];
  bg_files: File[] = [];

  initAccordians(){
    if (this.loyalty_card.card_type === "prize"){
      this.accordians = [
        {name: "General Information", step: 0, visible: true},
        {name: "Description", step: 1, visible: true},
        {name: "Logo", step: 3, visible: true},
        {name: "Redemption Image", step: 5, visible: true},
        {name: "Appearance", step: 2, visible: true},
        {name: "Messages", step: 4, visible: true},
      ];

      let stepRewardIndex = this.steps.findIndex((x: any) => x.name === 'Rewards');
      if (stepRewardIndex > -1){
        this.steps.splice(stepRewardIndex);
      }

    } else {
      this.accordians = [
        {name: "General Information", step: 0, visible: true},
        {name: "Description", step: 1, visible: true},
        {name: "Logo", step: 3, visible: true},
        {name: "Appearance", step: 2, visible: true},
        {name: "Messages", step: 4, visible: true},
        {name: "Rewards Configuration", step: 5, visible: true},

      ];

      let stepRewardIndex = this.steps.findIndex((x: any) => x.name === 'Rewards');
      if (stepRewardIndex < 0){
        this.steps.push({
          name: 'Rewards'
        });
      }
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getMyBusinessListings();

    if(this.loyalty_card && this.loyalty_card.id){
      this.activeStep = -1 ;

      this.initAccordians()

      this.displayLogo = this.loyalty_card.display_logo

      this.formGeneralInfo.controls['id'].setValue(this.loyalty_card.id);
      this.formGeneralInfo.controls['user_id'].setValue(this.loyalty_card.user_id);

      if(this.businesses && this.businesses.length){
        this.businesses.forEach((business: any) => {
          if(this.loyalty_card.business_id === business.id){
            this.formGeneralInfo.controls['business_id'].setValue(business);
          }
        });
      }

      this.formGeneralInfo.controls['card_name'].setValue(this.loyalty_card.card_name);
      this.formGeneralInfo.controls['card_type'].setValue(this.loyalty_card.card_type);
      this.formGeneralInfo.controls['visits_for_cash'].setValue(this.loyalty_card.visits_for_cash);
      this.formGeneralInfo.controls['prize_value'].setValue(this.loyalty_card.prize_value);
      this.formGeneralInfo.controls['max_redemption'].setValue(this.loyalty_card.max_redemption);
      this.formGeneralInfo.controls['card_title'].setValue(this.loyalty_card.card_title);
      this.formDescription.controls['description'].setValue(this.loyalty_card.description);
      this.formDescription.controls['card_description'].setValue(this.loyalty_card.card_description);
      this.formDescription.controls['terms'].setValue(this.loyalty_card.terms);
      this.formDescription.controls['restrictions'].setValue(this.loyalty_card.restrictions);
      this.formDescription.controls['client_url'].setValue(this.loyalty_card.client_url);
      this.formDescription.controls['redemption_url'].setValue(this.loyalty_card.redemption_url);

      this.formAppearanceInfo.controls['logo'].setValue(this.loyalty_card.logo);
      this.logo = this.loyalty_card.logo ;
      this.formAppearanceInfo.controls['bg_color'].setValue(this.loyalty_card.bg_color);
      this.formAppearanceInfo.controls['font_family'].setValue(this.loyalty_card.font_family);
      this.formAppearanceInfo.controls['font_size'].setValue(this.loyalty_card.font_size);
      this.formAppearanceInfo.controls['font_color'].setValue(this.loyalty_card.font_color);
      this.formAppearanceInfo.controls['redemption_img'].setValue(this.loyalty_card.redemption_img);
      this.formAppearanceInfo.controls['heading_font_size'].setValue(this.loyalty_card.heading_font_size);
      this.formAppearanceInfo.controls['heading_font_color'].setValue(this.loyalty_card.heading_font_color);
      this.formAppearanceInfo.controls['bg_img'].setValue(this.loyalty_card.custom_bg_img);
      this.images.push(this.loyalty_card.redemption_img);
      if(this.loyalty_card.custom_bg_img){
        this.bg_images.push(this.loyalty_card.custom_bg_img);
      }
    //  this.formAppearanceInfo.controls['redemption_img_color'].setValue(this.loyalty_card.redemption_img_color);


      /*
      formRewards = this.fb.group({
    filling_start_on_end : ['', [ Validators.required]] ,
    message_on_complete : ['', [ Validators.required]] ,
    message_on_exchange : ['', [ Validators.required]] ,
    lc_rewards : []
  });

       */
      this.formRewards.controls['filling_start_on_end'].setValue(this.loyalty_card.filling_start_on_end);
      this.formRewards.controls['message_on_complete'].setValue(this.loyalty_card.message_on_complete);
      this.formRewards.controls['message_on_exchange'].setValue(this.loyalty_card.message_on_exchange);
      this.formRewards.controls['customer_reward_percent'].setValue(this.loyalty_card.customer_reward_percent);
      this.formRewards.controls['point_value'].setValue(this.loyalty_card.point_value);


      if(this.loyalty_card.rewards && this.loyalty_card.rewards.length){
        this.loyalty_card.rewards.forEach((reward: any) => {
          this.rewards.push({
            points: reward.points ,
            notes : reward.notes,
            reward_name: reward.reward_name,
          });
        })

      }

      this.step = 1 ;

    } else {
      this.setStep(0)
      this.loyalty_card = {
        card_description: 'Add some awesome description to show here',
        bg_color: '#333333',
        font_size: 16,
        font_color: '#FFFFFF',
        logo: 'https://png.pngtree.com/thumb_back/fh260/background/20220218/pngtree-simple-light-glass-texture-simple-white-background-image_962133.jpg',
        business: {
          id: 0,
          logo: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
        }
      }

      this.addReward();

    }



    setTimeout(() => {
      this.changePreviewState("collapsed")
    }, 1500)

    this.route.queryParams.subscribe(params => {
      if(params['step'] !== undefined && params['step'] !== null){
        this.setStep(parseInt(params['step']));
      }
    })

  }


  onGeneralInfoChange(){
    console.log(this.formGeneralInfo.value)
    if (this.formGeneralInfo.controls.card_type.value){
      this.loyalty_card.card_type = this.formGeneralInfo.controls.card_type.value ;
      this.initAccordians();
    }
  }

  async getMyBusinessListings() {
    try {
      const resp = await this.listingService.getListing('business',this.formGeneralInfo.controls.user_id.value,'').toPromise();
      console.log(resp);
      if(resp.data){
        this.businesses = resp.data ;
        console.log(this.businesses);
        if(this.loyalty_card){
          this.businesses.forEach((data: any) => {
            if (data.id === this.loyalty_card.business_id) {
              this.formGeneralInfo.controls.business_id.setValue(data);
            }
          });
        }
      }
    } catch ($ex) {
    }
  }

  async saveLoyaltyCard() {

    let data = {
      id: this.formGeneralInfo.controls['id'].value,
      user_id: this.formGeneralInfo.controls['user_id'].value ,
      business_id: this.formGeneralInfo.controls['business_id'].value.id,
      card_name : this.formGeneralInfo.controls['card_name'].value,
      card_type : this.formGeneralInfo.controls['card_type'].value,
      visits_for_cash :this.formGeneralInfo.controls['visits_for_cash'].value,
      prize_value: this.formGeneralInfo.controls['prize_value'].value,
      max_redemption : this.formGeneralInfo.controls['max_redemption'].value,
      card_title : this.formGeneralInfo.controls['card_title'].value,
      description : this.formDescription.controls['description'].value,
      card_description : this.formDescription.controls['card_description'].value,
      terms : this.formDescription.controls['terms'].value,
      restrictions : this.formDescription.controls['restrictions'].value,
      client_url : this.formDescription.controls['client_url'].value,
      redemption_url : this.formDescription.controls['redemption_url'].value,
      logo : this.logo,
      bg_color : this.formAppearanceInfo.controls['bg_color'].value,
      font_family : this.formAppearanceInfo.controls['font_family'].value,
      font_size : this.formAppearanceInfo.controls['font_size'].value,
      font_color : this.formAppearanceInfo.controls['font_color'].value,
      redemption_img : this.loyalty_card.redemption_img,
      heading_font_size : this.formAppearanceInfo.controls['heading_font_size'].value,
      heading_font_color : this.formAppearanceInfo.controls['heading_font_color'].value,
      custom_bg_img: this.loyalty_card.bg_img || '' ,
      bg_img : this.loyalty_card.bg_img || '',
    //  redemption_img_color : this.formAppearanceInfo.controls['redemption_img_color'].value,
      filling_start_on_end : this.formRewards.controls['filling_start_on_end'].value,
      message_on_complete : this.formRewards.controls['message_on_complete'].value,
      message_on_exchange : this.formRewards.controls['message_on_exchange'].value,
      point_value: this.formRewards.controls['point_value'].value,
      customer_reward_percent: this.formRewards.controls['customer_reward_percent'].value,
      display_logo: this.displayLogo,
      lc_rewards : this.rewards

    }

    try {
      this.progress = true;
      const resp = await this.listingService.saveLoyaltyCard(data).toPromise();
      console.log(resp);
      if(resp.loyalty_card){
        this.loyalty_card = resp.loyalty_card
        this.snackbarService.openSnackBar('Loyalty Card Saved Successfully');
        this.goStep(-1)
        // this.sweet.successNotification(  , resp.success);

        // setTimeout(() =>{
        //   window.location.reload();
        // } , 2000);

      }

      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($ex: any) {
      this.snackbarService.openSnackBar('Something went wrong to save the loyalty card');

    } finally {
      this.progress = false;
    }
  }


  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  back(){
    if(this.step > 1){
      this.step -- ;
    }
  }

  async submitForm() {
    if (this.step === 1) {
      if (this.formGeneralInfo.invalid) {
        return;
      }
      this.step = 2;
      return;
    }
    if (this.step === 2) {
      if (this.formAppearanceInfo.invalid) {
        return;
      }

      await this.onUpload();
      if(! this.logo || !this.images.length){
        this.snackbarService.openSnackBar('Please upload all the required images');
        return ;
      }

      this.step = 3;
      return;
    }

    if (this.step === 3) {
      if (this.formRewards.invalid) {
        return;
      }


      await this.saveLoyaltyCard();
      return;
    }

  }


  logoFiles : File[] = [] ;
  rewards: any[] = [] ;

  addReward(){
    this.rewards.push({
      points: 0 ,
      notes : '',
      reward_name : ''
    })
  }

  removeReward(reward: any){
    const userConfirmation = confirm("Are you sure to delete this reward?");
    if (userConfirmation){
      this.rewards.splice( this.rewards.indexOf(reward), 1);
    }

  }

  onSelect(event: { addedFiles: any; } , scope:string) {
    console.log(event);
    if (this.files.length === 1) {
      this.snackbarService.openSnackBar('You can upload only one redemption image!');
      return;
    } else {
      this.files.push(...event.addedFiles);
    }
  }

  onSelectBg(event: { addedFiles: any; } , scope:string) {
    console.log(event);
    if (this.bg_files.length === 1) {
      this.snackbarService.openSnackBar('You can upload only one custom background image!');
      return;
    } else {
      this.bg_files.push(...event.addedFiles);
    }
  }

  onSelectLogo(event: { addedFiles: any; } , scope:string) {
    console.log(event);
    if (this.logoFiles.length === 1) {
      this.snackbarService.openSnackBar('You can upload only one logo!');
      return;
    } else {
      this.logoFiles.push(...event.addedFiles);
    }

  }

  deleteImage(img: string){
    this.images.splice(this.images.indexOf(img), 1);
  }

  deleteBgImage(img: string){
    this.bg_images.splice(this.images.indexOf(img), 1);
  }

  onRemove(event: File , scope: string) {
    console.log(event);
    if(scope === 'images'){
      this.files.splice(this.files.indexOf(event), 1);
    } else {
      this.logoFiles.splice(this.logoFiles.indexOf(event), 1);
    }
  }

  onBgRemove(event: File , scope: string) {
    console.log(event);
    this.bg_files.splice(this.files.indexOf(event), 1);

  }

  async onLogoUpload() {
    if (!this.logoFiles[0]) {
      if(! this.logo) {
        this.snackbarService.openSnackBar('Please upload logo')
        return;
      }
    }

    try {
      let data = new FormData();
      if(this.logoFiles[0]) {
        data.append('file', this.logoFiles[0]);
        data.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.logo = resp.secure_url;
          this.logoFiles = [] ;
        }
      }

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('Logo file upload failed');
    }
  }

  async onBgUpload() {


    if (!this.bg_files[0]) {
      if(this.images.length < 1) {
        alert('Please upload redemption image !');
        return;
      }
    }
    if (!this.logoFiles[0]) {
      if(! this.logo) {
        alert('Please upload logo!');
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

      this.files = [] ;


      let data = new FormData();
      if(this.logoFiles[0]) {
        data.append('file', this.logoFiles[0]);
        data.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.logo = resp.secure_url;
          this.logoFiles = [] ;
        }
      }


      let data2 = new FormData();
      if(this.bg_files[0]) {
        data2.append('file', this.bg_files[0]);
        data2.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data2).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.bg_images.push(resp.secure_url);
          this.bg_files = [] ;
        }
      }

      this.fileProgress = false ;

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('Custom background image File upload failed');
    }

    //   return false ;


  }



  async onUpload() {


    if (!this.files[0]) {
      if(this.images.length < 1) {
        alert('Please upload redemption image !');
        return;
      }
    }
    if (!this.logoFiles[0]) {
      if(! this.logo) {
        alert('Please upload logo!');
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

      this.files = [] ;


      let data = new FormData();
      if(this.logoFiles[0]) {
        data.append('file', this.logoFiles[0]);
        data.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.logo = resp.secure_url;
          this.logoFiles = [] ;
        }
      }


      let data2 = new FormData();
      if(this.bg_files[0]) {
        data2.append('file', this.bg_files[0]);
        data2.append('upload_preset', environment.cloudinary.preset);
        let resp = await this.uploadService.upload(data2).toPromise();
        console.log(resp);
        if (resp.secure_url) {
          this.bg_images.push(resp.secure_url);
          this.bg_files = [] ;
        }
      }

      this.fileProgress = false ;

    } catch ($exception: any) {
      console.log($exception);
      this.snackbarService.openSnackBar('Custom background image File upload failed');
    }

    //   return false ;


  }

  goStep(number: number) {
    this.router.navigate(['/business/loyalty-card/edit/' + this.loyalty_card.id ], { queryParams: { step: number}})
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
      this.heading = this.loyalty_card.card_title
    }
  }

  async save() {
    switch (this.activeStep) {
      // LC General Info
      case 0 : {
        if (!this.formGeneralInfo.valid) {
          this.formGeneralInfo.markAllAsTouched()
          return
        }
        break
      }
      case 1 : {
        if (!this.formDescription.valid) {
          this.formDescription.markAllAsTouched()
          return
        }
        break
      }
      case 2 : {
        if (this.bg_type === 'img') {
          if (! this.loyalty_card.bg_img){
            this.snackbarService.openSnackBar('Please upload a custom background image for the loyalty card')
            return;
          }
        }
        if (this.bg_type === 'color') {
          if (! this.formAppearanceInfo.controls.bg_color.value){
            this.snackbarService.openSnackBar('Please select background color for the loyalty card')
            return;
          }
        }

        if (!this.formAppearanceInfo.valid){
          this.formAppearanceInfo.markAllAsTouched();
          return;
        }

        break
      }

      case 3 : {
        if (!this.loyalty_card.logo){
          this.snackbarService.openSnackBar('Please upload a logo for the loyalty card')
          return;
        }
        break
      }

      case 4 : {
        if (this.formRewards.invalid){
          this.formRewards.markAllAsTouched()
          return
        }
        break
      }

      case 5 : {
        if (! this.loyalty_card.redemption_img){
          this.snackbarService.openSnackBar('Please set a redemption image for the loyalty card')
          return
        }
        break
      }
    }

    await this.saveLoyaltyCard()
  }

  stepPrev(){
    if(this.activeStep > 0){
      this.activeStep = this.activeStep - 1 ;
    }
  }

  openLCPreview(){
    if (this.loyalty_card) {
      if (!this.loyalty_card.business){
        this.loyalty_card.business = {
          logo: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
        }
      }

      // this.displayLivePreview = !this.displayLivePreview
      //
      // console.log('Open LC preview', this.displayLivePreview)
      // // this.bottomSheet.open(LCPreviewBottomSheetComponent, {
      // //   data: {
      // //     loyalty_card: this.loyalty_card
      // //   }
      // // });

      if (this.previewState === "expanded"){
        this.changePreviewState("collapsed")
      } else {
        this.changePreviewState("expanded")
      }

    }
  }

  setCardTitle(){
    this.loyalty_card.card_title = this.formGeneralInfo.controls.card_title.value
  }

  setCardDescription(){
    this.loyalty_card.card_description = this.formDescription.controls.card_description.value
  }

  setBusiness(){
    if( this.formGeneralInfo.controls.business_id.value) {
      this.loyalty_card.business = this.formGeneralInfo.controls.business_id.value
      this.loyalty_card.business_id = this.formGeneralInfo.controls.business_id.value.id
    }
  }

  setAppearance(){
    console.log("Form", this.formAppearanceInfo.value);
    if (this.formAppearanceInfo.controls.bg_color.value){
      this.loyalty_card.bg_color = this.formAppearanceInfo.controls.bg_color.value
    }
    if (this.formAppearanceInfo.controls.heading_font_size.value){
      this.loyalty_card.heading_font_size = this.formAppearanceInfo.controls.heading_font_size.value
    }
    if (this.formAppearanceInfo.controls.heading_font_color.value){
      this.loyalty_card.heading_font_color = this.formAppearanceInfo.controls.heading_font_color.value
    }
    if (this.formAppearanceInfo.controls.font_color.value){
      this.loyalty_card.font_color = this.formAppearanceInfo.controls.font_color.value
    }
    if (this.formAppearanceInfo.controls.font_size.value){
      this.loyalty_card.font_size = this.formAppearanceInfo.controls.font_size.value
    }
    if (this.formAppearanceInfo.controls.font_family.value){
      this.loyalty_card.font_family = this.formAppearanceInfo.controls.font_family.value
    }
    console.log("LC", this.loyalty_card);
  }


  changePreviewState(state: string){
    this.previewState = state
  }


  xDown = null;
  yDown = null;
  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };
  handleTouchMove(evt: any) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
        } else {/* right swipe */
          console.log('right!');
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
          this.changePreviewState('expanded')
        } else { /* down swipe */
          console.log('Down!');
          switch (this.previewState) {
            case 'expanded' : {
              this.changePreviewState('collapsed');
              break
            }
            case 'collapsed' : {
              this.changePreviewState('hidden');
              break
            }
          }
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };


  stepForward(): any {

    if (this.activeStep < (this.steps.length - 1)){
      if (this.activeStep === 0) {
        if (this.formGeneralInfo.invalid) {
          this.formGeneralInfo.markAllAsTouched();
          return;
        }
      }
      if (this.activeStep === 1) {
        if (this.formDescription.invalid) {
          this.formDescription.markAllAsTouched();
          return;
        }
      }
      if (this.activeStep === 2) {
        if (this.bg_type === 'img') {
          if (! this.loyalty_card.bg_img){
            this.snackbarService.openSnackBar('Please upload a custom background image for the loyalty card')
            return;
          }
        }
        if (this.bg_type === 'color') {
          if (! this.formAppearanceInfo.controls.bg_color.value){
            this.snackbarService.openSnackBar('Please select background color for the loyalty card')
            return;
          }
        }

        if (!this.formAppearanceInfo.valid){
          this.formAppearanceInfo.markAllAsTouched();
          return;
        }
        this.activeSubStep = 0
      }

      if (this.activeStep === 3){
        if (this.activeSubStep === 0){
          if (!this.loyalty_card.logo){
            this.snackbarService.openSnackBar('Please upload a logo for the loyalty card')
            return;
          }
          if( this.loyalty_card.card_type === 'prize') {
            this.activeSubStep = 1;
          } else {
            this.activeStep = 4
          }

          return
        }

        if (this.activeSubStep === 1){
          if (!this.loyalty_card.redemption_img){
            this.snackbarService.openSnackBar('Please upload a redemption image for the loyalty card')
            return;
          }

          this.activeStep = 4
          return
        }

      }

      if(this.activeStep === 4) {
        if (this.loyalty_card.card_type === 'prize'){
          if (this.formRewards.invalid){
            this.formRewards.markAllAsTouched();
            return
          }
        }

        if (this.loyalty_card.card_type === 'prize'){
          return this.saveLoyaltyCard();
        }
      }

      if(this.activeStep === 5) {


        if (this.formRewards.invalid){
          console.log('Form rewards invalid', this.formRewards.value)
          this.formRewards.markAllAsTouched();
          return
        }
        if (this.rewards.length < 1){
          this.snackbarService.openSnackBar('Please add at least one reward with message')
          return
        }


        return  this.saveLoyaltyCard()
      }


      if (this.activeStep !== 3){
        this.activeStep = this.activeStep + 1 ;
      }

    } else {
      this.saveLoyaltyCard();
    }
  }


  setLogo($event: string[]) {
    console.log('Event from uploader', $event)
    if ($event[0]){
      this.logo = $event[0]
      this.loyalty_card.logo = this.logo
    }
  }

  setBackgroundImg($event: string[]) {
    console.log('Event from uploader', $event)
    if ($event[0]){
      this.bg_images[0] = $event[0]
      this.loyalty_card.bg_img = this.bg_images[0]
    }
  }

  setRedemptionImg($event: string[]) {
    console.log('Event from uploader', $event)
    if ($event[0]){
      this.images[0] = $event[0]
      this.loyalty_card.redemption_img = this.images[0]
    }
  }
  setRedemptionImgFromIcon($event: string) {
    console.log('Event from icon selector', $event)
    if ($event){
      this.images[0] = $event
      this.loyalty_card.redemption_img = this.images[0]
    }
  }

  setLogoDisplayMode() {
    this.loyalty_card.display_logo = this.displayLogo
  }
}
