import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommandsComponent} from './commands/commands.component';
import {ErrorComponent} from './error/error.component';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'commands', component: CommandsComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)},
  {path: 'ssr', loadChildren: () => import('./ssr/ssr.module').then(mod => mod.SsrModule)},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
