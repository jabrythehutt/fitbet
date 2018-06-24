import {Component, OnDestroy, OnInit} from '@angular/core';
import {FitbitService} from "../fitbit.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit, OnDestroy {
  steps: number;
  running: boolean;
  constructor(private fitbitService: FitbitService) { }

  ngOnInit() {
    this.running = true;
    this.initialiseSteps();
  }

  ngOnDestroy() {
    this.running = false;
  }

  async sleep(period: number) {
    await new Promise(resolve => {
      setTimeout(resolve, period);
    });
  }

  async initialiseSteps() {

    const startDate = new Date();
    while (this.running) {
      this.steps = await this.fitbitService.getSteps(startDate, startDate);
      await this.sleep(20000);
    }

  }

}
