import {NgModule} from '@angular/core';
import {CheatsheetsComponent} from './cheatsheets.component';
import {RouterModule, Routes} from '@angular/router';
import {AliasingComponent} from './aliasing/aliasing.component';
import {CheatsheetDetailComponent} from './cheatsheet-detail/cheatsheet-detail.component';

const cheatsheetRoutes: Routes = [
  {path: 'cheatsheets', component: CheatsheetsComponent},
  {path: 'cheatsheets/aliasing', component: AliasingComponent},
  {path: 'cheatsheets/:title', component: CheatsheetDetailComponent}
];


@NgModule({
  imports: [RouterModule.forChild(cheatsheetRoutes)],
  exports: [RouterModule]
})
export class CheatsheetsRoutingModule {
}
