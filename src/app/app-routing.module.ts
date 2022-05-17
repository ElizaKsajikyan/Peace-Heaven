import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'add-card',
    // canActivate: [LoggedInGuard],
    loadChildren: () => import('./pages/add-card/add-card.module').then(m => m.AddCardModule)
  },
  {
    path: 'meditations',
    loadChildren: () => import('./pages/meditations/meditations.module').then(m => m.MeditationsModule)
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
