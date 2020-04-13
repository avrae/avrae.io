import {isPlatformBrowser} from '@angular/common';
import {AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Command, CommandArgument} from '../../schemas/Commands';

@Component({
  selector: 'avr-command-display',
  templateUrl: './command-display.component.html',
  styleUrls: ['./command-display.component.scss']
})
export class CommandDisplayComponent implements OnInit, AfterViewInit {

  @Input() command: Command;
  @Input() parentId: string;
  @Input() depth = 0;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private activatedRoute: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.getQualifiedId() === this.activatedRoute.snapshot.fragment) {
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
    if (this.isBrowser) {
      history.pushState(null, null, `${window.location.pathname}#${this.getQualifiedId()}`);
    }
  }

  getQualifiedId() {
    return this.parentId ? `${this.parentId}-${this.command.name}` : this.command.name;
  }

  debrace(value: string) {
    if (!value) {
      return value;
    }
    return value.replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }
}
