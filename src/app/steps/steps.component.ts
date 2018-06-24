import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FitbitService} from "../fitbit.service";
import {ChallengeService} from "../challenge.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit, OnDestroy {
  steps: number;
  running: boolean;

  @Input()
  targetSteps: number;

  @Input()
  challengeIndex: number;

  constructor(private fitbitService: FitbitService, private challengeService: ChallengeService) { }

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
      if (this.steps >= this.targetSteps) {
        this.running = false;
        await this.challengeService.completeChallenge({numberOfSteps: this.steps, challengeIndex: this.challengeIndex});
      }
      await this.sleep(20000);
    }

  }

}
