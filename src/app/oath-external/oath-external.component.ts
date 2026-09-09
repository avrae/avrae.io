import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'avr-oath-external',
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './oath-external.component.html',
  styleUrl: './oath-external.component.scss',
})
export class OathExternalComponent implements OnInit {
  redirect_uri = '';
  validUrl = false;
  allowedUrl = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
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

      return environment.allowedExternalOaths.some(baseUrl => {
        const base = new URL(baseUrl);

        return url.origin === base.origin;
      });
    } catch {
      return false;
    }
  }

  redirect() {
    if (!this.isValidUrl && !this.isAllowedUrl) return;

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
