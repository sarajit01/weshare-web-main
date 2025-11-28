import { Injectable } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  successNotification($event_name:string , $message: string){
    Swal.fire($event_name, $message, 'success')
  }

  errorNotification($event_name:string , $message: string){
    Swal.fire($event_name, $message, 'warning')
  }

}
