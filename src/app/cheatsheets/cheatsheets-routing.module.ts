import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RedirectGuard} from '../shared/redirect-guard/redirect.guard';
import {CheatsheetDetailComponent} from './cheatsheet-detail/cheatsheet-detail.component';
import {CheatsheetsComponent} from './cheatsheets.component';

const cheatsheetRoutes: Routes = [
  {path: 'cheatsheets', component: CheatsheetsComponent},
  {
    path: 'cheatsheets/aliasing',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {externalUrl: 'https://avrae.readthedocs.io/en/latest/aliasing/api.html'}
  },
  {path: 'cheatsheets/:title', component: CheatsheetDetailComponent}
];


@NgModule({
  imports: [RouterModule.forChild(cheatsheetRoutes)],
  exports: [RouterModule]
})
export class CheatsheetsRoutingModule {
}
