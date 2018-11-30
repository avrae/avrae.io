import {Component, OnInit} from '@angular/core';
import {UserInfo, UserStats} from "../../schemas/UserInfo";
import {DashboardService} from "../dashboard.service";
import {CharacterMeta} from "../../schemas/Character";
import {Observable} from "rxjs";

@Component({
  selector: 'avr-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  userInfo: Observable<UserInfo>;
  userStats: Observable<UserStats>;
  characters: Observable<CharacterMeta[]>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUserStats();
    this.getCharacters();
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

}
