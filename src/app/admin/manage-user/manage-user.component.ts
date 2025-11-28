import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  progress = false ;
  deleteProgress = false ;

  role: string | undefined ;
  users : any = {
    data: []
  }

  searchForm = this.fb.group({
    search : ['']
  });

  constructor(
    private fb : UntypedFormBuilder ,
    private userService: UserService ,
    private snackbarService : SnackbarService ,
    private sweetAlert : SweetAlertService,
    private route : ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.role = paramMap.get('role') || 'business';
      this.getUsers(this.role);
    })
  }

  async getUsers(role: string) {
    try {
      this.progress = true ;
      const resp = await this.userService.getUsers(role , this.searchForm.controls.search.value).toPromise();
      console.log(resp);
      if(resp.users){
        this.users = resp.users ;
      }
    } catch ($ex) {

    } finally {
      this.progress = false ;
    }

  }

  deleteConfirmation(user_id: any){
    Swal.fire({
      title: 'Are you sure to delete this user ?',
      text: 'All data related to this user will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Delete',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.delete(user_id);

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async delete(user_id: any) {
    try {
      this.deleteProgress = true ;
      const resp = await this.userService.deleteUser(user_id).toPromise();
      console.log(resp);
      if(resp.success){
        this.sweetAlert.successNotification('User deleted !' , resp.success);
        await this.getUsers(this.role || 'business');
      }
      if(resp.error){
        this.sweetAlert.errorNotification('User could not be deleted !' , resp.error);
      }

    } catch ($ex) {
      this.sweetAlert.errorNotification('User could not be deleted !' , '');

    } finally {
      this.deleteProgress = false ;
    }

  }



}
