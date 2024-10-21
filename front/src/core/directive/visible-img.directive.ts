import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appVisibleImg]',
  standalone: true
})
export class VisibleImgDirective implements OnInit{
  @Input() like!: boolean;
  constructor(
    private el: ElementRef,
    private r2: Renderer2
  ) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    const label = this.el.nativeElement.lastElementChild as HTMLElement;
    const img = this.el.nativeElement.firstElementChild.firstElementChild as HTMLImageElement;
    img.src = "assets/icons/like.svg";
    this.r2.setStyle(label, 'color', 'orange');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const label = this.el.nativeElement.lastElementChild as HTMLElement;
    const img = this.el.nativeElement.firstElementChild.firstElementChild as HTMLImageElement;
    if(this.like) {
      img.src = "assets/icons/like.svg";
    } else {
      img.src = "assets/icons/like-empty.svg";
    }

    this.r2.setStyle(label, 'color', 'black');
  }
  ngOnInit(): void {
    // console.log(this.el.nativeElement);
    // console.log(this.img.firstElementChild)
  }

}
