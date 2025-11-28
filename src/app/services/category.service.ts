import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService) { }

  getCategories(parent_id: any , search: string = ''): Observable<any> {
    return this.http.get(this.baseUrl + 'categories?parent_cat_id='+parent_id+'&search='+search);
  }

  getCategoriesByHint(hint: string = '', cat_id: number | string): Observable<any> {
    return this.http.get(this.baseUrl + 'categories?hint='+hint+`&cat_id=${cat_id}`);
  }

  getAllCategories(search: string =''): Observable<any> {
    return this.http.get(this.baseUrl + 'categories?all=1&search='+search);
  }


  getCategory(cat_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'cat-details?cat_id='+cat_id);
  }

  deleteCategory(cat_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-cat?cat_id='+cat_id);
  }

  save(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-category' , data);
  }

  saveCustomAttribute(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-custom-attribute' , data);
  }

  getCustomAttributes(cat_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'custom-attributes?cat_id='+ cat_id);
  }

  // delete-custom-attributes
  deleteCustomAttribute(id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-custom-attributes?id='+ id);
  }


  saveBanners(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-banner-gallery' , data);
  }

  getBanners(cat_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'banners?cat_id='+ cat_id);
  }


  deleteBanner(id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-banner?id='+ id);
  }



  update(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'update-category' , data);
  }




}
