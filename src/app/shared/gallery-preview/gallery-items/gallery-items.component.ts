import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gallery-items',
  templateUrl: './gallery-items.component.html',
  styleUrls: ['./gallery-items.component.css']
})
export class GalleryItemsComponent implements OnInit {

  @Input() listing: any
  @Input() gallery: any

  @Output() selectedItem = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onItemSelect(key: any){
    this.selectedItem.emit(key)
  }

}
