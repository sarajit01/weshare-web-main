import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lcrewards-table',
  templateUrl: './lcrewards-table.component.html',
  styleUrls: ['./lcrewards-table.component.css']
})
export class LCRewardsTableComponent implements OnInit {

  @Input() loyaltyCard: any
  @Input() customer: any
  constructor() { }

  ngOnInit(): void {
    if (this.loyaltyCard && this.customer){
      if (this.loyaltyCard.rewards && this.loyaltyCard.rewards.length > 0) {
        this.loyaltyCard.rewards.forEach((reward: any) => {
          if (this.customer.points && this.customer.points > 0 && reward.points !== null && reward.points > 0){
            reward.progress_bar_width = ((this.customer.points/reward.points) * 100).toFixed(2)
            if (reward.progress_bar_width > 100){
              reward.progress_bar_width = 100 ;
            }
          } else {
            reward.progress_bar_width = 0 ;
          }

        })
      }
    }
  }

}
