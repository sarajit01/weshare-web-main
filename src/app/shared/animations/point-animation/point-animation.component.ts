import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-point-animation',
  templateUrl: './point-animation.component.html',
  styleUrls: ['./point-animation.component.css'],
  animations: [
    trigger('goldenStarBottomTop', [
      state('start',
          style({
            opacity: '0.7'
          })
      ),
      state('middle-start',
          style({
            opacity: '1'
          })
      ),
      state('middle-end',
          style({
            opacity: '0.5'
          })
      ),
      state('end',
          style({
            opacity: '0'
          })
      ),

      transition('start => middle-start', [animate('0.3s')]),
      transition('middle-start => middle-end', [animate('0.8s')]),
      transition('middle-end => end', [animate('0.2s')]),

    ])
  ]
})
export class PointAnimationComponent implements OnInit {

  position: string = 'start'
  animationInterval: any
  points!: number
  constructor() { }

  ngOnInit(): void {
    this.startAnimation();
  }

  startAnimation(){

    this.position === 'start';
    console.log('Start');



    setInterval(()=> {
      this.togglePosition()
    }, 200)

    // setTimeout(()=> {
    //   this.toggleGoldenStarAnimation();
    //   setTimeout(()=> {
    //     this.toggleGoldenStarPosition()
    //     setTimeout(()=> {
    //       this.toggleGoldenStarPosition()
    //     })
    //   }, 400)
    // }, 400)
  }

  togglePosition(){
    if (this.position === 'start'){
      this.position = 'middle-start'
    } else {
      if (this.position === 'middle-start'){
        this.position ='middle-end'
      } else if(this.position === 'middle-end'){
        this.position ='end'
        setTimeout(()=> {
          clearInterval(this.animationInterval);
          console.log('cleared')
          // this.goldenStarShouldAnimate = false;

        }, 300)
      }

    }

  }


}
