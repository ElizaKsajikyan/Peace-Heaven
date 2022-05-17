import {Directive, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appCardNumber]'
})
export class CardNumberDirective {

  @HostListener('input', ["$event.target.value"])
  public formatCardNumbers(value: string): void {
    this.control.control.patchValue(value.replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 '));
  }

  constructor(private control: NgControl) {
  }

}
