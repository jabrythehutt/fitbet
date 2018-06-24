import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChallengeService} from '../challenge.service';
import {CreateChallengeRequest} from "../create.challenge.request";


@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {


  stepsFormGroup: FormGroup;
  amountFormGroup: FormGroup;
  startDateFormGroup: FormGroup;
  endDateFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  submitted: boolean;

  constructor(private _formBuilder: FormBuilder,
              private challengeService: ChallengeService) {

  }

  ngOnInit() {
    this.stepsFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.stepsFormGroup.setValue({firstCtrl: 20});

    this.amountFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // 1e16 = 0.01ETH
    this.amountFormGroup.setValue({secondCtrl: 1e16});
    this.startDateFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    const now = new Date();
    this.startDateFormGroup.setValue({thirdCtrl: now.toISOString().substring(0, 16)});

    this.endDateFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    // Add 1 minute from now
    const then = new Date(now.getTime() + (60 * 1000));
    this.endDateFormGroup.setValue({fourthCtrl: then.toISOString().substring(0, 16)});
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  async submitChallenge() {
    const numberOfSteps = this.stepsFormGroup.getRawValue().firstCtrl;
    const value = this.amountFormGroup.getRawValue().secondCtrl;
    const startDate = new Date(this.startDateFormGroup.getRawValue().thirdCtrl);
    const endDate = new Date(this.endDateFormGroup.getRawValue().fourthCtrl);
    const request: CreateChallengeRequest = {
      startDate,
      endDate,
      numberOfSteps,
      value
    };
    this.submitted = true;
    await this.challengeService.createChallenge(request);
  }

}
