import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseNodeComponent } from "../node.base";

@Component({
  selector: "cdv-node",
  templateUrl: "./node.component.html",
})
export class NodeComponent
  extends BaseNodeComponent
  implements OnDestroy, AfterViewInit
{
  @Input() public value: number = 0;

  @ViewChild("markButton") markButton?: ElementRef;
  @ViewChild("detectButton") detectButton?: ElementRef;
  @ViewChild("valueButton") valueButton?: ElementRef;

  private onDestroy$ = new Subject<void>();

  constructor(
    protected override el: ElementRef,
    protected override zone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    super(el, zone);
  }

  public clicked() {
    this.markAsCheckEnabled(this.el?.nativeElement);
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.markButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.cd.markForCheck();
          this.markAsCheckEnabled(this.el?.nativeElement);
        });
      fromEvent(this.detectButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.cd.detectChanges();
        });
      fromEvent(this.valueButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.value++;
        });
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
