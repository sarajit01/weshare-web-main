import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Pusher from "pusher-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  api_key = '2c1b281e3dea33e5365a'
  api_cluster = 'ap2'
  constructor(private http: HttpClient) {

    this.pusher = new Pusher(this.api_key, {
      cluster: this.api_cluster,
      // @ts-ignore
      encrypted: true
    });
     this.channel = this.pusher.subscribe('channel-weshare')
    console.log(this.channel)
  }
}
