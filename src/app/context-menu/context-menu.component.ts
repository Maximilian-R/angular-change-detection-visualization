import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import {
  filter,
  fromEvent,
  skip,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";

@Component({
  selector: "cdv-context-menu",
  templateUrl: "./context-menu.component.html",
})
export class ContextMenuComponent implements AfterViewInit, OnDestroy {
  @Input() target!: HTMLElement;

  @ViewChild("contextMenu") menu?: ElementRef;

  private onDestroy$ = new Subject<void>();

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const targetElement = this.target;
    const menuElement = this.menu?.nativeElement;

    this.zone.runOutsideAngular(() => {
      fromEvent<PointerEvent>(targetElement, "click")
        .pipe(
          takeUntil(this.onDestroy$),
          filter((event) => event.target === targetElement),
          tap((event) => {
            // console.log(event);
            menuElement.classList.add("display");
            menuElement.style.transform = `translate(${event.offsetX}px,${event.offsetY}px)`;
          }),
          switchMap(() => {
            return fromEvent<PointerEvent>(document, "click", {
              capture: true, // ignore the opening click
            }).pipe(
              take(1),
              tap(() => {
                menuElement.classList.remove("display");
              })
            );
          })
        )
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
