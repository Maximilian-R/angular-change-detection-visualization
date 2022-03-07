import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
} from "@angular/core";
import { INode } from "./node.interface";

@Component({ template: "" })
export class BaseNodeComponent {
  @Input() public node?: INode;

  public strategy = ChangeDetectionStrategy;

  private timeout?: any;

  constructor(protected el: ElementRef, protected zone: NgZone) {}

  public cdCheck() {
    this.zone.runOutsideAngular(() => {
      this.el.nativeElement.querySelector(".node").classList.add("checked");
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.el.nativeElement
          .querySelector(".node")
          .classList.remove("checked");
        this.timeout = undefined;
      }, 500);
    });
  }
}
