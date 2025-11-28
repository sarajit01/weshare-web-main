import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-golden-star',
  templateUrl: './golden-star.component.html',
  styleUrls: ['./golden-star.component.css'],
  animations: [
    trigger('goldenStarBottomTop', [
      state('bottom-start',
          style({
            width: '10px',
            height: '10px',
            bottom: '20px',
            right: '40px'
          })
      ),
      state('middle',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
          })
      ),
      state('middle-rotated',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
            transform: 'rotateY(180deg)'
          })
      ),
      state('middle-default',
          style({
            width: '40px',
            height: '40px',
            bottom: '70px',
            right: '20px',
            transform: 'rotateY(0deg)'
          })
      ),

      state('top',
          style({
            width: '40px',
            height: '40px',
            bottom: '100px',
            right: '20px'
          })
      ),

      state('bottom-end',
          style({
            width: '10px',
            height: '10px',
            bottom: '20px',
            right: '40px'
          })
      ),
      transition('bottom-start => top', [animate('0.3s')]),
      transition('top => middle', [animate('0.2s')]),
      transition('middle => middle-rotated', [animate('0.3s')]),
      transition('middle-rotated => middle-default', [animate('0.3s')]),
      transition('middle-default => bottom-end', [animate('0.2s')]),

    ])
  ]
})
export class GoldenStarComponent implements OnInit {

  goldenStarPosition: string = 'bottom-start'
  animationInterval: any
  constructor() { }

  ngOnInit(): void {
    this.startGoldenAnimation();
  }

  startGoldenAnimation(){

    this.goldenStarPosition === 'bottom-start';
    console.log('Start');



    setInterval(()=> {
      this.toggleGoldenStarPosition()
    }, 400)

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

  toggleGoldenStarPosition(){
    if (this.goldenStarPosition === 'bottom-start'){
      this.goldenStarPosition = 'top'
    } else {
      if (this.goldenStarPosition === 'top'){
        this.goldenStarPosition ='middle'
      } else if(this.goldenStarPosition === 'middle'){
        this.goldenStarPosition ='middle-rotated'
      } else if(this.goldenStarPosition === 'middle-rotated'){
        this.goldenStarPosition ='middle-default'
      } else if(this.goldenStarPosition === 'middle-default'){
        this.goldenStarPosition ='bottom-end'
        setTimeout(()=> {
          clearInterval(this.animationInterval);
          console.log('cleared')
          // this.goldenStarShouldAnimate = false;

        }, 300)

      }

    }

  }


}
