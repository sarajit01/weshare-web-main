import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../../services/snackbar.service";
import {CMSService} from "../../../services/cms.service";
import { EmailEditorComponent } from 'angular-email-editor';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  progress: boolean = false ;
  countries: any[] = [] ;

  form = this.fb.group({
    page_title : ['', [Validators.required]] ,
    page_content: ['', [Validators.required]] ,
    design_object: ['', [Validators.required]]
  });
  constructor(
    private fb : UntypedFormBuilder ,
    private _cmsService: CMSService,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {

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

      resp = await this._cmsService.create(this.form.value).toPromise();
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
