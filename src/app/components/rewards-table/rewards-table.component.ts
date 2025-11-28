import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-rewards-table',
  templateUrl: './rewards-table.component.html',
  styleUrls: ['./rewards-table.component.css']
})
export class RewardsTableComponent implements OnInit {

  progress: boolean = false ;
  business_id: any  ;
  business : any ;
  rewards: any = [];
  levels: any = [] ;
  levels_tmp: any = [] ;
  constructor(
    private listingService : ListingService ,
    private route : ActivatedRoute,
    private sweet: SweetAlertService,
    private fb : UntypedFormBuilder ,
    private snackbar: SnackbarService
  ) { }

  formRewards = this.fb.group({
    business_id: [''],
    levels_count: ['', [Validators.required]],
    point_value: ['', [Validators.required]],
    customer_percent: ['', [Validators.required]],
    rewards : [],
    levels: []
  });



  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.business_id = paramMap.get('business_id');

      this.getBusinessDetails(this.business_id);
    });
    this.addReward();
  }



  addReward(){
    this.rewards.push({
      points: 0 ,
      message_for_customer : '',
    })
  }

  addRewardVal(points: any, msg: any){
    this.rewards.push({
      points: points ,
      message_for_customer : msg,
    })
  }

  addLevel(no: number, percent: any){
    this.levels.push({
      level: no ,
      reward_percent : percent,
    })
  }

  onLevelCountChange(){
    if(! this.formRewards.controls['levels_count'].value){
      return;
    }
    this.levels_tmp = this.levels ;
    this.levels = [] ;
    for(let i=1; i<= parseInt(this.formRewards.controls['levels_count'].value); i++ ){

      if(this.levels_tmp.findIndex((x: any) => x.no === i) !== -1){
        let ind = this.levels_tmp.findIndex((x: any) => x.level === i) ;
        let level_tmp = this.levels_tmp[ind];
        this.addLevel(i, level_tmp.reward_percent);
      } else {
        this.addLevel(i, '');
      }

    }
  }

  async getBusinessDetails(business_id: any) {
    this.progress = true ;
    try {
      const resp = await this.listingService.getBusinessDetails(this.business_id).toPromise();
      if (resp.business) {
        this.business = resp.business;
        this.formRewards.controls['business_id'].setValue(business_id);
        await this.getSettings();
      }
    } catch (e){

    } finally {
      this.progress = false ;
    }

  }

  async getSettings() {
    this.progress = true ;
    try {
      const resp = await this.listingService.getBusinessReferralRewardSettings(this.business_id).toPromise();
      if (resp.id) {
        if(resp.levels){
          this.levels = [] ;
          resp.levels.forEach((level: any) => {
            this.addLevel(level.level, level.reward_percent);
          })
          this.formRewards.controls['levels_count'].setValue(this.levels.length);
        }
        if(resp.rewards){
          this.rewards = [] ;
          resp.rewards.forEach((reward: any) => {
            this.addRewardVal(reward.points, reward.msg);
          })
          this.formRewards.controls['point_value'].setValue(resp.points_val);
          this.formRewards.controls['customer_percent'].setValue(resp.customer_reward_percent);

        }
      }
    } catch (e){

    } finally {
      this.progress = false ;
    }

  }

  async saveRewardSettings() {

    if(! this.formRewards.valid){
      this.snackbar.openSnackBar('All the fields are required');
      return;
    }
    this.formRewards.controls['business_id'].setValue(this.business_id);
    this.formRewards.controls['levels'].setValue(this.levels);
    this.formRewards.controls['rewards'].setValue(this.rewards);


    this.progress = true ;
    try {
      const resp = await this.listingService.saveReferralRewardSettings(this.formRewards.value).toPromise();
      if (resp.errors && resp.errors[0]) {
       this.snackbar.openSnackBar(resp.errors[0]);
      }
      if (resp.success) {
        this.snackbar.openSnackBar(resp.success);
      }
    } catch (e){
      console.log(e);
      this.snackbar.openSnackBar('Failed to save');

    } finally {
      this.progress = false ;
    }

  }


  async deleteBusinessUser(userId: any) {
    this.progress = true ;
    try {
      const resp = await this.listingService.deleteBusinessUser(this.business_id, userId).toPromise();
      if (resp.message) {
        this.sweet.successNotification("Business User deleted", resp.message);
      //  await this.getBusinessUsers();
      }
    } catch (e){

    } finally {
      this.progress = false ;
    }

  }


}
