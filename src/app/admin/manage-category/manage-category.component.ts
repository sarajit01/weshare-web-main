import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ROUTES} from "../../core/routes";
import {ActivatedRoute, Router} from "@angular/router";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SnackbarService} from "../../services/snackbar.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categories: any;
  ROUTES = ROUTES ;
  parent_id = '' ;
  cat : any | undefined ;
  progress = false ;

  form = this.fb.group({
    search : ['']
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private catService : CategoryService ,
    private sweetAlert : SweetAlertService ,
    private  route : ActivatedRoute ,
    private router : Router ,
    private snackbarService : SnackbarService

  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.parent_id = params.parent_id || '';

          if(this.parent_id === ''){
            this.cat = undefined ;
          } else {
            this.getCat();

          }
          this.getCats();

        }
      );
  }

  async getCat() {
    try {
      const resp = await this.catService.getCategory(this.parent_id).toPromise();
      console.log(resp);
      if(resp.category){
        this.cat = resp.category ;
      }
    } catch ($ex) {
      console.log($ex);
    }

  }

  async getCats() {

    try {
      this.progress = true ;
      console.log(this.parent_id);
      const resp = await this.catService.getCategories(this.parent_id , this.form.controls.search.value).toPromise();
      console.log(resp);
      if (resp) {
        this.categories = resp ;
        console.log(this.categories);
      }

    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  subCats(id: any){
    this.router.navigate(['/admin/'+ROUTES.admin.category.root+'/'+ROUTES.admin.category.manage], { queryParams: { parent_id : id } });

  }

  deleteConfirmation(cat_id: any){
    Swal.fire({
      title: 'Are you sure to delete this category ?',
      text: 'All sub categories under this category will be deleted too !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {
        this.delete(cat_id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async delete(cat_id: any) {

    try {

      const resp = await this.catService.deleteCategory(cat_id).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweetAlert.successNotification('Deleted successfully !' , resp.success);
        this.getCats();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }

    } catch ($ex) {
      console.log($ex);
    }

  }


}
