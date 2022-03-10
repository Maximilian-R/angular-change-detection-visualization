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
  @Input() public input: number = 0;

  @ViewChild("nodeRef") nodeRef?: ElementRef;
  @ViewChild("markButton") markButton?: ElementRef;
  @ViewChild("detectButton") detectButton?: ElementRef;

  private onDestroy$ = new Subject<void>();

  constructor(
    protected override el: ElementRef,
    protected override zone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    super(el, zone);
  }

  public setInput() {
    this.input++;
  }

  ngAfterViewInit() {
    // Click buttons without triggering change detection
    this.zone.runOutsideAngular(() => {
      fromEvent(this.markButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.cd.markForCheck();
        });
      fromEvent(this.detectButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.cd.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
