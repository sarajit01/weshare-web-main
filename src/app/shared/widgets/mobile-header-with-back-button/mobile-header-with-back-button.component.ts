import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-header-with-back-button',
  templateUrl: './mobile-header-with-back-button.component.html',
  styleUrls: ['./mobile-header-with-back-button.component.css']
})
export class MobileHeaderWithBackButtonComponent implements OnInit {

  @Input() heading: string = ""
  @Input() backUrl: string = "/"
  @Input() urlAction: boolean = true
  @Input() topIcon: string | null | undefined = undefined
  @Input() topBtnIcon: string | null | undefined = undefined
  @Input() topBtnLabel: string | null | undefined = undefined
  @Input() topBtnBg: string | null | undefined = undefined

  @Output() onBackPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTopIconPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTopButtonPressed: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() zIndex: number = 100000
  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  backPrev(){
    if(this.urlAction) {
      this.router.navigate([this.backUrl])
    } else {
      this.onBackPressed.emit(true)
    }

  }

  protected readonly undefined = undefined;
}
