import {Component, OnInit} from '@angular/core';
import {CommandModule} from "../schemas/Commands";
import {CommandsService} from "./commands.service";

@Component({
  selector: 'avr-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  modules: CommandModule[];

  constructor(private commandService: CommandsService) {
  }

  ngOnInit() {
    this.getCommands();
  }

  getCommands(): void {
    this.commandService.getCommands()
      .subscribe(modules => this.modules = modules.modules);
  }

  scrollTo(id: string) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: "smooth"});
  }

}
