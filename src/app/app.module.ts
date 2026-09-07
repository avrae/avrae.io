import { LayoutModule } from "@angular/cdk/layout";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { APP_ID, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MarkdownModule, MARKED_OPTIONS } from "ngx-markdown";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { CheatsheetsModule } from "./cheatsheets/cheatsheets.module";
import { CommandDisplayComponent } from "./commands/command-display/command-display.component";
import { CommandsComponent } from "./commands/commands.component";
import { CommunityLinksComponent } from "./community-links/community-links.component";
import { ErrorComponent } from "./error/error.component";
import { FooterComponent } from "./footer/footer.component";
import { FeatureBoxComponent } from "./home/feature-box/feature-box.component";
import { HomeComponent } from "./home/home.component";
import { HomebrewSharingModule } from "./homebrew-sharing/homebrew-sharing.module";
import { LoginModule } from "./login/login.module";
import { MaterialModule } from "./material/material.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { AutomationEditorModule } from "./shared/automation-editor/automation-editor.module";
import { DialogsModule } from "./shared/dialogs/dialogs.module";
import { DiscordEmbedModule } from "./shared/discord-embed/discord-embed.module";
import { registerDraconicLanguage } from "./shared/monacoDraconic";
import { ValidationSnackbar } from "./shared/validation-snackbar/validation-snackbar.component";
import { ThemesModule } from "./themes/themes.module";

const markdownConfig = {
  markedOptions: {
    provide: MARKED_OPTIONS,
    useValue: {
      gfm: true,
      breaks: true,
    },
  },
};

const monacoConfig = {
  // baseUrl: './assets/monaco/vs',
  onMonacoLoad: () => {
    registerDraconicLanguage((<any>window).monaco);
  },
};

@NgModule({
  declarations: [
    AppComponent,
    FeatureBoxComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    CommandsComponent,
    CommandDisplayComponent,
    ValidationSnackbar,
    CommunityLinksComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MarkdownModule.forRoot(markdownConfig),
    FlexLayoutModule,
    MaterialModule,
    CheatsheetsModule,
    HomebrewSharingModule,
    DiscordEmbedModule,
    AutomationEditorModule,
    DialogsModule,
    AppRoutingModule,
    ThemesModule,
    LoginModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers: [
    { provide: APP_ID, useValue: "serverApp" },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
