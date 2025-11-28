import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, Routes} from "@angular/router";
import {ROUTES} from "../../core/routes";
import {UserService} from "../../services/user.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {SiteSettingsService} from "../../services/site-settings.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ListingService} from "../../services/listing.service";
import {CityService} from "../../services/city.service";
import {TranslateService} from "@ngx-translate/core";
import {ThemeService} from "../../services/theme.service";
import {Platform} from "@angular/cdk/platform";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NotificationService} from "../../services/notification.service";
import {PusherService} from "../../services/pusher.service";
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  animations: [
    trigger('notifyBell', [
      transition('false => true', [
        animate('1s', keyframes([
          style({transform: 'rotateZ(-90deg)'}),
          style({transform: 'rotateZ(0deg)'}),
          style({transform: 'rotateZ(90deg)'}),
        ])),
      ])
    ]),
  ]
  // animations : [
  //     trigger('goldenStarShouldAnimate' , [
  //         transition('false => true', [
  //           animate('1s', keyframes([
  //             style({width: '10px', height: '10px', bottom: '20px', right: '40px'}),
  //             style({width: '40px', height: '40px', bottom: '100px', right: '20px'}),
  //             style({width: '40px', height: '40px', bottom: '70px', right: '20px'}),
  //
  //             style({width: '10px', height: '10px', bottom: '20px', right: '40px'}),
  //           ])),
  //         ])
  //     ])
  // ]
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  deviceWidth: any;
  deviceHeight: any;
  headerHeight: any;
  theme: any = {} ;
  url: string = "/"
  private previousScrollPosition = 0;
  role: string = ""
  excludeBottomBars = ["/business/dashboard", "/customer/my-favorites", "/customer/dashboard"]
  excludeTopBars = [ "/customer/my-favorites", "/sign-in",  "/sign-up/business", "/sign-up/customer"]
  excludeFooter = ["/business/dashboard", "/customer/my-favorites", "/business/loyalty-card/edit", "/business/loyalty-card/create"]

  displayAppInstaller: boolean = false


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDeviceWidth();
    this.setupSidebar();
  }
  listingUrls = [ "", "/", "/listings/business", "/listings/promotion", "/listings/TCF", "/listings/tcf" , "/search-results"];

  @ViewChild('header')
  header: ElementRef | undefined;

  onMiddleSectionScroll(event: Event) {

    console.log('User scrolling listings');

    if(this.isMobile() && this.listingUrls.includes(this.url.toLowerCase())) {

      var middleSectionWrapper =  document.getElementById('section-listings-wrapper');
      var mainContentWrapper =  document.getElementById('main-content-wrapper');
      // @ts-ignore
      const currentScrollPosition = middleSectionWrapper?.scrollTop  || 0;

      //  console.log("Current scroll position", currentScrollPosition);

      if (currentScrollPosition > this.previousScrollPosition) {
        if(currentScrollPosition > 30) {
          // Scrolling down
          // @ts-ignore
          document.getElementById('header').classList.add('d-none');
          // @ts-ignore
          document.getElementById('header').classList.remove('d-flex');
          // @ts-ignore
          document.getElementById('bottom-toolbar').classList.add('d-none');
          // @ts-ignore
          document.getElementById('bottom-toolbar').classList.remove('d-flex');

          mainContentWrapper?.classList.remove('mt-5');
        }

      } else if (currentScrollPosition < this.previousScrollPosition) {
        // Scrolling up
        // @ts-ignore
        document.getElementById('header').classList.add('d-flex');
        // @ts-ignore
        document.getElementById('header').classList.remove('d-none');
        // @ts-ignore
        document.getElementById('bottom-toolbar').classList.add('d-flex');
        // @ts-ignore
        document.getElementById('bottom-toolbar').classList.remove('d-none');

        mainContentWrapper?.classList.add('mt-5');

      }


      this.previousScrollPosition = currentScrollPosition;
    }
  }


  isMobile(){
    if (this.deviceWidth <= 600){
      return true;
    }
    return false;
  }

  progress = false;
  sidebar = false ;
  routes = ROUTES;
  new_notifications: number = 0

  searchBar: any = {
    cities : [] ,
    businesses: [] ,
    categories: [],
    visibility: true
  }

  formSearch = this.fb.group({
    search: [''],
    city: [''] ,
    category_search :  [''] ,
    city_search: [''] ,
    category_id :  [''] ,
  });


  constructor(
    private fb : UntypedFormBuilder ,
    public authService : AuthService ,
    public router : Router,
    public userService: UserService,
    public snackbarService: SnackbarService,
    public sweet: SweetAlertService,
    private _siteSettingsService: SiteSettingsService,
    private catService: CategoryService,
    private _listingService: ListingService,
    private _cityService: CityService,
    public translate: TranslateService,
    private themeService: ThemeService,
    public platform: Platform,
    private notificationService: NotificationService,
    private pusherService: PusherService


  ) {
    router.events.subscribe(val => {
      this.setDeviceWidth();
      this.setupSidebar();
      this.activateMenuBox('');
      this.activateSubMenu('');
      this.setUrl();
    });
  }

  setLang(lang: string){
    localStorage.setItem("user_lang", lang);
    window.location.reload();
  }

  ngOnInit(): void {
    this._siteSettingsService.initConfig();
    if(localStorage.getItem("role") !== null){
      // @ts-ignore
      this.role = localStorage.getItem("role");
    }
    this.setDeviceWidth();
    this.setDeviceHeight();
    this.setupSidebar();
    // this.getTheme();
   // this.getCategories();
   // this.getBusinessListings();
   // this.getCities();

    this.setUrl();

    this.subscribeToPusherEvents()

  }

  setUrl(){
    this.url = this.router.url ;
  }

  setDeviceWidth() :void{
    this.deviceWidth = window.innerWidth;
  }

  getDeviceHeight(){
    return window.innerHeight ;
  }

  setDeviceHeight() :void{
    this.deviceHeight = window.innerHeight;
  }

  setupSidebar(){
    if(this.isMobile()){
      this.hideSidebar();
      this.toggleSearchBar();
    } else {
      this.showSideBar();
    }
  }

  toggleSidebar(){

  }



  hideSidebar(){
    this.sidebar = false ;
  }

  showSideBar(){
    this.sidebar = true ;
  }

  toggleSearchBar(){
    this.searchBar.visibility = !this.searchBar.visibility;
  }

  setHeaderHeight(){
    // @ts-ignore
    this.headerHeight = this.header.nativeElement.offsetHeight + 19 ;
  }

  getMainContentContainerClass(): string{
    if(this.sidebar){
      return 'content-collapsed' ;
    } else {
      return 'content-expanded'
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

  async subscribeToPusherEvents(){
    this.pusherService.channel.bind('lc_visit_' + this.authService.getUserID(), (data: any) => {
      this.getNewNotificationsCount();
    });
    this.pusherService.channel.bind('lc_reward_' + this.authService.getUserID(), (data: any) => {
      this.getNewNotificationsCount();
    });
  }

  viewNotifications(){
    this.new_notifications = 0 ;
    this.router.navigate(['/' + this.authService.getRole() + '/notifications']);
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


  async getNewNotificationsCount() {
    try {
      this.progress = true;
      const resp = await this.notificationService.countNewNotifications(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.count) {
        this.startNotifyBellAnim();
        this.new_notifications = resp.count
      }
    } catch ($exception: any) {

    } finally {
      this.progress = false;

    }


  }

  getRole(){
    return this.authService.getRole();
  }

  navigate(link: string){
    this.router.navigate(['/'+link]);
  }

  headerStyle = {
  };
  headerIconStyle = {
  };
  headerBtnStyle = {
  };
  headerTextStyle = {
  };

  sidebarContainerStyle = {
    height: '100%',
    paddingBottom: '40px !important'
  };
  sidebarStyle = {
  };
  sidebarBtnStyle = {
  };
  sidebarTextStyle = {
  };

  contentStyle = {
  };
  contentBtnStyle = {
  };
  contentTextStyle = {
  };
  menuBoxActive: string = '';
  subMenuActive: string = '' ;


  search(){

    this.router.navigate(['/business-results/all'], { queryParams: { category: this.formSearch.controls.category_search.value , city:this.formSearch.controls.city_search.value , search: this.formSearch.controls.search.value }})
  }

  activateMenuBox(menu: string){
    if(this.menuBoxActive === menu){
      this.menuBoxActive = '' ;
    } else {
      this.menuBoxActive = menu ;
      this.subMenuActive = '' ;
    }
  }

  activateSubMenu(menu: string){
    if(this.subMenuActive === menu){
      this.subMenuActive = '' ;
    } else {
      this.subMenuActive = menu ;
    }
  }

 // theme_mode: string = this.themeService.getAppTheme()
  notifyBellShouldAnimate: boolean = false;

  activateTheme(mode: string){
    // this.theme_mode = mode ;
    // this.themeService.setAppTheme(mode);
    // this.activateSubMenu('');
    // this.activateMenuBox('');
  }

  goToBusiness(business: any){
    let businessName = business.business_name_prefix+" "+business.business_name;
    if(! business.business_name_prefix){
      let businessName = business.business_name;
    }
    this.formSearch.controls.search.setValue(businessName);
    this.navigate('business-details/'+business.id);
  }

  async getCategories() {

    const resp = await this.catService.getAllCategories( this.formSearch.controls.category_search.value).toPromise();
    this.searchBar.categories = resp;
  }

  async getBusinessListings() {
    try {

      const resp = await this._listingService.getListing('business','',this.formSearch.controls.search.value).toPromise();
      console.log(resp);
      if(resp.data){
        this.searchBar.businesses = resp.data ;

      }

    } catch ($ex: any) {

    }

  }

  async getCities() {
      console.log('Searching city '+this.formSearch.controls.city_search.value);
      const resp = await this._cityService.get(this.formSearch.controls.city_search.value).toPromise();

      if(resp.cities){
        this.searchBar.cities = resp.cities ;
        console.log('cities loaded', this.searchBar.cities);
      }

  }

  async getTheme() {
    try {
      this.progress = true ;
      const resp = await this._siteSettingsService.get().toPromise();
      if(resp.id){
        this.theme = resp ;
        console.log("Appearance", this.theme)

        localStorage.setItem("theme_header_padding", this.theme.header_padding);
        localStorage.setItem("theme_header_bg", this.theme.header_bg);
        localStorage.setItem("theme_header_text_color", this.theme.header_text_color);
        localStorage.setItem("theme_header_icon_bg", this.theme.header_icon_bg);
        localStorage.setItem("theme_header_icon_color", this.theme.header_icon_color);
        localStorage.setItem("theme_header_btn_bg", this.theme.header_btn_bg);
        localStorage.setItem("theme_header_btn_text_color", this.theme.header_btn_text_color);
        localStorage.setItem("theme_header_btn_font_size", this.theme.header_btn_font_size);
        localStorage.setItem("theme_sidebar_bg", this.theme.sidebar_bg);
        localStorage.setItem("theme_sidebar_padding", this.theme.sidebar_padding);
        localStorage.setItem("theme_sidebar_text_color", this.theme.sidebar_text_color);
        localStorage.setItem("theme_content_bg", this.theme.content_bg);
        localStorage.setItem("theme_content_heading_text_color", this.theme.content_heading_text_color);
        localStorage.setItem("theme_content_btn_bg", this.theme.content_btn_bg);
        localStorage.setItem("theme_content_btn_text_color", this.theme.content_btn_text_color);

        // @ts-ignore
      //  document.getElementById('header').style.background =  ;
        // @ts-ignore

      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;

      // @ts-ignore
      document.getElementById('header').style.padding = localStorage.getItem("theme_header_padding") ;

      this.headerStyle = {
        background: localStorage.getItem("theme_header_bg"),
        padding: localStorage.getItem("theme_header_padding"),
        color: localStorage.getItem("theme_header_text_color")
      }

      this.headerTextStyle = {
        color: localStorage.getItem("theme_header_text_color")
      }

      this.headerIconStyle = {
        background: localStorage.getItem("theme_header_icon_bg"),
        color: localStorage.getItem("theme_header_icon_color")
      }

      this.headerBtnStyle = {
        background: localStorage.getItem("theme_header_btn_bg"),
        color: localStorage.getItem("theme_header_btn_text_color"),
        'font-size' : localStorage.getItem("theme_header_btn_font_size")
      };

      this.sidebarStyle = {
      //  background: localStorage.getItem("theme_sidebar_bg"),
     //   padding: localStorage.getItem("theme_sidebar_padding"),
      //  color: localStorage.getItem("theme_sidebar_text_color"),
         'padding-left' : '20px' ,
       //  'padding-top' : '50px'

      }

      this.contentStyle = {
        background: localStorage.getItem("theme_content_bg"),
        height: 'fit-content'
      };

     // document.head.insertAdjacentHTML("beforeend", '<style type="text/css"> #header input { color: '+localStorage.getItem("theme_header_text_color")+' !important;} #header ::placeholder {color: '+localStorage.getItem("theme_header_text_color")+' !important; opacity: 0.8 } #section-search i { color:  '+localStorage.getItem("theme_header_text_color")+' !important; } #section-search mat-option { background:  '+localStorage.getItem("theme_header_bg")+' !important; color: '+localStorage.getItem("theme_header_text_color")+' !important;  } .sidebar {background-color: '+localStorage.getItem("theme_sidebar_bg")+' !important;}  #section-main button{background: '+localStorage.getItem("theme_content_btn_bg")+' !important; color: '+localStorage.getItem("theme_content_btn_text_color")+' !important; border-color: '+localStorage.getItem("theme_content_btn_bg")+' !important;} #section-main h3 {color: '+localStorage.getItem("theme_content_heading_text_color")+' !important;}</style>');

      this.sidebarTextStyle = {
        color: this.theme.sidebar_text_color
      }

    }

  }


  ngAfterViewInit(): void {


    this.setHeaderHeight();

  }


  activateMenuBoxWithSubmenu(activity: string, param2: string) {
    this.menuBoxActive = activity ;
    this.subMenuActive = param2 ;
  }

  headerVisible() {
    if (!this.isMobile()){
      return true
    }
    if (this.excludeTopBars.includes(this.url)){
      return false
    }
    return true
  }

  installApp() {

     this.displayAppInstaller = true

    // // @ts-ignore
    //
    // window.AddToHomeScreenInstance = new window.AddToHomeScreen({
    //   appName: 'Weshare',                                   // Name of the app.
    //   // Required.
    //   appIconUrl: 'assets/icons/apple-touch-icon.png',                    // App icon link (square, at least 40 x 40 pixels).
    //   // Required.
    //   assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.8/dist/assets/img/',  // Link to directory of library image assets.
    //                                                                                             // Required.
    //   showErrorMessageForUnsupportedBrowsers:
    //   // @ts-ignore
    //   window.AddToHomeScreen.SHOW_ERRMSG_UNSUPPORTED.ALL, // Show an error message if add-to-home-screen is not supported for this browser
    //                                                                                               // (e.g.  "adding to home screen is not supported in IOS Firefox, please open this [website] in IOS Safari instead." or "adding to home screen is not supported on desktop, please open this [website] in your mobile browser instead".  You can also set more granular permissions to show error messages only on mobile browsers and not on desktop browsers, etc)
    //                                                                                               // Optional. Default: window.AddToHomeScreen.SHOW_ERRMSG_UNSUPPORTED.ALL
    //   allowUserToCloseModal: true,                          // Allow user to close the 'Add to Homescreen' message? Not allowing will increase installs.
    //   // Optional. Default: false.
    //   maxModalDisplayCount: -1                               // If set, the modal will only show this many times.
    //                                                          // Optional. Default: -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
    // });
    //
    // // @ts-ignore
    // let ret = window.AddToHomeScreenInstance.show('en');        // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen

  }



  startNotifyBellAnim(){
    this.notifyBellShouldAnimate = true
    console.log(this.notifyBellShouldAnimate)

    setTimeout(() => {
      this.notifyBellShouldAnimate = false
    }, 1500)
  }



  // endNotifyBellAnim(){
  //   this.notifyBellShouldAnimate = false
  //   if (this.no)
  //   console.log(this.notifyBellShouldAnimate)
  // }
  toggleMainSidebar() {
    let sidebar = document.getElementById("section-collapse-sidebar");
    // @ts-ignore
    sidebar.classList.toggle("d-none");
  }
}
