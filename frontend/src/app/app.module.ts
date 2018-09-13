import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {DashboardModule} from "./dashboard/dashboard.module";
import {MaterialModule} from "./material/material.module";

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {ThemesModule} from "./themes/themes.module";
import {ErrorComponent} from './error/error.component';
import {FormsModule} from "@angular/forms";
import {CommandsComponent} from './commands/commands.component';
import {CommandListComponent} from './commands/command-list/command-list.component';
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {InViewportModule, WindowRef} from "@thisissoon/angular-inviewport";
import {ScrollSpyModule} from "@thisissoon/angular-scrollspy";
import {CheatsheetsModule} from "./cheatsheets/cheatsheets.module";
import {LoginModule} from "./login/login.module";

const markdownConfig = {
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      breaks: true,
      sanitize: true
    },
  }
};
const getWindow = () => window;
const providers: Provider[] = [
  {provide: WindowRef, useFactory: (getWindow)},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    CommandsComponent,
    CommandListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MarkdownModule.forRoot(markdownConfig),
    InViewportModule.forRoot(providers),
    ScrollSpyModule.forRoot(),
    MaterialModule,
    DashboardModule,
    CheatsheetsModule,
    AppRoutingModule,
    ThemesModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
