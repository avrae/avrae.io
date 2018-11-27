import {Component, OnInit} from '@angular/core';
import {CommandModule} from '../schemas/Commands';
import {CommandsService} from './commands.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'avr-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  modules: CommandModule[];

  constructor(private commandService: CommandsService, private meta: Meta) {
    this.meta.updateTag({
      name: 'description', content: 'A list of Avrae\'s commands, arguments, and features.'
    });
  }

  ngOnInit() {
    this.getCommands();
  }

  getCommands(): void {
    this.commandService.getCommands()
      .subscribe(modules => this.modules = modules.modules);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}
