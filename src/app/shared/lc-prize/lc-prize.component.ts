import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lc-prize',
  templateUrl: './lc-prize.component.html',
  styleUrls: ['./lc-prize.component.css']
})
export class LcPrizeComponent implements OnInit {

  @Input() loyaltyCard: any
  constructor() { }

  ngOnInit(): void {
  }

}
