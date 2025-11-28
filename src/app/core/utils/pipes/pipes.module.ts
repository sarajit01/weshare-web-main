import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBusinessPipe } from './search-business.pipe';
import { ApprovedPipe } from './approved.pipe';



@NgModule({
  declarations: [
    SearchBusinessPipe,
    ApprovedPipe
  ],
  exports: [
    SearchBusinessPipe,
    ApprovedPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
