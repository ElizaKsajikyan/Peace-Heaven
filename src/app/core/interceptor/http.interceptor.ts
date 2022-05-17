import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from "../../../environments/environment";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {BASIC_LOGIN, BASIC_PASSWORD} = environment;
    const request = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${BASIC_LOGIN}:${BASIC_PASSWORD}`)
      })
    });

    return next.handle(request);
  }
}
