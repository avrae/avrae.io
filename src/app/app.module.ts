import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import * as Sentry from '@sentry/browser';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {ScrollSpyModule} from '@thisissoon/angular-scrollspy';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CheatsheetsModule} from './cheatsheets/cheatsheets.module';
import {CommandListComponent} from './commands/command-list/command-list.component';
import {CommandsComponent} from './commands/commands.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {ErrorComponent} from './error/error.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HomebrewSharingModule} from './homebrew-sharing/homebrew-sharing.module';
import {LoginModule} from './login/login.module';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {AutomationEditorModule} from './shared/automation-editor/automation-editor.module';
import {DiscordEmbedModule} from './shared/discord-embed/discord-embed.module';
import {ThemesModule} from './themes/themes.module';

Sentry.init({dsn: 'https://af2b06560981446bb55f64b6f79fd520@sentry.io/1486249'});

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    CommandsComponent,
    CommandListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MarkdownModule.forRoot(markdownConfig),
    InViewportModule,
    ScrollSpyModule.forRoot(),
    FlexLayoutModule,
    MaterialModule,
    DashboardModule,
    CheatsheetsModule,
    HomebrewSharingModule,
    DiscordEmbedModule,
    AutomationEditorModule,
    AppRoutingModule,
    ThemesModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
