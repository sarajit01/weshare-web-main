import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute} from "@angular/router";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {PaymentService} from "../../services/payment.service";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pixelpay-payments',
  templateUrl: './pixelpay-payments.component.html',
  styleUrls: ['./pixelpay-payments.component.css']
})
export class PixelpayPaymentsComponent implements OnInit {


  progress = false ;
  deleteProgress = false ;
  payments: any = {data: [], current_page: 1}
  title = 'Pixelpay Payments';
  fileName= 'PixelPay Payments ExcelSheet.xlsx';

  searchForm = this.fb.group({
    // payment_id : [''],
    // business_name: [''] ,
    date_from: [''],
    date_to: [''],
    user_id: [''],
    status: [''],
    payment_method: ['']
  });

  constructor(
      private fb : UntypedFormBuilder ,
      private userService: UserService ,
      private snackbarService : SnackbarService ,
      private sweetAlert : SweetAlertService,
      private route : ActivatedRoute,
      private paymentService: PaymentService,

  ) { }

  ngOnInit(): void {
    this.getPaymentsHistory();
  }

  exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('payments-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  async getPaymentsHistory() {
    try {
      this.progress = true ;
      const resp = await this.paymentService.getTransactionHistory(this.searchForm.value).toPromise();
      console.log(resp);
      if(resp.data){
        this.payments = resp
      }
    } catch ($ex) {
      console.log($ex);
      this.snackbarService.openSnackBar('Something went wrong');
    } finally {
      this.progress = false ;
    }

  }


}
