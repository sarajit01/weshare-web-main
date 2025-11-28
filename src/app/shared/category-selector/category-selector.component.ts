import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {CategoryService} from "../../services/category.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Category, CategorySlide} from "../../models/Cat";

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  isLoading: boolean = false
  @Input() alignment: string = "horizontal"
  @Input() categories: Category[] | undefined | null
  @Input() selectedCategories: Category[] = []
  @Output() onSelectedCategoriesChange = new EventEmitter<Category[]>()
  slides: CategorySlide[] = []
  activeSlideIndex: number = 0
  formSearch = this.fb.group({
    search: ['']
  });

  categoriesInAction: Category[] = []
  constructor(
      private categoryService: CategoryService,
      private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.categories) {
      this.categories = []
      this.getCategories(null);
    }
  }

  async getCategories(parentId: number | null | undefined) {
    let parent: number | string | undefined = ''
    if(parentId){
      parent = parentId
    }
    try {
      this.isLoading = true
      let resp;
      if(!this.formSearch.controls.search.value) {
         resp = await this.categoryService.getCategories(parent).toPromise();
      } else {
         resp = await this.categoryService.getCategories(parentId, this.formSearch.controls.search.value).toPromise();

      }

      console.log('Response from comp', resp);
      if(resp.length){
        this.categories = resp
        var slides = []
        var count = 0
        var slide: CategorySlide = {categories: []}

        // @ts-ignore
        this.categories.forEach((cat: Category) => {
          if (count == 8){
            count = 0
            slides.push(slide)
            slide = {categories: []}
          }
          slide.categories.push(cat);
          count = count + 1
        })

        slides.push(slide)
        this.slides = slides

      }

      // let cIndex = this.categoriesInAction.findIndex((cat: Category) => cat.id === parentId);
      // let shouldClear = false
      // this.categoriesInAction.forEach((cat: Category) => {
      //    if(cat.id == parentId){
      //      shouldClear = true ;
      //    }
      //    if(shouldClear){
      //      this.categoriesInAction.splice(this.categoriesInAction.findIndex((_cat: Category) => _cat.id == cat.id));
      //    }
      // });

      if(!parentId){
        this.categoriesInAction = []
      } else {
        var breads: Category[] = []
        var shouldStack = true
        var oldBreads: Category[] = this.categoriesInAction
        oldBreads.forEach((_cat: Category) => {
          if (shouldStack) {
            breads.push(_cat);
            console.log("breads", breads);
          }
          if (_cat.id === parentId) {
            shouldStack = false
          }

        });

        this.categoriesInAction = breads

      }

     // this.categoriesInAction = breads


    } catch ($ex) {

    } finally {
      this.isLoading = false
    }

  }

  nextSlide(){
    if(this.activeSlideIndex < (this.slides.length - 1)){
      this.activateSlide(this.activeSlideIndex + 1)
    }
  }

  prevSlide(){
    if (this.activeSlideIndex > 0){
      this.activateSlide(this.activeSlideIndex - 1)
    }
  }

  activateSlide(index: number){
    if(this.slides[index]){
      this.activeSlideIndex = index
    }
  }


  xDown = null;
  yDown = null;
  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };

  swippedLeft: boolean = false
  handleTouchMove(evt: any) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
          // @ts-ignore
          this.swippedLeft = true
          this.nextSlide()
        } else {/* right swipe */
          this.swippedLeft = false
          console.log('right!');
          this.prevSlide()
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
        } else { /* down swipe */
          console.log('Down!');

        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };

  selectCategory(selection: Category){
    if (!selection.parent_cat_id) {
      this.categoriesInAction = [];
    }
    if (selection.sub_count !== undefined && selection.sub_count !== null && selection.sub_count > 0) {
      this.categoriesInAction.push(selection)
      this.getCategories(selection.id)
    }
    let sIndex = this.selectedCategories.findIndex((cat: Category) => cat.id === selection.id);
    if (sIndex === -1) {
      this.selectedCategories.push(selection)
      this.onSelectedCategoriesChange.emit(this.selectedCategories);
    }

  }

  removeCategory(selected: Category) {
    let sIndex = this.selectedCategories.findIndex((cat: Category) => cat.id === selected.id);
    if (sIndex !== -1){
      this.selectedCategories.splice(sIndex)
     this.onSelectedCategoriesChange.emit(this.selectedCategories);
    }
  }
}
