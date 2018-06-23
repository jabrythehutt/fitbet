import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


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

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.stepsFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.stepsFormGroup.setValue({firstCtrl: 112345});

    this.amountFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.amountFormGroup.setValue({secondCtrl: 10000000});
    this.startDateFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    const now = new Date();
    this.startDateFormGroup.setValue({thirdCtrl: now.toISOString().substring(0, 16)});

    this.endDateFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    const then = new Date(now.getTime() + (2 * 60 * 1000));
    this.endDateFormGroup.setValue({fourthCtrl: then.toISOString().substring(0, 16)});
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

}
