import {AfterViewInit, Component, ElementRef, Inject, Input, isDevMode, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ListingService} from "../../services/listing.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import html2canvas from "html2canvas";
import {environment} from "../../../environments/environment";
import {FileUploadService} from "../../services/file-upload.service";
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.css']
})
export class SharePopupComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('sharableCanvas') screen: ElementRef;
  // @ts-ignore
  // @ViewChild('canvas') canvas: ElementRef;
  // @ts-ignore
  // @ViewChild('downloadLink') downloadLink: ElementRef;

  listingType: any = this.data.listing_type ;
  listingID: any = this.data.listing_id ;
  listing: any = this.data.listing ;
  progress: boolean = this.data.progress
  base_uuid: string | null = null
  token_uuid: string | null = null
  media_uuid: string | null = null
  media: any
  link: any = null ;
  tokenObj: any = null
  sharableImgDimensions: any = {
    width: window.innerWidth,
    height: window.innerWidth
  }
  displayAvailableMedias = false;
  screenshotProgress = false
  sharableProgress = false
  step: number = 0 ;
  bgSelectOptions: string[] = [
      '0F3BCA6', '1VFA6DW', '2SUC9AF', '4DSWUA5', '5YVMCQ4', '6ZCV7LX', '9ZPCZX3'
  ]
  frameSelectOptions: string[] = [
      '7RVCXUZ', '1VFA6DW', '2SUC9AF', '4DSWUA5', '5YVMCQ4', '6ZCV7LX', '9ZPCZX3'
  ]

  redirectUri: string | undefined

  selectableNetworks: string[] = [ "Facebook", "Twitter", "WhatsApp", "Other" ];
  selectedNetwork: string | undefined
  networkShortCode: string | undefined = 'c'

  bgSelected: string = this.bgSelectOptions[0]
  frameSelected: string = this.frameSelectOptions[0]
  activeTab: string = 'bg' ;


  setActiveTab(tab: string){
    this.activeTab = tab
  }

  calculateRatio(){
    return 180;
  }

  getFrameWidth(){
    if (this.networkShortCode === 'fb'){
       return 65
    }
    if (this.networkShortCode === 'x'){
       return 75
    }
    return 90 ;
  }
  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private _bottomSheetRef: MatBottomSheetRef<SharePopupComponent>,
      private _bottomSheet: MatBottomSheet,
      public fb: UntypedFormBuilder,
      public authService: AuthService,
      public snackbarService: SnackbarService,
      private uploadService: FileUploadService,
      public listingService: ListingService,
      public platform: Platform
  ) {

    this.base_uuid  =  crypto.randomUUID()


  }

  onNetworkSelected(network: string){
    this.selectedNetwork = network
    this.setNetworkShortCode();
    this.setTokenUuid();
    this.getSharable(this.token_uuid, this.networkShortCode);
    this.step = 1;

   // this.setRedirectUri()
  }

  setNetworkShortCode(){
    if (this.selectedNetwork){
      switch (this.selectedNetwork.toLowerCase()){
        case 'facebook':
          this.networkShortCode = 'fb'
          break
        case 'twitter':
          this.networkShortCode = 'x' ;
          break
        case 'whatsapp':
          this.networkShortCode = 'wa' ;
          break
        default:
          this.networkShortCode = 'c' ;

      }
      console.log(this.networkShortCode)
    }
  }
  setTokenUuid(){
    this.token_uuid = this.bgSelected+'_'+this.frameSelected + '-' + this.base_uuid;
    this.setNetworkShortCode()
    this.link = environment.backend + `shared/${this.networkShortCode}/` + this.token_uuid;
    console.log(this.link)
   // this.setRedirectUri()
  }

  setRedirectUri(){
    if (this.selectedNetwork){
      switch (this.selectedNetwork.toLowerCase()){
        case "facebook":
          this.redirectUri = `https://www.facebook.com/sharer/sharer.php?u=${this.link}`
          break

        case "whatsapp":
          this.redirectUri = `whatsapp://send?text=${this.link}`
          break

        default:
          this.redirectUri = '' ;
      }
    }
  }

  closePopup(){
    this._bottomSheet.dismiss(true);
  }




  ngOnInit() {
    this.setTokenUuid();
    if (!isDevMode()) {
       this.getSharable(this.token_uuid, this.networkShortCode);
    }
  }

  onBgChange(option: string){
    this.bgSelected = option;
    this.setTokenUuid();
    this.getSharable(this.token_uuid, this.networkShortCode)
  }

  onFrameChange(option: string){
    this.frameSelected = option;
    this.setTokenUuid();
    this.getSharable(this.token_uuid, this.networkShortCode)
  }

  ngAfterViewInit() {
   // this.getSharableScreenshots()
  }


  async getSharable(token: any, media: any) {
    if(! this.authService.isLoggedIn()){
      this.snackbarService.openSnackBar('Please Login to share');
      return ;
    } else {

      console.log('Getting sharable linkkk');
      try {
        this.sharableProgress = true ;
        const resp = await this.listingService.getSharableLinkWithToken( this.listingType, this.listingID, this.authService.getUserID(), token, media).toPromise();
        console.log(resp);
        // if (resp.listing) {
        //   this.listing = resp.listing;
        // }
        if (resp.link) {
          this.link = resp.link;
        }
        if (resp.sharable) {
          this.tokenObj = resp.sharable;
        }
        if (resp.error) {
          this.snackbarService.openSnackBar(resp.error);
        }
      } catch ($ex) {
        console.log($ex);
        this.snackbarService.openSnackBar('Something went wrong to get the sharable link');

      } finally {
        this.sharableProgress = false ;
      }
    }

  }

  async getSharableScreenshots() {
    if(! this.authService.isLoggedIn()){
      this.snackbarService.openSnackBar('Please Login to share');
      return ;
    } else {

      console.log('Getting sharable linkkk');
      // try {
      //
      // //  const resp = await this.listingService.getSharableScreenshots( this.listingType, this.listingID, this.authService.getUserID()).toPromise();
      //   console.log(resp);
      //   // if (resp.listing) {
      //   //   this.listing = resp.listing;
      //   // }
      //   if (resp.screenshots && resp.screenshots.length > 0){
      //     this.getSharable(this.token_uuid, resp.screenshots[0].url)
      //   } else {
      //     this.getSharable(this.token_uuid, this.token_uuid);
      // //    this.screenshotProgress = true;
      //     this.takeScreenshot()
      //   }
      //
      // } catch ($ex) {
      //   console.log($ex);
      //   this.snackbarService.openSnackBar('Something went wrong to get the sharable link');
      //
      // } finally {
      //
      // }
    }

  }


  cancel() {
    this._bottomSheet.dismiss(true);
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
        } else { /* down swipe */
          console.log('Down!');
          this._bottomSheet.dismiss()
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };


  getQRCodeDataForBusiness(){
    let string = 'Listing Type:Business\nID:'+this.listing.id+'\nCustomer ID:'+this.authService.getUserID();

    // if(this..referrer_id){
    //   string = string + '\nReferrer ID:'+this.favorite.referrer_id ;
    // }

    return encodeURI(string);
  }

  getQRCodeDataPromo(){
    let string = 'Listing Type:'+this.listing.promotion_type+' '+this.listing.code+'\nID:'+this.listing.id+'\nCustomer ID:'+this.authService.getUserID();

    return encodeURI(string);
  }

  getQRCodeDataLC(){
    let string = 'Listing Type:LC\nID:'+this.listing.id+'\nCustomer ID:'+this.authService.getUserID();

    string = string+'\nReward type:'+this.listing.card_type;

    return encodeURI(string);
  }


  takeScreenshot(){
    // if(! this.loyalty_card.screenshot){
    //   this.captureLC();
    // }

    setTimeout(() => {
     // this.captureSharableMedia();
    }, 1000)

  }

  prepareCanvasScreenshot(){
    this.screenshotProgress = true;
    setTimeout(() => {

      this.captureSharableMedia();
    }, 1000)
  }

  captureSharableMedia(){
    html2canvas(this.screen.nativeElement, {
      allowTaint : true,
      useCORS: true,

      // width: document.getElementById('sharableCanvas')!.clientWidth,
      // height: document.getElementById('sharableCanvas')!.clientHeight,
      // scale: 1
    }).then(async canvas => {
      //  this.canvas.nativeElement.src = canvas.toDataURL();
      let uri = canvas.toDataURL("image/webp", 1);
    //  alert('Image generated ' + this.uuid);
      this.link = environment.backend + 'shared/' + this.token_uuid ;
      this.screenshotProgress = false


      let data = new FormData();

      data.append('file', uri);
      data.append('upload_preset', environment.cloudinary.preset);

      // @ts-ignore
      data.append('public_id', this.token_uuid);
      try {
        this.screenshotProgress = false;
        let resp = await this.uploadService.upload(data).toPromise();
        console.log(resp);
        if (resp.secure_url) {
       //   alert(resp.secure_url);
          console.log(resp.secure_url);
          this.media = resp.secure_url;
       //   await this.getSharable(this.media)
          //  await this.saveSharableCanvas(this.tokenObj.id, resp.secure_url);
        }
      } catch (ex: any) {

      } finally {
      }


      // this.downloadLink.nativeElement.download = 'marble-diagram.png';
      // this.downloadLink.nativeElement.click();
    });
  }


  async saveSharableCanvas(sharable_id: any,screenshot: string) {
    const resp = await this.listingService.saveSharableMedia({
      sharable_id: sharable_id,
      screenshot: screenshot

    }).toPromise();
    console.log('capture screenshot', resp);
    if (resp.success) {
      this.listing.screenshot = screenshot;
    }
  }
  async saveScreenshot(screenshot: string) {
    const resp = await this.listingService.saveScreenshot({
      business_id: this.listing.id,
      screenshot: screenshot

    }).toPromise();
    console.log('capture screenshot of LC', resp);
    if (resp.success) {
      this.listing.screenshot = screenshot;
    }
  }

  setStep(step: number){
    this.step = step;
    if (this.step === 1){
      this.takeScreenshot();
    }
  }


  shareViaApps() {
    navigator.share({
      url: this.link
    })
  }

  confirmShare(){

    if (this.selectedNetwork){
      switch (this.selectedNetwork.toLowerCase()){
        case "facebook":
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.link}`, '_blank');
          break

        case "whatsapp":
          window.open(`whatsapp://send?text=${this.link}`, '_blank');
          break

        case "twitter":
           window.open(` http://www.twitter.com/share?url=${this.link}`, '_blank');
           break

        default:
          this.redirectUri = '' ;
      }
    }

    window.open('http://www.smkproduction.eu5.org', '_blank');

  }

  goBack(){
    this.step = 0 ;
  }
}
