import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-points-widget',
  templateUrl: './my-points-widget.component.html',
  styleUrls: ['./my-points-widget.component.css']
})
export class MyPointsWidgetComponent implements OnInit {

  @Input() user: any
  constructor() { }

  ngOnInit(): void {
  }

}
