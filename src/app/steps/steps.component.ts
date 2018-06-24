import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FitbitService} from '../fitbit.service';
import {ChallengeService} from '../challenge.service';
import {Web3Service} from '../web3.service';
import {CreateChallengeRequest} from '../create.challenge.request';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit, OnDestroy {
  steps: number;
  running: boolean;

  @Input()
  challengeRequest: CreateChallengeRequest;

  @Input()
  targetSteps: number;

  @Input()
  challengeIndex: number;

  constructor(private fitbitService: FitbitService, private challengeService: ChallengeService,
              private web3Service: Web3Service) { }

  ngOnInit() {
    this.running = true;
    this.steps = 0;
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

  get progressWidth() {
    // return Math.max(Math.min(window.innerWidth, window.innerWidth) - 100, 0);
    return 400;
  }

  async initialiseSteps() {

    const startDate = new Date();
    while (this.running) {
      this.steps = await this.fitbitService.getSteps(startDate, startDate);
      if (this.complete) {
        this.running = false;
        await this.challengeService.completeChallenge({numberOfSteps: this.steps, challengeIndex: this.challengeIndex});
      }
      await this.sleep(20000);
    }

  }

  get complete(): boolean {
    return this.steps >= this.targetSteps;
  }

  get completeMessage() {
    return `Completed transferring ${this.challengeRequest.value} Wei to ${this.challengeRequest.beneficiaryName} (${this.web3Service.accounts[0]})`;
  }

}
