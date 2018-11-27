import {NgModule} from '@angular/core';
import {CheatsheetsComponent} from './cheatsheets.component';
import {RouterModule, Routes} from '@angular/router';
import {DmComponent} from './dm/dm.component';
import {PlayerComponent} from './player/player.component';
import {AliasingComponent} from './aliasing/aliasing.component';

const cheatsheetRoutes: Routes = [
  {path: 'cheatsheets', component: CheatsheetsComponent},
  {path: 'cheatsheets/player', component: PlayerComponent},
  {path: 'cheatsheets/dm', component: DmComponent},
  {path: 'cheatsheets/aliasing', component: AliasingComponent}
];


@NgModule({
  imports: [RouterModule.forChild(cheatsheetRoutes)],
  exports: [RouterModule]
})
export class CheatsheetsRoutingModule {
}
