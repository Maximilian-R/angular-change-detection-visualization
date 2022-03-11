import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  Input,
  NgZone,
} from "@angular/core";
import { INode } from "./node.interface";

@Component({ template: "" })
export class BaseNodeComponent implements DoCheck {
  @Input() public node?: INode;

  public strategy = ChangeDetectionStrategy;

  private timeout?: any;

  constructor(protected el: ElementRef, protected zone: NgZone) {}

  public cdCheck() {
    this.zone.runOutsideAngular(() => {
      const nodeElement = this.el.nativeElement.querySelector(".node");
      nodeElement.classList.add("checked");
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        nodeElement.classList.remove("checked");
        this.timeout = undefined;
      }, 500);
    });
  }

  public ngDoCheck(): void {
    /* When OnPush is detected, disable the check-status */
    this.el?.nativeElement
      .querySelector(".content")
      .querySelector(".check-status")
      ?.classList.remove("enabled");

    this.el?.nativeElement.querySelector(".value")?.classList.remove("dirty");
  }

  /* 
    Indicate when an OnPush component (plus path to root) has been marked for check
  */
  public markAsCheckEnabled(element: HTMLElement) {
    element.querySelector(".check-status")?.classList.add("enabled");

    const parent: HTMLElement | undefined | null =
      element.parentElement?.closest("cdv-onpush");
    if (parent) {
      this.markAsCheckEnabled(parent);
    }
  }

  /* 
    Indicate that a component model is our of sync with it's view
  */
  public markAsDirty() {
    this.el?.nativeElement.querySelector(".value")?.classList.add("dirty");
  }

  /* 
      Show toast when clicking mark in a default component: "Mark for check does not affect default strategy components"
    */
}
