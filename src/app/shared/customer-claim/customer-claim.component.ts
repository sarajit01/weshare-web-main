import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-claim',
  templateUrl: './customer-claim.component.html',
  styleUrls: ['./customer-claim.component.css']
})
export class CustomerClaimComponent implements OnInit {

  @Input() claim: any ;

  business: any;

  constructor() { }

  ngOnInit(): void {
    if(this.claim){
      this.business = this.claim.business ;
    }
  }

}
