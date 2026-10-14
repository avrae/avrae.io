import {Directive, ElementRef, HostListener, Input} from '@angular/core';

// Swaps an <img> to a local placeholder when its src fails to load
// (e.g. an expired Discord CDN avatar or collection image).
@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() appImgFallback = '';
  private readonly defaultFallback = 'assets/img/avatar-placeholder.svg';

  constructor(private ref: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    const img = this.ref.nativeElement;
    const fallback = this.appImgFallback || this.defaultFallback;
    if (img.src.endsWith(fallback)) {
      return; // already showing the fallback — don't loop
    }
    img.src = fallback;
  }
}
