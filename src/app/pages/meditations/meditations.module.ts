import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MeditationsComponent} from './components/meditations/meditations.component';
import {MeditationsRoutingModule} from './meditations-routing.module';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    MeditationsComponent
  ],
  imports: [
    CommonModule,
    MeditationsRoutingModule,
    SharedModule
  ]
})
export class MeditationsModule {
}
