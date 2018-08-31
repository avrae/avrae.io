import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../schemas/UserInfo";
import {DashboardService} from "../dashboard.service";
import {CharacterMeta} from "../../schemas/Character";

@Component({
  selector: 'avr-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  userInfo: UserInfo;
  characters: CharacterMeta[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.getCharacters();
  }

  getUserInfo(): void {
    this.dashboardService.getUserInfo()
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  getCharacters(): void {
    this.dashboardService.getCharacterMeta()
      .subscribe(characters => this.characters = characters);
  }

}
