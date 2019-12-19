import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Command, CommandArgument} from '../../schemas/Commands';

@Component({
  selector: 'avr-command-display',
  templateUrl: './command-display.component.html',
  styleUrls: ['./command-display.component.css']
})
export class CommandDisplayComponent implements OnInit, AfterViewInit {

  @Input() command: Command;
  @Input() parentId: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.getQualifiedId() === this.activatedRoute.snapshot.fragment) {
      const el = document.getElementById(this.getQualifiedId());
      // puts the scroll on the end of the render queue, so it only scrolls once the element is on the page
      // this took way too long to figure out
      window.setTimeout(() => el.scrollIntoView({behavior: 'smooth', block: 'center'}), 0);
    }
  }

  getArgDescriptors(arg: CommandArgument): string {
    if (!arg.required && arg.default) {
      return ` (optional, default ${arg.default})`;
    } else if (!arg.required) {
      return ' (optional)';
    }
    return '';
  }

  shouldBeExpanded() {
    const fragment = this.activatedRoute.snapshot.fragment;
    if (fragment) {
      return fragment.includes(this.getQualifiedId());
    }
    return false;
  }

  setHash() {
    history.pushState(null, null, `${window.location.pathname}#${this.getQualifiedId()}`);
  }

  getQualifiedId() {
    return this.parentId ? `${this.parentId}-${this.command.name}` : this.command.name;
  }
}
