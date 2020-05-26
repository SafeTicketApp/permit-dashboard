import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  STORAGE_JWT = 'accessToken';
  STORAGE_USERNAME = 'username';

  VALID_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJUT1VSSVNUSUMiLCJSRVNJREVOQ0UiXSwiaWF0IjoxNTkwNDQzOTY1fQ.2IZACDVqujgUMz7gJ2sItMCWDsV1a7fU2jp1_enzma4';

  constructor(
    public storage: Storage
  ) { }

  async fakeLogin(username: string, password: string): Promise<any> {

    const ask = window.confirm('login?');

    if (ask) {
      await this.storage.set(this.STORAGE_JWT, this.VALID_JWT);
      await this.setUsername(username);
      return Promise.resolve(username);
    } else {
      return Promise.reject('NOT_AUTHORIZED');
    }
  }

  login(username: string, password: string): Promise<any> {
    return this.fakeLogin(username, password).then(() => {
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.STORAGE_JWT).then(() => {
    }).then(() => {
      // TODO: delete me when in jwt
      this.storage.remove(this.STORAGE_USERNAME);
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  /**
   * temporary helper to save username, while not available in jwt
   * @param username username to save
   * TODO: delete me when in jwt
   */
  private setUsername(username: string) {
    return this.storage.set(this.STORAGE_USERNAME, username);
  }

  /**
   * * TODO: replace by getUsernameFromToken me when in jwt
   */
  getUsername(): Promise<string> {
    return this.storage.get(this.STORAGE_USERNAME);
  }

  getToken(): Promise<string> {
    return this.storage.get(this.STORAGE_JWT);
  }

  getUsernameFromToken(): Promise<string> {
    return this.storage.get(this.STORAGE_JWT).then((value: string) => {
      if (!value) {
        return Promise.reject('NO_JWT');
      }
      const body = value.split('.')[1];
      if (!body) {
        return Promise.reject('INVALID_JWT');
      }

      const jwt = JSON.parse(atob(body));
      if (jwt) {
        return jwt.sub;
      } else {
        return Promise.reject('NO_JWT');
      }
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.getUsername().then(username => username !== null);
  }
}
