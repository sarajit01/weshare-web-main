import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http : HttpClient) { }

  upload(data: any){
   return  this.http.post<any>('https://api.cloudinary.com/v1_1/'+environment.cloudinary.cloud_name+'/image/upload?api_key='+environment.cloudinary.api_key, data) ;
  }

  delete(public_id: string){
      return  this.http.post<any>('https://api.cloudinary.com/v1_1/'+environment.cloudinary.cloud_name+'/image/destroy?api_key='+environment.cloudinary.api_key, {
          public_id: public_id
      }) ;
  }

}
