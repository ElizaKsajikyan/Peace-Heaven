import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DataShareService} from "../../core/services/data-share.service";
import {Subject, takeUntil} from "rxjs";

@Directive({
  selector: '[appActiveProduct]'
})
export class ActiveProductDirective implements OnInit, OnDestroy {
  @Input()
  public product: any;

  @HostListener('click', ['$event'])
  public onTap(event: MouseEvent): void {
    const nativeElement = this.el.nativeElement;

    this.toggleProductButtons(nativeElement, event);
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private el: ElementRef,
              private readonly dataShareService: DataShareService,
              private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.dataShareService.getRemoveProductIndicatorAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((removedProductId: string) => {
        if (this.product.id === removedProductId) {
          this.renderer2.removeClass(this.el.nativeElement, 'added');
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private toggleProductButtons(element: HTMLLIElement, event: any): void {
    if (element.className.includes('clicked')) {
      this.renderer2.removeClass(element, 'clicked');
    } else {
      this.renderer2.addClass(element, 'clicked')
    }

    if (event.target.classList.contains('addToCart_btn')) {
      this.renderer2.addClass(element, 'added');
      this.renderer2.removeClass(element, 'clicked');
    }
  }
}
