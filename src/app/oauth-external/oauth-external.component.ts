import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {isLoggedIn} from '../SecurityHelper';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {UserInfo} from "../schemas/UserInfo";
import {getUser} from "../dashboard/APIHelper";

@Component({
  selector: 'avr-oauth-external',
  templateUrl: './oauth-external.component.html',
  styleUrls: ['./oauth-external.component.scss'],
  imports: [
    MaterialModule, 
    CommonModule
  ]
})

export class OauthExternalComponent implements OnInit {
  userInfo!: Observable<UserInfo>;

  redirect_uri = '';
  validUrl = false;
  allowedUrl = false;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    if (!isLoggedIn()) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.userInfo = of(getUser())
    this.getRedirectUri()
  }

  getRedirectUri() {
    const redirectUri =
      this.route.snapshot.queryParamMap.get('redirecturi');


    this.redirect_uri = redirectUri || '';
    this.validUrl = this.isValidUrl();
    this.allowedUrl = this.isAllowedUrl()
  }

  isValidUrl(): boolean {
    try {
      const url = new URL(this.redirect_uri);

      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  isAllowedUrl(): boolean {
    try {
      const url = new URL(this.redirect_uri);

      return environment.allowedExternalOauths.some(baseUrl => {
        const base = new URL(baseUrl);

        return url.origin === base.origin;
      });
    } catch {
      return false;
    }
  }

  redirect() {
    if (!this.validUrl || !this.allowedUrl) return;

    const value = localStorage.getItem('avrae-token');

    if (!value) {
      console.error('No access token found in localStorage');
      return;
    }

    const url = new URL(this.redirect_uri);

    url.searchParams.set('avraeToken', value);

    window.location.href = url.toString();
  }

  openConfirmDialog(template: TemplateRef<unknown>) {
    const dialogRef = this.dialog.open(template);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.redirect();
      }
    });
  }


}
