import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./components/header/header.component";
import {FormatPhoneNumberPipe} from './pipes/format-number.pipe';
import {
  ActiveProductDirective,
  CardNumberDirective,
  ClickOutsideDirective,
  ExpiryDateDirective,
  NumberDirective
} from './directives';


@NgModule({
  declarations: [
    HeaderComponent,
    ClickOutsideDirective,
    ActiveProductDirective,
    FormatPhoneNumberPipe,
    NumberDirective,
    CardNumberDirective,
    ExpiryDateDirective
  ],
  exports: [
    HeaderComponent,
    ActiveProductDirective,
    ClickOutsideDirective,
    FormatPhoneNumberPipe,
    ReactiveFormsModule,
    NumberDirective,
    CardNumberDirective,
    ExpiryDateDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
