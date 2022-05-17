import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable()
export class StripeService {

  constructor(private readonly http: HttpClient) {
  }

  public saveCustomer(phoneNumber: string): Observable<any> {
    const body = {
      'phone': phoneNumber,
    }

    return this.http.post<any>(`${environment.API_BASE_URL}/customers`, body).pipe(
      map((response: any) => response["data"])
    )
  }

  public saveCard(body: any): Observable<any> {
    return this.http.post(`${environment.API_BASE_URL}/payment/create`, body).pipe(
      map((response: any) => response["data"])
    )
  }
}
