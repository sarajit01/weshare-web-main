import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {SharePopupComponent} from "../shared/share-popup/share-popup.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private baseUrl = environment.api;

  constructor(private http : HttpClient , private authService : AuthService
  , private router: Router ,
              public route: ActivatedRoute,
              private bottomSheet: MatBottomSheet,


  ) { }

  saveBusiness(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-business', data);
  }
  saveLoyaltyCard(data: any ): Observable<any> {
    return this.http.put(this.baseUrl + 'loyalty-cards', data);
  }

  addBusinessUser(businessID: any, data: any ): Observable<any> {
    return this.http.put(this.baseUrl + 'business/'+businessID+'/users', data);
  }
  getBusinessUsers(businessID: any, search: String ): Observable<any> {
    return this.http.get(this.baseUrl + 'business/'+businessID+'/users?search='+search);
  }
  deleteBusinessUser(businessID: any, userId: any ): Observable<any> {
    return this.http.delete(this.baseUrl + 'business/'+businessID+'/users/'+userId);
  }
  sendInvitation(businessID: any, data: any ): Observable<any> {
    return this.http.put(this.baseUrl + 'business/'+businessID+'/invitations', data);
  }
  getInvitations(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'invitations/'+userID);
  }
  acceptInvitation(id: any): Observable<any> {
    return this.http.patch(this.baseUrl + 'invitations/'+id+'/accept', {});
  }
  deleteInvitation(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'invitations/'+id);
  }
  getDelegateAccess(userID: any): Observable<any> {
    return this.http.get(this.baseUrl + 'delegate-access/'+userID);
  }

  cloneBusiness(business_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'clone-business?business_id='+business_id);
  }
  cloneAd(ad_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'clone-business-ad?ad_id='+ad_id);
  }

  clonePromotion(promotion_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'clone-promotion?promotion_id='+promotion_id);
  }

  updateBusinessStatus(business_id: any , status: string ): Observable<any> {
    return this.http.get(this.baseUrl + 'update-business-status?business_id='+business_id + '&status='+ status);
  }

  savePromotion(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-promotion', data);
  }

  saveAd(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'create-ad', data);
  }

  saveNotification(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'create-notification', data);
  }

  getRandomAds(): Observable<any> {
    return this.http.get(this.baseUrl + 'random-ads');
  }

  getRandomListings(): Observable<any> {
    return this.http.get(this.baseUrl + 'random-listings');
  }

  getSearchResults(listingType: string | null, perPage: number): Observable<any> {
    let user_id = this.authService.getUserID();
    // @ts-ignore
    if (user_id === null || user_id === 0){
      user_id = ''
    }
    return this.http.get(this.baseUrl + `search-results?listing_type=${listingType}&perPage=${perPage}&user_id=${user_id}`);
  }

  getAdvancedSearchResults(listingType: string | null, search: string, country: string, city: string, cat_id: number | null, perPage: number): Observable<any> {
    return this.http.get(this.baseUrl + `search-results?listing_type=${listingType}&country=${country}&city=${city}&cat_id=${cat_id}&perPage=${perPage}&search=${search}`);
  }


  getRecentlyViewed(listingType: string): Observable<any> {
    if(! this.authService.isLoggedIn()) {
      return this.http.get(this.baseUrl + 'recently-viewed?listing_type='+listingType);
    }
    return this.http.get(this.baseUrl + 'recently-viewed?listing_type='+listingType+'&user_id='+this.authService.getUserID());
  }

  getListing(listing_type: string , user_id:any , search: string = '' , status: string = '' , sortBy: any = '', minPrice:any = '', maxPrice:any = ''): Observable<any> {
    return this.http.get(this.baseUrl + 'get-listings?listing_type='+listing_type+'&user_id='+user_id+'&status='+status+'&sort_by='+sortBy+'&min_price='+minPrice+'&max_price='+maxPrice+'&search='+search);
  }

  getListingWithLimit(listing_type: string, user_id: any, search: string = '', status: string = '', sortBy: any = '', minPrice: any = '', maxPrice: any = '', limit: any): Observable<any> {
    return this.http.get(this.baseUrl + 'get-listings?listing_type='+listing_type+'&user_id='+user_id+'&status='+status+'&sort_by='+sortBy+'&min_price='+minPrice+'&max_price='+maxPrice+'&limit=' + limit +'&search='+search);
  }
  getLCAll(user_id:any , search: string = ''): Observable<any> {
    return this.http.get(this.baseUrl + 'loyalty-cards?user_id='+user_id+'&search='+search);
  }

  getLC(lc_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'loyalty-cards/'+lc_id+'&user_id='+this.authService.getUserID());
  }

  deleteLC(lc_id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'loyalty-cards/'+lc_id+'&user_id='+this.authService.getUserID());
  }


  searchListing(listing_type: string , user_id:any , search: string = '' , status: string = '' , city: string = '', category_search: string = '',  sortBy: any = '', minPrice:any = '', maxPrice:any = ''): Observable<any> {
    return this.http.get(this.baseUrl + 'get-listings?listing_type='+listing_type+'&user_id='+user_id+'&status='+status+'&city='+city+'&cat_search='+category_search+'&sort_by='+sortBy+'&min_price='+minPrice+'&max_price='+maxPrice+'&search='+search);
  }

  similarListings(listing_type: string,listing_id: number, user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl + `similar-listings?listing_type=${listing_type}&listing_id=` + listing_id + `&user_id=${user_id}&page=` + page);
  }

  getPromotionDetails(id: any) : Observable<any> {
    return this.http.get(this.baseUrl + 'promotion-details?promotion_id='+id);
  }

  getBusinessDetails(id: any) : Observable<any> {
    if(!this.authService.isLoggedIn()){
      return this.http.get(this.baseUrl + 'business-details?business_id='+id);
    }
    return this.http.get(this.baseUrl + 'business-details?business_id='+id+'&user_id='+this.authService.getUserID());
  }

  getBusinessDetailsWithSharable(id: any, token: any) : Observable<any> {
    if(!this.authService.isLoggedIn()){
      return this.http.get(this.baseUrl + 'business-details?business_id='+id);
    }
    return this.http.get(this.baseUrl + 'business-details?business_id='+id+'&user_id='+this.authService.getUserID()+'&shared_token='+token);
  }

  getLoyaltyCardDetails(id: any) : Observable<any> {
    return this.http.get(this.baseUrl + 'loyalty-cards/'+id);
  }

  getUserBusinessNotifications(userID: any, search: string) : Observable<any> {
    return this.http.get(this.baseUrl + 'business/users/'+userID+'/notifications?search='+search);
  }

  getBusinessNotifications(businessID: any) : Observable<any> {
    return this.http.get(this.baseUrl + 'business/'+businessID+'/notifications');
  }

  getBusinessNotification(businessNotificationID: any) : Observable<any> {
    return this.http.get(this.baseUrl + 'business/notifications/'+businessNotificationID);
  }

  deleteBusinessNotification(businessNotificationID: any) : Observable<any> {
    return this.http.delete(this.baseUrl + 'business/notifications/'+businessNotificationID);
  }

  updateBusinessNotification(businessNotificationID: any, data: any) : Observable<any> {
    return this.http.patch(this.baseUrl + 'business/notifications/'+businessNotificationID, data);
  }



  getBusinessAdDetails(id: any) : Observable<any> {
    return this.http.get(this.baseUrl + 'business-ad-details?ad_id='+id);
  }


  deleteBusiness(business_id:any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-business?business_id='+ business_id);
  }
  deletePromotion(promotion_id:any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-promotion?promotion_id='+ promotion_id);
  }
  deleteBusinessAd(business_id:any ): Observable<any> {
    return this.http.get(this.baseUrl + 'delete-business-ad?business_ad_id='+ business_id);
  }
  promotionsPage(){
    this.router.navigate(['/promotions']);
  }

  addToFavorites(listing_id:any , listing_type: string , cat_id: any , user_id: any , token: any): Observable<any> {
    return this.http.get(this.baseUrl + 'add-to-favorites?listing_id=' + listing_id + '&listing_type=' + listing_type + '&cat_id=' + cat_id + '&user_id=' + user_id +'&shared_token='+ token);
  }

  getFavorites( listing_type: string ,  user_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'my-favorites?user_id=' + user_id + '&listing_type='  + listing_type );
  }

  getComments( listing_type: string ,  listing_id: any, scope: string, page: number ): Observable<any> {
    return this.http.get(this.baseUrl + 'comments?listing_id=' + listing_id + '&listing_type='  + listing_type + '&scope=' + scope + '&page=' + page );
  }

  getAllFavorites(user_id: any ): Observable<any> {
    return this.http.get(this.baseUrl + 'favorites?user_id=' + user_id);
  }

  deleteFavorite(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'delete-favorite' , data );
  }

  claimBusiness(userId: any , businessId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'claim-business?user_id='+userId+'&business_id='+businessId );
  }

  getBusinessClaims(): Observable<any> {
    return this.http.get(this.baseUrl + 'business-claims' );
  }

  approveBusinessClaim(claim_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'update-business-claim?claim_id='+claim_id );
  }

  sendContactMsg(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-message' , data );
  }

  replyContact(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'business-reply-message' , data );
  }


  getCustomerMessages(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'customer-messages?user_id=' +user_id );
  }

  getBusinessReplies(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'business-replies?user_id=' +user_id );
  }


  saveReview(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-review' , data );
  }

  saveAppointmentTime(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-booking-settings' , data );
  }
  saveBookingRequest(data: any ): Observable<any> {
    return this.http.post(this.baseUrl + 'save-booking-request' , data );
  }
  getBookingRequests(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'booking-requests?user_id=' +user_id );
  }

  getAppointments(user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'appointments?user_id=' +user_id );
  }

  approveBookingRequest(id: any): Observable<any> {
    return this.http.put(this.baseUrl + 'appointments/'+id , {} );
  }
  deleteBookingRequest(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'appointments/'+id);
  }

  // featured listings
  addFeaturedListings(data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'featured/listings', data);
  }
  getFeaturedListings(listingType: string, featuredType: string): Observable<any> {
    return this.http.get(this.baseUrl + 'featured/listings?listing_type='+listingType+'&featured_type='+featuredType);
  }
  removeFeaturedListing(featuredListingID: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'featured/listings/'+featuredListingID);
  }

  saveCustomerReward(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'save-customer-reward', data);
  }
  debitCustomerReward(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'debit-customer-reward', data);
  }
  getRewardedCustomers(business_id: any, reward_type: any): Observable<any> {
    return this.http.get(this.baseUrl + 'rewarded-customers?business_id='+business_id+'&reward_type='+reward_type);
  }
  getSharableLink(listing_type: string, listing_id: any, user_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sharable-link?listing_id='+listing_id+'&listing_type='+listing_type+'&user_id='+user_id);
  }


  getSharableScreenshots(listing_type: string, listing_id: any, bg: string): Observable<any> {
    return this.http.get(this.baseUrl + 'sharable-screenshots?listing_id='+listing_id+'&listing_type='+listing_type+'&bg='+ bg);
  }
  getSharableLinkWithToken(listing_type: string, listing_id: any, user_id: any, token: any, media: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sharable-link?listing_id='+listing_id+'&listing_type='+listing_type+'&user_id='+user_id+'&token=' + token + '&media_token='+media+'&media_type='+media);
  }
  getSharableLinkWithTokenAndMedia(listing_type: string, listing_id: any, user_id: any, token: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sharable-link?listing_id='+listing_id+'&listing_type='+listing_type+'&user_id='+user_id+'&token=' + token);
  }
  referrerByToken(token: string): Observable<any> {
    return this.http.get(this.baseUrl + 'referrer-by-token?shared_token='+token);
  }

  saveScreenshot(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'save-lc-screenshot', data);
  }
  saveSharableMedia(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'save-sharable-media', data);
  }
  // save-referral-reward-settings
  saveReferralRewardSettings(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'save-referral-reward-settings', data);
  }
  // business-referral-reward-settings/{business_id}
  getBusinessReferralRewardSettings(business_id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'business-referral-reward-settings/'+business_id);
  }
  // user reward history
  getRewardHistory(user_id: any,business_id: any, lc_id: any, reward_type: any): Observable<any> {
    return this.http.get(this.baseUrl + `user-rewards-history?business_id=${business_id}&user_id=${user_id}&reward_type=${reward_type}&lc_id=${lc_id}`);
  }

  getFrequentlyVisited(user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl + 'frequently-visited?user_id='+user_id+'&page='+page);
  }

  getBusinessesToRedemp(user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl + 'businesses-ready-to-reward?user_id='+user_id+'&page='+page);
  }

  getLCVisits(user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl + 'lc-visits?user_id='+user_id+'&page='+page);
  }

  getVisitsByLC(customer_id: any, lc_id: any): Observable<any>{
    return this.http.get(this.baseUrl + `visits-by-lc?customer_id=${customer_id}&lc_id=${lc_id}`)
  }

  // api/referred-users
  getReferredUsers(user_id: any, page: number): Observable<any> {
    return this.http.get(this.baseUrl + 'referred-users?user_id='+user_id+'&page='+page);
  }

  openSharePopup(listing: any, listingType: string) {
    this.bottomSheet.open(SharePopupComponent, {
      data:  {
        listing: listing,
        listing_id : listing.id,
        listing_type: listingType
      },
      panelClass: 'share-bottom-sheet',
    });
  }

}
