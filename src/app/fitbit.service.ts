import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FitbitService {

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

  toDayString(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  getRequestHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`
    });
  }

  async getSteps(startDate: Date, endDate: Date): Promise<number> {
    const start = this.toDayString(startDate);
    const end = this.toDayString(endDate);
    const headers = this.getRequestHeaders();
   // const timeSeriesUrl = `${environment.fitbitApiBase}/1/user/-/activities/steps/date/${start}/${end}.json`;
    const timeSeriesUrl = `${environment.fitbitApiBase}/1/user/-/profile.json`;
    return new Promise<number>((resolve, reject) => {
      this.httpClient.get(timeSeriesUrl, {headers}).subscribe(response => {
        console.log(response);
        resolve(1);
      }, err => {
        console.log(err);
      });
    });

  }
}
