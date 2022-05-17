import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {StripeService} from "../../../../core/services/stripe.service";
import {ApiService} from "../../../../core/services";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  public cardForm: FormGroup;
  public isComplete: boolean = false;

  private user: any = {}

  constructor(private readonly _fb: FormBuilder,
              private readonly router: Router,
              private readonly apiService: ApiService,
              private readonly stripeService: StripeService) {
  }

  ngOnInit(): void {
    this._initCardForm();
    this.user = JSON.parse(localStorage.getItem('customer'));
  }

  public saveCard(): void {
    // this.stripeService.saveCard(this._getCardInfo())
    //   .pipe(
    //     switchMap(() => {
    //       return this.apiService.updateUserInAirtable(this.user['id'], {
    //         'Card-on-File': true
    //       })
    //     }),
    //   )
    //   .subscribe(res => {
    //     this.isComplete = !this.isComplete;
    //
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/where')
    //     }, 2000)
    //   }, err => {
    //     console.log(err);
    //     alert(err.error.error.raw.message);
    //   })
  }

  private _getCardInfo(): any {
    const userCardInfo = this.cardForm.getRawValue();
    const [exp_month, exp_year] = userCardInfo.expiry.split('/')
    const customerId = this.user.fields['Stripe Customer ID'];

    return {
      customer: customerId,
      zip: userCardInfo.zip,
      card: {
        number: userCardInfo.number.replaceAll(' ', ''),
        exp_month: +exp_month,
        exp_year: 2000 + +exp_year,
        cvc: userCardInfo.cvc
      }
    };
  }

  private _initCardForm(): void {
    this.cardForm = this._fb.group({
      number: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(20)]),
      expiry: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
    })
  }

}
