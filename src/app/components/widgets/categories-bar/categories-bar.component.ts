import {
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Category} from "../../../models/Cat";
import {Router} from "@angular/router";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  selector: 'app-categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoriesBarComponent),
      multi: true,
    }
  ]
})
export class CategoriesBarComponent implements OnChanges, OnInit {
  touchstartX = 0;
  touchendX = 0;

  swipeClass: String = '' ;
  categoriesChunks = [] ;

  @Output() selected: EventEmitter<Category> = new EventEmitter<Category>()
  @Input() customActionOnSelect: boolean = false

  @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
    this.swipeClass = '' ;
    this.touchstartX = event.changedTouches[0].screenX;
    console.log('component is touch start', this.touchstartX);
  };
  @HostListener('touchend', ['$event']) onTouchEnd(event: any) {
    this.touchendX = event.changedTouches[0].screenX;

    console.log('component is touch end', this.touchendX);
    this.checkSwipeDirection();
  }

  deviceWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDeviceWidth();
  }



  @Input() route: any;
  @Input() parentCatID: any = '' ;
  @Input() categories: any = [] ;
  @Input() listingType: string = 'business';
  @Input() domID: string | undefined ;

  routePrefix: string = '' ;

  slider: any = {
    currentPosition: 0 ,
    max: 0 ,
    min: 0,
    items: []
  }

  constructor(
    private catService: CategoryService,
    private elementRef:ElementRef ,
    private router: Router,
    private dbService: NgxIndexedDBService
  ) {



  }

  isMobile(){
    if (this.deviceWidth <= 480){
      return true;
    }
    return false;
  }


  setDeviceWidth() :void{
    this.deviceWidth = window.innerWidth;
  }


  async getCategories() {

    this.categories = [] ;

    this.dbService.getAll("categories").subscribe((storeData) => {
      this.categories = storeData
    })

    const resp = await this.catService.getCategories(this.parentCatID).toPromise();

    console.log("From child catbar component "+this.parentCatID, resp);

    let itemCount = 0 ;
    if(this.isMobile() === true){
      itemCount = 2 ;
    } else {
      itemCount = 8 ;
    }

    this.categories = resp ;



    if(this.categories){

      // this.dbService.clear('categories').subscribe((successDeleted) => {
      //   console.log('success? ', successDeleted);
      //   // this.dbService.bulkPut('categories', this.categories).subscribe((result) => {
      //   //   console.log('result: ', result);
      //   // });
      //
      //
      // });

      this.dbService.bulkPut('categories', this.categories).subscribe((storeData) => {
        console.log(storeData)
      })
      // this.categories.forEach((cat: any) => {
      //   console.log('catttt');
      //   console.log(cat)
      //   this.dbService.getDatabaseVersion().subscribe((version) => {
      //     console.log(version)
      //   })
      //
      //
      //   this.dbService
      //       .update('categories', {
      //         id: cat.id,
      //         icon: cat.icon,
      //         name: cat.name,
      //         parent_cat_id: cat.parent_cat_id,
      //         banner: cat.banner
      //       })
      //       .subscribe((storeData) => {
      //         console.log('storeData: ', storeData);
      //       });
      // });



      this.categoriesChunks = [] ;
      let count = 0 ;

      let arr: any[] = [] ;
      this.categories.forEach((obj: any) => {
        if(count >= itemCount){
          // @ts-ignore
          this.categoriesChunks.push(arr);
          arr = [] ;
          count = 0 ;
        } else {
          count = count + 1 ;
        }
        arr.push(obj);
      });

      this.slider.max = this.categoriesChunks.length ;

      console.log('cat chunks', this.categoriesChunks);
      this.setSliderPosition(0);

    }

    //  this.categoryOptions = resp ;

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCategories();
  }


  getSwipeClass() {
    return this.swipeClass;
  }

  ngOnInit(): void {

    this.setDeviceWidth();
    this.getCategories();

    // if(this.listingType === 'business'){
    //   this.routePrefix = '/business-results/';
    // } else {
    //   this.routePrefix = '/promotion-results/';
    // }
  }

  viewByCategory(cat: Category){
    if (!this.customActionOnSelect) {
      this.router.navigate(['/search-results'], {queryParams: {cat_id: cat.id, cat_name: cat.name}})
    } else {
      this.selected.emit(cat);
    }
  }

  nextSlide(){
    console.log('Test next',  this.categoriesChunks.length);
    this.setSliderPosition( this.slider.currentPosition + 1)
    this.swipeClass = 'swipe-right' ;

    console.log(this.slider.currentPosition);
  }

  prevSlide(){
    console.log('Test prev');
    this.setSliderPosition(this.slider.currentPosition - 1) ;
    console.log(this.slider.currentPosition);
    this.swipeClass = 'swipe-left' ;
  }

  setSliderPosition(position: number){
    if(position <= this.slider.min){
      position = 0;
    }
    if(position >= this.slider.max){
      position = 0;
    }
    this.slider.currentPosition = position;
    this.slider.items = this.categoriesChunks[position];
    if (this.slider.items && this.slider.items.length) {
      console.log(this.slider.items[0]);
    }
  }

  checkSwipeDirection() {
    if (this.touchendX < this.touchstartX) {
      console.log('Swipped left');
      this.scrollLeft()

    }
    if (this.touchendX > this.touchstartX) {
      console.log('Swipped right');
      this.swipeClass = 'swipe-right';
      this.scrollRight()
    }
  }

  scrollLeft() {
    console.log('scrolled left');
    try{
      // @ts-ignore
      document.getElementById('categoryBar').scrollLeft -=400
    } catch (e){
      console.log(e);
    }
  }

  scrollRight() {
    console.log('scrolled right');
    try{
      // @ts-ignore
      document.getElementById('categoryBar').scrollLeft +=400
    } catch (e){
      console.log(e);
    }
  }
}
