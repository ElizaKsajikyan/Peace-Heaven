import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable()
export class DataShareService {
  public cart: any = {};

  private checkoutState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private removeIndicatorFromProduct$: Subject<string> = new Subject<string>();

  constructor() {
  }

  public getCheckoutState(): boolean {
    return this.checkoutState$.getValue();
  }

  public getCheckoutStateAsObservable(): Observable<boolean> {
    return this.checkoutState$.asObservable()
  }

  public updateCheckoutState(state: boolean): void {
    this.checkoutState$.next(state)
  }

  public getRemoveProductIndicatorAsObservable(): Observable<string> {
    return this.removeIndicatorFromProduct$.asObservable()
  }

  public removeProductIndicatorState(id: string): void {
    this.removeIndicatorFromProduct$.next(id)
  }

  public getCartTotalPrice(): number | unknown {
    return Object.values(this.cart)
      .reduce((prev: any, current: any) => {
        return prev + current.totalPrice;
      }, 0)
  }
}
