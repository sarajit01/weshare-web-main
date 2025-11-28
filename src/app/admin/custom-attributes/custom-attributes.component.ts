import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ListingService} from "../../services/listing.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../services/auth.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {FileUploadService} from "../../services/file-upload.service";
import {IconService} from "../../services/icon.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-custom-attributes',
  templateUrl: './custom-attributes.component.html',
  styleUrls: ['./custom-attributes.component.css']
})
export class CustomAttributesComponent implements OnInit {
  cat_id: any;
  category: any = undefined ;
  attributes: any = [] ;
  isLoading = false ;

  form = this.fb.group({
    id: [''] ,
    name :  ['', [ Validators.required]] ,
    cat_id:  [''] ,
    input_type : [''] ,
  });


  constructor(
    private fb : UntypedFormBuilder ,
    private snackbarService : SnackbarService ,
    public authService : AuthService ,
    private iconService : IconService ,
    private catService : CategoryService ,
    private sweetAlert : SweetAlertService ,
    private route : ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.cat_id = paramMap.get('cat_id');
      this.getCat();
      this.getAttributes();
    });

  }

  async getCat() {
    try {
      this.isLoading = true;
      const resp = await this.catService.getCategory(this.cat_id).toPromise();
      console.log(resp);
      if (resp.category) {
        this.category = resp.category ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }


  async saveAttribute() {
    if(! this.form.valid){
      this.snackbarService.openSnackBar('All the fields are required');
      return ;
    }
    try {
      this.form.controls.cat_id.setValue(this.cat_id);
      this.isLoading = true;
      const resp = await this.catService.saveCustomAttribute(this.form.value).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlert.successNotification('Saved the attribute successfully',resp.success);
        this.getAttributes();
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }

  async getAttributes() {
    try {
      this.isLoading = true;
      const resp = await this.catService.getCustomAttributes(this.cat_id).toPromise();
      console.log(resp);
      if (resp.attributes) {
        this.attributes = resp.attributes ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }

  async deleteAttr(attr: any) {

    try {
      this.isLoading = true;
      const resp = await this.catService.deleteCustomAttribute(attr.id).toPromise();
      console.log(resp);
      if (resp.success) {
        this.snackbarService.openSnackBar(resp.success);
        this.getAttributes();
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.isLoading = false;
    }

  }



  editAttr(attr: any){
    this.form.controls.id.setValue(attr.id);
    this.form.controls.name.setValue(attr.name);
    this.form.controls.input_type.setValue(attr.input_type);
  }

  cancel(){
    this.form.reset();
  }

}
