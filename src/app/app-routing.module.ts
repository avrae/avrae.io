import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommandsComponent} from './commands/commands.component';
import {ErrorComponent} from './error/error.component';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SsrGuard} from './ssr/ssr.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'commands', component: CommandsComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)},
  {path: 'ssr', loadChildren: () => import('./ssr/ssr.module').then(mod => mod.SsrModule), canLoad: [SsrGuard]},
  {path: 'playground', loadChildren: () => import('./dev/dev.module').then(mod => mod.DevModule)},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
