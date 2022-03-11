import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TreeSelection } from "./tree/data/tree-selection";
import { INode } from "./tree/node.interface";
import { RootComponent } from "./tree/root/root.component";

@Component({
  selector: "cdv-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements AfterViewInit, OnDestroy {
  treeSelection: INode[] = TreeSelection;

  @ViewChild("rootZoneLess") rootZoneLess?: RootComponent;
  @ViewChild("tickButton") tickButton?: ElementRef;
  @ViewChild("timeButton") timeButton?: ElementRef;
  @ViewChild("requestButton") requestButton?: ElementRef;
  @ViewChild("checkboxCheckStatus") checkboxCheckStatus?: ElementRef;
  @ViewChild("checkboxDirtyStatus") checkboxDirtyStatus?: ElementRef;

  public selectedTree: INode = this.treeSelection[0];

  private onDestroy$ = new Subject<void>();

  constructor(
    private app: ApplicationRef,
    private http: HttpClient,
    protected zone: NgZone
  ) {}

  public select(event: any) {
    this.selectedTree = this.treeSelection[event.target.value];
    this.tick();
  }

  private tick() {
    this.app.tick();
    this.rootZoneLess?.tick();
  }

  private ajaxRequest() {
    this.http
      .get("", {
        responseType: "text",
      })
      .subscribe({
        next: (response) => {},
        error: (error) => console.log(error),
      });
  }

  ngAfterViewInit() {
    // Click buttons without triggering change detection
    this.zone.runOutsideAngular(() => {
      fromEvent(this.tickButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.tick();
        });

      fromEvent(this.timeButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.zone.run(() => {
            setTimeout(() => {}, 1000);
          });
        });

      fromEvent(this.requestButton?.nativeElement, "click")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.zone.run(() => {
            this.ajaxRequest();
          });
        });

      fromEvent(this.checkboxCheckStatus?.nativeElement, "change")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          document
            .querySelector(".tree-container")
            ?.classList.toggle("display-check-status");
        });

      fromEvent(this.checkboxDirtyStatus?.nativeElement, "change")
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          document
            .querySelector(".tree-container")
            ?.classList.toggle("display-dirty-status");
        });
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
