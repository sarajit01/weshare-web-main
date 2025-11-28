import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadService} from "../../../services/file-upload.service";
import {environment} from "../../../../environments/environment";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @Input() images: string[] | undefined
  @Input() img: string | undefined
  @Input() label: string = "Upload Image"
  @Input() multipleUpload: boolean = false

  @Output() dataChanged = new EventEmitter<string[]>()
  @Output() uploading = new EventEmitter<boolean>()

  files: any = []
  constructor(
      private uploadService: FileUploadService,
      private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    if (this.img){
      this.files.push({
        id: crypto.randomUUID(),
        url : this.img ,
        public_id: null,
        status: 'uploaded'
      })
    }

    if (this.images && this.images.length){
      this.images.forEach((img: string) => {
        this.files.push({
          id: crypto.randomUUID(),
          url : img ,
          public_id: null,
          status: 'uploaded'
        })
      })
    }
  }

  onAttempt(){
    // @ts-ignore
    document.getElementById('_upload-img').click()
  }

  async fileChanged(event: any) {
    var file = event.target.files[0];
    var id = crypto.randomUUID();


    if (!this.multipleUpload) {
      this.files = []
    }
    this.files.push({
      id: id,
      file: file,
      status: "pending"
    })
    let index = this.files.findIndex((file: any) => file.id === id);


    var reader = new FileReader();


    var img = this.img

     reader.onload = async function (e) {
      // @ts-ignore
      console.log(e.target.result);
      // @ts-ignore
      document.getElementById('selected-img-' + id).src = e.target.result

      //  $(spanID).html('Change Photo')

    };

    reader.readAsDataURL(event.target.files[0]);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


    try {
      let data = new FormData();
      if (index > -1) {
        this.files[index].status = "uploading"
        this.uploading.emit(true)
      }
      //  await sleep(10000);
      // if (index > -1) {
      //   this.files[index].status = "failed"
      // }
      data.append('file', file);
      data.append('upload_preset', environment.cloudinary.preset);

      let resp = await this.uploadService.upload(data).toPromise();
      console.log(resp);
      if (resp.secure_url) {
        if (index > -1) {
          this.files[index].url = resp.secure_url;
          this.files[index].status = "uploaded"
          this.dataChanged.emit(this.onDataChanged())
        }

      }


    } catch ($exception: any) {
      console.log($exception);
      if (index > -1) {
        this.files[index].status = "failed"
        this.dataChanged.emit(this.onDataChanged())

      }
    } finally {
      this.uploading.emit(false)
    }

  }

  uploadFile(index: number){

  }

  onDataChanged(){
    var imgs: string[] = [];

    this.files.forEach((file: any) => {
      if (file.url){
        imgs.push(file.url)
      }
    })
    return imgs
  }

}
