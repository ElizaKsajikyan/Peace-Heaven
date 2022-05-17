import {Directive, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appNumber]',
})
export class NumberDirective {

  @HostListener('input', ["$event.target.value"])
  public removeNonDigits(value: string): void {
    this.control.control.patchValue(value.replace(/\D/g, ''));
  }

  constructor(private control: NgControl) {
  }

}
