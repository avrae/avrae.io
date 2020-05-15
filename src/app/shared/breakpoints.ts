import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

/*
Provides instance attributes mobile, small, and medium to aid with templating.
 */
export abstract class BreakpointBaseComponent {
  mobile = true;
  small = false;
  medium = false;

  protected constructor(bp: BreakpointObserver) {
    bp.observe(Breakpoints.XSmall).subscribe(({matches}) => {
      this.mobile = matches;
      this.onMobile();
    });
    bp.observe(Breakpoints.Small).subscribe(({matches}) => {
      this.small = matches;
      this.onSmall();
    });
    bp.observe(Breakpoints.Medium).subscribe(({matches}) => {
      this.medium = matches;
      this.onMedium();
    });
  }

  onMobile(): void {
  }

  onSmall(): void {
  }

  onMedium(): void {
  }
}
