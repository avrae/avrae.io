import {Component, OnInit} from '@angular/core';
import {UserInfo, UserStats} from '../../schemas/UserInfo';
import {DashboardService} from '../dashboard.service';
import {CharacterMeta} from '../../schemas/Character';

@Component({
  selector: 'avr-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  userInfo: UserInfo;
  userStats: UserStats;
  characters: CharacterMeta[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUserStats();
    this.getCharacters();
  }

  getUserInfo(): void {
    this.dashboardService.getUserInfo()
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  getUserStats(): void {
    this.dashboardService.getUserStats()
      .subscribe(userStats => this.userStats = userStats);
  }

  getCharacters(): void {
    this.dashboardService.getCharacterMeta()
      .subscribe(characters => this.characters = characters);
  }

}
