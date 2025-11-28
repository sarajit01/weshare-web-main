import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {CMSService} from "../../../services/cms.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailEditorComponent} from "angular-email-editor";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  progress: boolean = false ;
  countries: any[] = [] ;
  page_id: any = null ;
  page: any = null ;

  form = this.fb.group({
    id: ['', [Validators.required]],
    page_title : ['', [Validators.required]] ,
    page_content: ['', [Validators.required]] ,
    design_object: ['', [Validators.required]]
  });
  constructor(
    private fb : UntypedFormBuilder ,
    private _cmsService: CMSService,
    private _snackbarService: SnackbarService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.page_id = paramMap.get('id');
    });
  }

  async get() {
    try {
      this.progress = true ;
      let resp ;
      resp = await this._cmsService.get(this.page_id).toPromise();
      if(resp.id){
        this.page = resp ;
        this.form.controls.id.setValue(this.page.id);
        this.form.controls.page_title.setValue(this.page.page_title);
        // @ts-ignore
        this.emailEditor.loadDesign(JSON.parse(this.page.design_object));
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

  async save() {
    if(! this.form.valid){
      this._snackbarService.openSnackBar("Please correct all the fields");
      return;
    }
    try {
      this.progress = true ;
      let resp ;

      console.log('Page val', this.form.value);

      resp = await this._cmsService.edit(this.page_id, this.form.value).toPromise();
      if(resp.success){
        this._snackbarService.openSnackBar(resp.success);
        await this._router.navigate(['/admin/cms/pages']);
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

  title = 'angular-email-editor';

  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent | undefined;

  editorLoaded($event: any) {
    // load the design json here
    // @ts-ignore
    this.get();
    console.log('Editor loaded');
  }


  exportHtml() {
    // @ts-ignore
    this.emailEditor.editor.exportHtml((data) => {
      this.form.controls.design_object.setValue(data.design);
      this.form.controls.page_content.setValue(data.html);
      this.save();

    });
  }


}
