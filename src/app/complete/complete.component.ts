import {Component, Input, OnInit} from '@angular/core';
import {Web3Service} from '../web3.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  @Input()
  weiAmount: number;
  message: string;

  constructor(private web3Service: Web3Service) {

  }

  ngOnInit() {

    this.message = this.message = `Transferred ${this.weiAmount} to ${this.web3Service.accounts[0]}`;
  }

}
