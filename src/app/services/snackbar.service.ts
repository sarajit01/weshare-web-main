import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }


}
