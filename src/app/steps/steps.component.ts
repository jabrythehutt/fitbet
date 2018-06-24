import { Component, OnInit } from '@angular/core';
import {FitbitService} from "../fitbit.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  steps: number;
  constructor(private fitbitService: FitbitService) { }

  ngOnInit() {
    this.initialiseSteps();
  }

  async initialiseSteps() {
    const startDate = new Date();
    this.steps = await this.fitbitService.getSteps(startDate, startDate);
  }

}
