import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Step} from "../../../models/Step";

@Component({
  selector: 'app-my-stepper',
  templateUrl: './my-stepper.component.html',
  styleUrls: ['./my-stepper.component.css']
})

export class MyStepperComponent implements OnInit {

  @Input() steps: Step[] = []
  @Input() activeStep: number = 0
  @Output() stepClicked = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onStepClicked(step: number): void {
    this.stepClicked.emit(true)
  }
}
