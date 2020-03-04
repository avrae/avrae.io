import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {CommandModule} from '../schemas/Commands';
import {CommandsService} from './commands.service';

@Component({
  selector: 'avr-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  title = 'Avrae Commands';
  description = 'A list of Avrae\'s commands, arguments, and features.';

  modules: CommandModule[];

  constructor(private commandService: CommandsService, private meta: Meta) {
    this.meta.updateTag({name: 'description', content: this.description});
    this.meta.updateTag({property: 'og:title', content: this.title});
    this.meta.updateTag({property: 'og:description', content: this.description});
    this.meta.updateTag({property: 'og:url', content: `${environment.baseURL}/commands`});
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
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

}
