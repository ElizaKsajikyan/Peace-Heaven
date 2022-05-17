import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {StytchLoginResponse} from "../models";
import {map, Observable, tap} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  public loginOrCreate(phoneNumber: string): Observable<StytchLoginResponse> {
    const body = {
      'phone_number': phoneNumber,
    }

    return this.http.post<any>(`${environment.API_BASE_URL}/auth/otps/sms/send`, body).pipe(
      map((response: any) => response["data"])
    )
  }

  public verifyCode(methodId: string, code: string): Observable<any> {
    const body = {
      'code': code,
      'method_id': methodId,
    }

    return this.http.post<any>(`${environment.API_BASE_URL}/auth/otps/authenticate`, body).pipe(
      tap((response) => localStorage.setItem('stytch_session', JSON.stringify(response["data"]["session"]))),
      map((response: any) => response["data"])
    )
  }
}
