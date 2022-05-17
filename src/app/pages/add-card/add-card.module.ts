import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {AddCardComponent} from './components/add-card/add-card.component';
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', component: AddCardComponent}
]

@NgModule({
  declarations: [
    AddCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AddCardModule {
}
