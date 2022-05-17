import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormatPhoneNumberPipe} from "../../../../shared/pipes/format-number.pipe";
import {StripeService} from "../../../../core/services/stripe.service";
import {environment} from "../../../../../environments/environment";
import {ApiService, AuthService} from "../../../../core/services";
import {StytchLoginResponse} from "../../../../core/models";
import {of, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [FormatPhoneNumberPipe]
})
export class SigninComponent implements OnInit, OnDestroy {
  public phone: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(12)
  ]);
  public code: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6)
  ]);
  public isSent: boolean = false;

  private loginResponse: StytchLoginResponse;
  private destroy$: Subject<void> = new Subject<void>();
  private newUser: any;

  constructor(private readonly authService: AuthService,
              private readonly apiService: ApiService,
              private readonly stripeService: StripeService,
              private readonly FormatPhoneNumberPipe: FormatPhoneNumberPipe,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.phone.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.phone.setValue(
          this.FormatPhoneNumberPipe.transform(value),
          {emitEvent: false}
        );
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public sendOTPCode(): void {
    if (this.phone.valid) {
      this.isSent = true;
      // this.authService.loginOrCreate(this.getCorrectPhoneNumber())
      //   .subscribe((response: StytchLoginResponse) => {
      //     this.loginResponse = response;
      //     this.isSent = true;
      //   }, (response) => {
      //     console.log(response);
      //     alert(response.error.error.error_message)
      //   })
    }

    return;
  }

  public verifyOTPCode(): void {
    if (this.code.valid) {
      this.router.navigateByUrl('/add-card')
      // const phoneNumber = this.getCorrectPhoneNumber();
      // this.authService.verifyCode(this.loginResponse.phone_id, this.code.value.toString())
      //   .pipe(
      //     switchMap(() => {
      //       return this.apiService.findUserByPhone(phoneNumber)
      //     }),
      //     switchMap((users: any[]) => {
      //       if (users.length === 0) {
      //         return this.apiService.saveUserToAirtable(phoneNumber).pipe(
      //           switchMap((user: any) => {
      //             this.newUser = user;
      //             return this.stripeService.saveCustomer(phoneNumber)
      //           }),
      //           switchMap((customer: any) => {
      //             return this.apiService.updateUserInAirtable(this.newUser.id, {
      //               "Stripe Customer ID": customer.id
      //             })
      //           })
      //         )
      //       }
      //
      //       return of(users[0])
      //     })
      //   )
      //   .subscribe((user: any) => {
      //     localStorage.setItem('customer', JSON.stringify(user));
      //
      //     if (this.newUser) {
      //       this.router.navigateByUrl('/add-card')
      //     } else {
      //       this.router.navigateByUrl('/where')
      //     }
      //   }, (response: any) => {
      //     alert(response.error.error.error_message)
      //   })
    }
  }

  private getCorrectPhoneNumber(): string {
    return `+${environment.PHONE_CODE}${this.phone.value.replaceAll(' ', '')}`;
  }

}
