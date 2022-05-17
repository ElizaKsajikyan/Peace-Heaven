import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {map, Observable, shareReplay} from "rxjs";


@Injectable()
export class ApiService {
  private cachedLocations$: Observable<any[]>;
  private cachedPersons$: Observable<any[]>;
  private cachedCategories$: Observable<any[]>;

  constructor(private readonly http: HttpClient) {
  }

  public getLocations(): Observable<any> {
    if (!this.cachedLocations$) {
      const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Location`;

      this.cachedLocations$ = this.http.get<any>(endpoint).pipe(
        map((res) => res["data"]["records"]),
        shareReplay(1)
      )
    }

    return this.cachedLocations$;
  }

  public getPersons(): Observable<any> {
    if (!this.cachedPersons$) {
      const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Person`

      this.cachedPersons$ = this.http.get<any>(endpoint).pipe(
        map((res) => res["data"]["records"]),
        shareReplay(1)
      )
    }

    return this.cachedPersons$;
  }

  public getCategories(): Observable<any> {
    if (!this.cachedCategories$) {
      const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Category`;

      this.cachedCategories$ = this.http.get<any>(endpoint).pipe(
        map((res) => res["data"]["records"]),
        shareReplay(1)
      )
    }

    return this.cachedCategories$;
  }

  public getProductsByFilter(query): Observable<any> {
    const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/JTB`;
    const params = {
      filterByFormula: `AND({Location}='${query.where}',{Person}='${query.with}',{Category}='${query.what}')`
    }

    return this.http.get<any>(endpoint, {params}).pipe(
      map((res) => res["data"]["records"]),
      shareReplay(1)
    )
  }

  public saveOrders(data: any, musHold: boolean): Observable<any> {
    const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Orders`;
    const body = {
      "records": [
        {
          "fields": {
            "Payload": data,
            "Hold for Monthly Order": musHold
          }
        }
      ],
      "typecast": true
    }

    return this.http.post(endpoint, body)
  }

  public saveUserToAirtable(phoneNumber: string): Observable<any> {
    const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Users`;

    const body = {
      "records": [
        {
          "fields": {
            "Phone Number": phoneNumber,
            "is_verified": true
          }
        }
      ],
    }

    return this.http.post(endpoint, body).pipe(
      map((res) => res["data"]["records"][0]),
    )
  }

  public updateUserInAirtable(userId: string, fields: any): Observable<any> {
    const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Users/${userId}`;

    const body = {
      "fields": fields
    }

    return this.http.patch(endpoint, body).pipe(
      map((res) => res["data"]),
    )
  }

  public findUserByPhone(phone: string): Observable<any> {
    const endpoint = `${environment.API_BASE_URL}/app9NIuryyfk5neIy/Users`;
    const params = {
      filterByFormula: `FIND(${phone},{Phone Number})`
    }
    return this.http.get(endpoint, {params}).pipe(
      map((res) => res["data"]["records"]),
    )
  }
}
