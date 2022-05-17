import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {NavigationService, ApiService, DataShareService, AuthService} from "./services";
import {HttpTokenInterceptor} from "./interceptor/http.interceptor";
import {StripeService} from "./services/stripe.service";
import {LoggedInGuard} from "./guards/logged-in.guard";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    },
    AuthService,
    StripeService,
    NavigationService,
    ApiService,
    DataShareService,
    LoggedInGuard
  ]
})
export class CoreModule {
}
