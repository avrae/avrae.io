import {Component, OnInit} from '@angular/core';
import {Alias, CharVar, Snippet, UserVar} from '../../schemas/Customization';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'avr-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit {

  aliases: Alias[];
  snippets: Snippet[];
  uvars: UserVar[];
  cvars: CharVar[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getCustomizations();
  }

  getCustomizations(): void {
    this.dashboardService.getCustomizations()
      .subscribe(customizations => {
        this.aliases = customizations.aliases;
        this.snippets = customizations.snippets;
        this.uvars = customizations.uvars;
      });
  }

}
