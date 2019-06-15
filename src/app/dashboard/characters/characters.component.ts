import {Component, OnInit} from '@angular/core';
import {UserInfo, UserStats} from '../../schemas/UserInfo';
import {DashboardService} from '../dashboard.service';
import {CharacterMeta} from '../../schemas/Character';
import {Observable} from 'rxjs';

@Component({
  selector: 'avr-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  userInfo: Observable<UserInfo>;
  userStats: Observable<UserStats>;
  characters: Observable<CharacterMeta[]>;
  numCols: number;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUserStats();
    this.getCharacters();
    this.onResize(null);
  }

  getUserInfo(): void {
    this.userInfo = this.dashboardService.getUserInfo();
  }

  getUserStats(): void {
    this.userStats = this.dashboardService.getUserStats();
  }

  getCharacters(): void {
    this.characters = this.dashboardService.getCharacterMeta();
  }

  getInitials(name: string): string {
    const match = name.match(/\b\w/g) || [];
    return ((match.shift() || '') + (match.pop() || '')).toUpperCase();
  }

  getUpstreamURL(upstream: string): string {
    if (upstream.startsWith("dicecloud-")) {
      return `https://dicecloud.com/character/${upstream.slice(10)}`;
    } else if (upstream.startsWith("google-")) {
      return `https://docs.google.com/spreadsheets/d/${upstream.slice(7)}`;
    } else if (upstream.startsWith("beyond-")) {
      return `https://ddb.ac/characters/${upstream.slice(7)}`;
    }
    return '';
  }

  // Responsiveness
  onResize(_) {
    // reflects Material Design's breakpoints (https://material.io/design/layout/responsive-layout-grid.html#breakpoints)
    if (window.innerWidth < 600) {
      this.numCols = 1; // xsmall
    } else if (window.innerWidth < 1024) {
      this.numCols = 2; // small
    } else if (window.innerWidth < 1440) {
      this.numCols = 4; // medium
    } else {
      this.numCols = 6; // large
    }
  }

}
