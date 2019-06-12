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
    if (window.innerWidth <= 960) {
      this.numCols = 1;
    } else if (window.innerWidth <= 1600) {
      this.numCols = 4;
    } else {
      this.numCols = 6;
    }
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
  onResize(event) {
    if (event.target.innerWidth <= 960) {
      this.numCols = 1;
    } else if (event.target.innerWidth <= 1600) {
      this.numCols = 4;
    } else {
      this.numCols = 6;
    }
  }

}
