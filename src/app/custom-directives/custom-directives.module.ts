import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovableOnDragDropDirective } from './movable-on-drag-drop.directive';
import { CollapsableBottomSheetDirective } from './collapsable-bottom-sheet.directive';
import { BrandLogoDirective } from './brand-logo.directive';
import { FullScreenXYDirective } from './full-screen-xy.directive';
import { CollapsibeOnScrollEndedDirective } from './collapsibe-on-scroll-ended.directive';



@NgModule({
    declarations: [
        MovableOnDragDropDirective,
        CollapsableBottomSheetDirective,
        BrandLogoDirective,
        FullScreenXYDirective,
        CollapsibeOnScrollEndedDirective
    ],
    exports: [
        MovableOnDragDropDirective,
        CollapsableBottomSheetDirective,
        BrandLogoDirective,
        FullScreenXYDirective,
        CollapsibeOnScrollEndedDirective
    ],
    imports: [
        CommonModule
    ]
})
export class CustomDirectivesModule { }
