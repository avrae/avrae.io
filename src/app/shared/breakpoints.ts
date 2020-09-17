import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

/*
Provides instance attributes mobile, small, and medium to aid with templating.
Also provides recommended grid cols.
 */
export abstract class BreakpointBaseComponent {
  mobile = true;
  small = false;
  medium = false;
  gridCols = 1;

  protected constructor(bp: BreakpointObserver) {
    bp.observe(Breakpoints.XSmall).subscribe(({matches}) => {
      this.mobile = matches;
      if (matches) {
        this.onMobile();
      }
    });
    bp.observe(Breakpoints.Small).subscribe(({matches}) => {
      this.small = matches;
      if (matches) {
        this.onSmall();
      }
    });
    bp.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(({matches}) => {
      this.medium = matches;
      if (matches) {
        this.onMedium();
      }
    });
  }

  onMobile(): void {
    this.gridCols = 1;
  }

  onSmall(): void {
    this.gridCols = 2;
  }

  onMedium(): void {
    this.gridCols = 4;
  }
}
