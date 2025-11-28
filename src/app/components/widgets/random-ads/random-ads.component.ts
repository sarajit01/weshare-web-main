import {Component, forwardRef, OnInit} from '@angular/core';
import {ListingService} from "../../../services/listing.service";
import {CategoryService} from "../../../services/category.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-random-ads',
  templateUrl: './random-ads.component.html',
  styleUrls: ['./random-ads.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RandomAdsComponent),
      multi: true,
    }
  ]
})
export class RandomAdsComponent implements ControlValueAccessor, OnInit {

  chunk:any[] = [];
  single:any ;
  constructor(private _listingService: ListingService) { }

  ngOnInit(): void {
    this.getRandomAds();
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  async getRandomAds() {

    const resp = await this._listingService.getRandomAds().toPromise();
    console.log("Ads r", resp);
    if(resp.chunk){
      this.chunk = resp.chunk ;
    }
    if(resp.single){
      this.single = resp.single ;
    }

  }

}
