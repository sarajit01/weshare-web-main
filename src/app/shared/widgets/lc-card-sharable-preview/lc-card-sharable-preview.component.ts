import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-lc-card-sharable-preview',
  templateUrl: './lc-card-sharable-preview.component.html',
  styleUrls: ['./lc-card-sharable-preview.component.css']
})
export class LcCardSharablePreviewComponent implements OnInit {

  @Input() loyalty_card: any
  visitArray: any
  business: any
  constructor(
      public  authService: AuthService

  ) { }

  ngOnInit(): void {
    if(this.loyalty_card){
      if(this.loyalty_card.card_type === 'prize'){
        this.visitArray = new Array(parseInt(this.loyalty_card.visits_for_cash));
      }
      if(this.loyalty_card.business){
        this.business = this.loyalty_card.business ;
      }

    }

  }
}
