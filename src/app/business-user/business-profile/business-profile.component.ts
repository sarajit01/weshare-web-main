import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
