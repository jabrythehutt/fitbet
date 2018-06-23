import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatStepperModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CreateChallengeComponent
  ],
  imports: [
    MatStepperModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
