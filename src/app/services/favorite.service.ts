import { Injectable } from '@angular/core';
import {ListingService} from "./listing.service";
import {AuthService} from "./auth.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NgxIndexedDBService} from "ngx-indexed-db";
import DBTableNames from "../schemas/dbTableNames.schema";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = environment.api;

  constructor(
    private http: HttpClient,
    private listingService : ListingService ,
    private authService : AuthService,
    private dbService: NgxIndexedDBService
  ) { }

  getFavoriteNotifications(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'customer/favorite-notifications/'+userID);
  }

  async delete(listing_type: string , listing_id:any ) {
    if(! this.authService.isLoggedIn()){
      Swal.fire(
        'Please login !',
        'Please login as customer perform the action !',
        'warning'
      )
    } else {

      try {
        const resp = await this.listingService.deleteFavorite({
          listing_type : listing_type ,
          listing_id : listing_id ,
          user_id : this.authService.getUserID()
        }).toPromise();
        console.log(resp);

        if (resp.success) {

          // delete favorite from indexedDB
          this.dbService.getAllByIndex( DBTableNames.favoritesDbTableName, 'listing_type', IDBKeyRange.only(listing_type)).subscribe((storeData) => {
            console.log(`All favorites of ${listing_type}: `, storeData);
            if (storeData && storeData.length){
              storeData.forEach((data: any) => {
                if (data.listing_id.toString() === listing_id.toString()){
                  this.dbService.deleteByKey(DBTableNames.favoritesDbTableName, parseInt(data.id)).subscribe((deletedData: any) => {
                    console.log('Successfully deleted from local DB', deletedData)
                  });
                }
              })
            }
          });

          Swal.fire(
            resp.success,
            '',
            'success'
          );


          setTimeout(() =>{
            window.location.reload();
          } , 2000);

          // callback() ;
        }

        if (resp.error) {
          Swal.fire(
            'Failed',
            resp.error,
            'warning'
          )
        }


      } catch ($ex) {

        console.log($ex);
        Swal.fire(
          'Failed',
          'Something went wrong !',
          'warning'
        )

      }
    }

  }




}
