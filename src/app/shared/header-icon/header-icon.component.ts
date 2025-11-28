import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-icon',
  templateUrl: './header-icon.component.html',
  styleUrls: ['./header-icon.component.css']
})
export class HeaderIconComponent implements OnInit {
  @Input() img: any ;

  constructor() { }

  ngOnInit(): void {
  }
}
