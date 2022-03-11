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
  TODO: 
    Simply changing the input will not trigger a check next cd.
    However an event listener in the template will set the component as markforcheck. (All the way up to the root)
    Should the value button really trigger an event? gives a false impression that changing the value
    automatically causes a check of the component because the value changed.

    Template value can change without the cd knowing anything (onpush). Visualize when the model data is out of sync with the view?    
   */
}
