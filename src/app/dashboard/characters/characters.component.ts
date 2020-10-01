import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {CharacterMeta} from '../../schemas/Character';
import {UserInfo, UserStats} from '../../schemas/UserInfo';
import {getUser} from '../APIHelper';
import {DashboardService} from '../dashboard.service';
import {AttackEditorDialog} from './attack-editor-dialog/attack-editor-dialog.component';

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

  MIN_CHARACTER_AUTOMATION_VERSION = 17;

  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUserStats();
    this.getCharacters();
    this.onResize(null);
  }

  getUserInfo(): void {
    this.userInfo = of(getUser());
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

  getImage(character: CharacterMeta): string {
    return character.overrides.image || character.image;
  }

  getDescription(character: CharacterMeta): string {
    return character.overrides.desc || character.description;
  }

  getUpstreamURL(upstream: string): string {
    if (upstream.startsWith('dicecloud-')) {
      return `https://dicecloud.com/character/${upstream.slice(10)}`;
    } else if (upstream.startsWith('google-')) {
      return `https://docs.google.com/spreadsheets/d/${upstream.slice(7)}`;
    } else if (upstream.startsWith('beyond-')) {
      return `https://ddb.ac/characters/${upstream.slice(7)}`;
    }
    return '';
  }

  // Attack Editor
  beginEditAttacks(character: CharacterMeta) {
    if (character.import_version < this.MIN_CHARACTER_AUTOMATION_VERSION) {
      return;
    }

    this.dialog.open(AttackEditorDialog, {
      width: '75%', disableClose: true,
      data: character
    })
      .afterClosed().subscribe(result => {
      console.log(result);
    });
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
