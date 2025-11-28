import {
  ComponentRef,
  Injectable, ViewContainerRef
} from '@angular/core';
import {BSPopupComponent} from "../shared/bspopup/bspopup.component";
import {SharePopupContentComponent} from "../shared/share-popup-content/share-popup-content.component";

@Injectable({
  providedIn: 'root'
})
export class BSServiceService {
  containerRef: ViewContainerRef | undefined
  componentRef!: ComponentRef<SharePopupContentComponent>
  constructor(
      // public viewContainerRef: ViewContainerRef
  ) {
  }

  displayPopup(containerRef: ViewContainerRef, data: any){
    this.containerRef = containerRef
    this.containerRef.createComponent(BSPopupComponent)
    this.componentRef = this.containerRef.createComponent(SharePopupContentComponent)
    this.componentRef.instance.data = data
    this.componentRef.instance.onDismissed.subscribe((data: any) => {
      if (data){
        this.closePopup();
      }
    })

  }

  closePopup(){
    this.containerRef?.clear()
  }

}
