import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-referral-network-widget',
  templateUrl: './referral-network-widget.component.html',
  styleUrls: ['./referral-network-widget.component.css']
})
export class ReferralNetworkWidgetComponent implements OnInit {

  title: string = ""
  networkUsers: any = [
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
  ]
  constructor(
      public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
