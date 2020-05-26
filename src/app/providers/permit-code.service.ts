import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data';
import { PermitCode } from '../interfaces/permit-code';
import { environment } from '../../environments/environment';

const PATH = "/permits";

@Injectable({
  providedIn: 'root'
})
export class PermitCodeService {
  constructor(public http: HttpClient, public user: UserData) {}

  async createPermitCode(reasonCode: string): Promise<PermitCode> {
    const token = await this.user.getToken();
    const payload = {
      reason: reasonCode,
    };

    console.log("POST " + environment.permitApiBase + PATH, payload);

    return this.http.post(
      environment.permitApiBase + PATH,
      payload,
      { headers: {
        Authorization: 'Bearer ' + token,
      }
    }).toPromise().then(response => {
      return response as PermitCode;
    });
  }
}
