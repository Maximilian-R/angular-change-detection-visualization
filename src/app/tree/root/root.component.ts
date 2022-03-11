import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
} from "@angular/core";
import { BaseNodeComponent } from "../node.base";

@Component({
  selector: "cdv-root",
  templateUrl: "./root.component.html",
})
export class RootComponent extends BaseNodeComponent implements OnInit {
  @Input() public detach: boolean = false;

  constructor(
    protected override el: ElementRef,
    protected override zone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    super(el, zone);
  }

  ngOnInit() {
    if (this.detach === true) {
      this.cd.detach();
      this.cd.detectChanges();
    }
  }

  // Cannot disable ngzone when both examples are demonstrated at the same time. Simulate the same behavior by detaching the node so that it does not receive tick's triggered from ngzone - but manually invoke detech changes when the Tridder Change Detection button is clicked
  public tick() {
    this.cd.detectChanges();
  }
}
