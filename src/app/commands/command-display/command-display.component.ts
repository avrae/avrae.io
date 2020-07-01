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
  isBrowser: boolean;
  isOpen: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private activatedRoute: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.isOpen = this.shouldBeExpanded();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.getQualifiedId() === this.activatedRoute.snapshot.fragment) {
      const el = document.getElementById(this.getQualifiedId());
      window.requestAnimationFrame(() => el.scrollIntoView({behavior: 'smooth', block: 'center'}));
    }
  }

  canBeOpened() {
    return this.command.args.length || this.command.docs !== this.command.short;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen || !this.canBeOpened()) {
      this.setHash();
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
    let renderedValue = value.replace(/>/g, '&gt;').replace(/</g, '&lt;');

    // if it replaced a <> in a markdown code block, change it back
    renderedValue = renderedValue.replace(/`.+?`/g, match => {
      return match.replace(/&gt;/, '>').replace(/&lt;/, '<');
    });

    return renderedValue;
  }
}
