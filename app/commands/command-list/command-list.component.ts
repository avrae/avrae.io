import {Component, Input, OnInit} from '@angular/core';
import {Command, CommandArgument} from '../../schemas/Commands';

@Component({
  selector: 'avr-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {

  @Input() commands: Command[];

  constructor() {
  }

  ngOnInit() {
  }

  getArgDescriptors(arg: CommandArgument): string {
    if (!arg.required && arg.default) {
      return ` (optional, default ${arg.default})`;
    } else if (!arg.required) {
      return ' (optional)';
    }
    return '';
  }

}
