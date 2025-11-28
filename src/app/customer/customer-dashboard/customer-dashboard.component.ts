import {Component, ComponentRef, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {FavoriteService} from "../../services/favorite.service";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames from "../../schemas/dbTableNames.schema";
import {PusherService} from "../../services/pusher.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {GoldenStarComponent} from "../../shared/animations/golden-star/golden-star.component";
import {PointAnimationComponent} from "../../shared/animations/point-animation/point-animation.component";
import {ThemeService} from "../../services/theme.service";

Chart.register(...registerables);

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  animations: [
    trigger('goldenStarAnimate', [
      transition('close => open', [
        animate('1s', keyframes([
          style({width: '10px', height: '10px', bottom: '20px', right: '40px'}),
          style({width: '40px', height: '40px', bottom: '100px', right: '20px'}),
          style({width: '40px', height: '40px', bottom: '70px', right: '20px'}),

          style({width: '10px', height: '10px', bottom: '20px', right: '40px'}),
        ])),
      ])
    ]),
    trigger('goldenStarBottomTop', [
      state('bottom-start',
          style({
            width: '10px',
            height: '10px',
            bottom: '20px',
            right: '40px'
          })
      ),
      state('middle',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
          })
      ),
      state('middle-rotated',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
            transform: 'rotateY(180deg)'
          })
      ),
      state('middle-default',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
            transform: 'rotateY(0deg)'
          })
      ),

      state('top',
          style({
            width: '40px',
            height: '40px',
            bottom: '100px',
            right: '20px'
          })
      ),

      state('bottom-end',
          style({
            width: '10px',
            height: '10px',
            bottom: '20px',
            right: '40px'
          })
      ),
      transition('bottom-start => top', [animate('0.3s')]),
      transition('top => middle', [animate('0.2s')]),
      transition('middle => middle-rotated', [animate('0.3s')]),
      transition('middle-rotated => middle-default', [animate('0.3s')]),
      transition('middle-default => bottom-end', [animate('0.2s')]),

    ])
  ]
})
export class CustomerDashboardComponent implements OnInit {

  favorites : any = [] ;
  similars : any = [] ;
  favoriteBusinesses: any = []
  favoritePromotions: any = []
  favoriteLcs: any = []
  progress: boolean = false
  starCompRef!: ComponentRef<GoldenStarComponent>
  pointCompRef!: ComponentRef<PointAnimationComponent>


  user: any;
  frequentlyVisited: any = []
  businessesToRedemp: any = []
  lcVisits: any = []

  appTheme: string | null | undefined = this.themeService.getAppTheme()


  appointmentRequests: any = [
    {
      name:'Johny De',
      email:'johny@guiderhn.com',
    },
    {
      name:'Xanna Sumy',
      email:'xanna@guiderhn.com',
    },
    {
      name: 'Rala Rohan',
      email: 'rala@guiderhn.com',
    },
    {
      name:'Alex Doe',
      email:'alex@guiderhn.com',
    }
  ];

  recentMessages: any = [
    {
      name:'Johny De',
      email:'Hi How are you',
    },
    {
      name:'Xanna Sumy',
      email:'We have an appointment today',
    },
    {
      name: 'Rala Rohan',
      email: 'Is the product available?',
    },
    {
      name:'Alex Doe',
      email:'I will reach tomorrow',
    }
  ];



  constructor(
    private listingService : ListingService ,
    public authService : AuthService,
    private userService: UserService,
    private favoriteService: FavoriteService,
    public dbService: NgxIndexedDBService,
    private pusherService: PusherService,
    private viewContainerRef : ViewContainerRef,
    private themeService: ThemeService,

  ) { }

  ngOnInit(): void {
    this.getFavoritesFromDB()
    this.getUserFromDb()
    this.getUserProfile();
    // this.getFrequentlyVisited(1);
    // this.getBusinessToRedemp(1);
    // this.getLCVisits(1);
    this.getAllFavorites(true);


    this.pusherService.channel.bind('lc_visit_' + this.authService.getUserID(), (data: any) => {
      console.log('Pusher data', data);
      setTimeout(() => {
        let lc = this.favoriteLcs.filter((x: any) => x && x.id.toString() === data.id.toString());
        console.log('Filtered LC', lc[0]);
        if (lc[0]){
          let index = this.favoriteLcs.indexOf(lc[0]);
          if (index >= 0){
            this.favoriteLcs[index].my_visits = data.my_visits
          }
        }
      }, 1500)
      setTimeout(() => {
        this.startStarAnimation(1)

      }, 2000)
      this.getAllFavorites(false)

    });
    this.pusherService.channel.bind('lc_reward_' + this.authService.getUserID(), (data: any) => {
      console.log('Pusher data', data);


      setTimeout(() => {
        let lc = this.favoriteLcs.filter((x: any) => x && x.id.toString() === data.id.toString());
        console.log('Filtered LC', lc[0]);
        if (lc[0]){
          let index = this.favoriteLcs.indexOf(lc[0]);
          if (index >= 0 && data.user_points){

            this.favoriteLcs[index].user_points = data.user_points
          }
        }
      }, 1500)
      setTimeout(() => {
        if (data.points_rewarded){
          this.startStarAnimation(data.points_rewarded)
        }

      }, 2000)

      this.getAllFavorites(false)

    });
  }

  changeAppTheme(theme: string){
    this.appTheme = theme ;
    this.themeService.setAppTheme(theme)

    setTimeout(()=> {
      window.location.reload()
    }, 1500)

  }

  getFavoritesFromDB(){
    this.dbService.getAll(DBTableNames.favoritesDbTableName).subscribe((storeData) => {
      if (storeData){
        console.log('favorites from DB',storeData)
         let dbData = storeData
         if (dbData && dbData !== this.favorites){
           console.log('Need to update in UI')
           this.favorites = dbData;
           this.updateUI();
         } else {
           console.log('Noting to update in UI')
         }

      }
    })
  }

  getUserFromDb(){
    this.dbService.getByID(DBTableNames.profileDbTableName, parseInt(this.authService.getUserID() || '0')).subscribe((storeData) => {
      console.log('User from DB')
      if (storeData){
        this.user = storeData

      }
    })
  }
  async getAllFavorites(updateUI: boolean) {

    const userId = this.authService.getUserID() ;

    try {
      this.progress = true
      const resp = await this.listingService.getAllFavorites(userId).toPromise();
      console.log(resp);
      if(resp.favorites){
        this.favorites = resp.favorites ;
        this.favorites.forEach((fav: any) => {
          this.dbService.update(DBTableNames.favoritesDbTableName, fav).subscribe((storeData) => {
            // do something
          })
        })

        if (updateUI) {
          this.getFavoritesFromDB()
        }
      }
      console.log('Home favorites', resp);

    } catch ($ex) {
      console.log($ex);

    } finally {
      this.progress = false
    }

  }

  async getFrequentlyVisited(page: number) {
    const userId = this.authService.getUserID() ;
    try {
      const resp = await this.listingService.getFrequentlyVisited(userId, 1).toPromise();
      console.log(resp);
      if(resp.data){
        this.frequentlyVisited = resp.data ;
      }
    } catch ($ex) {
      console.log($ex);

    }

  }

  async getBusinessToRedemp(page: number) {
    const userId = this.authService.getUserID() ;
    try {
      const resp = await this.listingService.getBusinessesToRedemp(userId, 1).toPromise();
      console.log(resp);
      if(resp.data){
        this.businessesToRedemp = resp.data ;
      }
    } catch ($ex) {
      console.log($ex);

    }

  }

  async getLCVisits(page: number) {
    const userId = this.authService.getUserID() ;
    try {
      const resp = await this.listingService.getLCVisits(userId, 1).toPromise();
      console.log(resp);
      if(resp.data){
        this.lcVisits = resp.data ;
      }
    } catch ($ex) {
      console.log($ex);

    }

  }




  async getUserProfile() {
    const userId = this.authService.getUserID() ;
    try {
      const resp = await this.userService.getDetails(userId).toPromise();
      console.log(resp);
      if(resp.user){
        this.dbService.update(DBTableNames.profileDbTableName, resp.user).subscribe((storeData) => {
          // do something
        })
        this.user = resp.user;
      }
    } catch ($ex) {
      console.log($ex);

    }

  }



  toggleGoldenStarAnimation(){
    //this.goldenStarShouldAnimate = !this.goldenStarShouldAnimate
  }


  private startStarAnimation(reward_points: any) {

    this.starCompRef = this.viewContainerRef.createComponent(GoldenStarComponent);
    this.pointCompRef = this.viewContainerRef.createComponent(PointAnimationComponent);
    this.pointCompRef.instance.points = reward_points

    setTimeout(() => {
      this.viewContainerRef.clear()
    }, 3500);
  }

  setScrollPosition($event: any) {
   // console.log('destroy event', $event)
  }



  updateUI(){
    this.favoriteBusinesses = []
    this.favoritePromotions = []
    this.favoriteLcs = []

    this.favorites.forEach((fav: any) => {
      if (fav.business){
        fav.business.favorite = fav
        this.favoriteBusinesses.push(fav.business)
      }
      if (fav.promotion){
        fav.promotion.favorite = fav
        this.favoritePromotions.push(fav.promotion)
      }
      if (fav.loyalty_card){
        fav.loyalty_card.favorite = fav
        this.favoriteLcs.push(fav.loyalty_card)
      }
    })

  }
}
