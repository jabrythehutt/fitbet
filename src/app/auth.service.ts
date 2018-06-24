import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import {parse as parseQuery} from 'querystring';
import {environment} from '../environments/environment';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0ClientId,
    domain: environment.auth0Domain,
    responseType: 'token id_token',
    audience: environment.auth0Audience,
    redirectUri: 'http://localhost:4200',
    scope: 'activity heartrate location nutrition profile settings sleep social weight'
  });

  constructor(public router: Router) {}

  public login(): void {
    const redirectUrl = `${location.protocol}//${location.host}`;
    window.location.href =
      `https://www.fitbit.com/oauth2/authorize?prompt=consent&response_type=token&redirect_uri=${redirectUrl}&login%2Fcallback&scope=profile%20activity%20heartrate%20location%20nutrition%20settings%20sleep%20social%20weight&state=5ckLbx_oArnM-b3qfd6ngUJYQ0i4zem0&client_id=22D2PP`
  }
  public handleAuthentication(): void {
    /*this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult);
        window.location.hash = '';
        this.setSession(authResult);
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.log(err);
      }
    });*/

    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const queryParams = parseQuery(hash);
      const accessToken = queryParams.access_token;
      const expiresIn = queryParams.expires_in;
      const expiresAt = new Date().getTime() + parseInt(expiresIn as string, 10) * 1000;
      this.setSession({
        accessToken,
        expiresAt
      });
    }

    window.location.hash = '';
  }

  private setSession(authResult): void {

    console.log("Setting session: "+ authResult);
    // Set the time that the Access Token will expire at
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', authResult.expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    location.reload();
    // Go back to the home route
   //  this.router.navigate(['/']);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
