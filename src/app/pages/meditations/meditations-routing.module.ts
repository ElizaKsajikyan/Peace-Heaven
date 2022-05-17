import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MeditationsComponent} from "./components/meditations/meditations.component";

const routes: Routes = [
  {path: '', component: MeditationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeditationsRoutingModule {
}
