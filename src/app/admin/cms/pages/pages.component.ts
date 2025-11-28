import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../../services/snackbar.service";
import {CMSService} from "../../../services/cms.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  progress: boolean = false ;
  pages: any[] = [] ;

  form = this.fb.group({
    search : ['', [Validators.required]]
  });
  constructor(
    private fb : UntypedFormBuilder ,
    private _cmsService: CMSService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPages();
  }

  async getPages() {
    try {
      this.progress = true ;
      const resp = await this._cmsService.getPages().toPromise();
      if(resp.pages){
        this.pages = resp.pages ;
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }

  async delete(id: any) {
    try {
      this.progress = true ;
      const resp = await this._cmsService.delete(id).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        this.getPages();
      }
      if(resp.error){
        this._snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;
    }

  }


}
