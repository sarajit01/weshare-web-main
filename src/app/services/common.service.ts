import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  reload(miliseconds: number){
    setTimeout(() => {
      window.location.reload();
    }, miliseconds);
  }
}
