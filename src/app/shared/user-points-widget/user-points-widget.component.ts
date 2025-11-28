import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-points-widget',
  templateUrl: './user-points-widget.component.html',
  styleUrls: ['./user-points-widget.component.css']
})
export class UserPointsWidgetComponent implements OnInit {

  @Input() user: any
  constructor() { }

  ngOnInit(): void {
  }


}
