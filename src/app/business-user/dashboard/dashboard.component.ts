import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {GraphService} from "../../services/graph.service";
import {ROUTES} from "../../core/routes";
import {UserStatisticsComponent} from "../../shared/common/user-statistics/user-statistics.component";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {ThemeService} from "../../services/theme.service";
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends UserStatisticsComponent implements OnInit {

  routes = ROUTES;
  activeC = 'business' ;
  appTheme: string | null | undefined = this.themeService.getAppTheme()

  defaultData = {
    labels : [] ,
    views: [] ,
    favorites: [] ,
    messages: [] ,
  };
  promotionData: any = {} ;
  businessData: any = {};
  displayCreationPopup: boolean = false;

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

  recentNotifications: any = [
    {
      name:'Johny De',
      email:'Sent a new message in business ( Awesome Dinners )',
    },
    {
      name:'Xanna Sumy',
      email:'Sent an appointment request in business ( Automobiles LTD )',
    },
    {
      name: 'Rala Rohan',
      email: 'Sent an appointment request in business ( Test Pizzas )',
    },
    {
      name:'Alex Doe',
      email:'Sent a new message in business ( Automobiles LTD )',
    },
    {
      name:'Johny De',
      email:'Sent a new message in business ( Pizza Italiana ) ',
    },
    {
      name:'Xanna Sumy',
      email:'Sent an appointment request in business ( Automobiles LTD )',
    },
  ]


  constructor(
    private _graphService: GraphService,
    public _userService: UserService,
    public _authService: AuthService,
    private themeService: ThemeService

  ) {
    super(_userService, _authService);
  }

  async ngOnInit(): Promise<void> {

    this.promotionData = this.defaultData;
    this.businessData = this.defaultData;
   // this.getStatistics();
   // await this.getGraphData('business');
   // await this.getGraphData('promotion');
   // setTimeout(this.initBusinessChart, 1000);


  }


  changeAppTheme(theme: string){
    this.appTheme = theme ;
    this.themeService.setAppTheme(theme)

    setTimeout(()=> {
      window.location.reload()
    }, 1500)

  }



  async getGraphData(listingType: any) {
    try {
      this.progress = true ;
      const resp = await this._graphService.getGraphData(listingType, this._authService.getUserID(), '', '').toPromise();
      console.log(resp);
      if(resp.labels){
        if(listingType === 'promotion'){
          this.promotionData = resp ;
          this.initPromoChart();
        }

        if(listingType === 'business'){
          this.businessData = resp ;
          this.initBusinessChart();
        }

      }

    } catch ($exception) {


    } finally {
      this.progress = false ;

    }
  }

  initBusinessChart(){

    var ctx = document.getElementById('businessChart');
    let labels = this.businessData.labels ;
    let data = {

      labels: labels,
      datasets: [{
        label: 'Views',
        data: this.businessData.views,
        fill: true,
        borderColor: 'rgb(15,178,193)',
        tension: 0.1
      } , {
        label: 'Favorites',
        data: this.businessData.favorites,
        fill: true,
        borderColor: 'rgb(83,118,221)',
        tension: 0.1
      } ,
        {
          label: 'Customer response / Messages',
          data: this.businessData.messages,
          fill: true,
          borderColor: 'rgb(214,35,133)',
          tension: 0.1
        }
      ]
    };

    // @ts-ignore
    var myChart = new Chart(ctx, {
      type: 'line',
      data: data

    });


  }

  initPromoChart(){
    var ctx2 = document.getElementById('promoChart');
    let labels2 = this.promotionData.labels ;
    let data2 = {

      responsive : true ,
      labels: labels2,
      datasets: [{
        label: 'Views',
        data: this.promotionData.views,
        fill: true,
        borderColor: 'rgb(15,193,193)',
        tension: 0.1
      } , {
        label: 'Favorites',
        data: this.promotionData.favorites,
        fill: true,
        borderColor: 'rgb(33,153,53)',
        tension: 0.1
      } ,
        {
          label: 'Customer response / Messages',
          data: this.promotionData.messages,
          fill: true,
          borderColor: 'rgb(184,14,196)',
          tension: 0.1
        }]
    };

    // @ts-ignore
    var myChart2 = new Chart(ctx2, {
      type: 'line',
      data: data2

    });
  };

  activateBusi(){

    this.activeC = 'business';
    setTimeout(this.initBusinessChart , 500);

  }
  activatePromo(){

    this.activeC = 'promo';
    setTimeout(this.initPromoChart , 500);

  }

  toggleCreationPopup(){
    this.displayCreationPopup = !this.displayCreationPopup ;
  }
}
