import { Component, ChangeDetectionStrategy } from "@angular/core";
import { StrategyComponent } from "../strategy.component";

@Component({
  selector: "cdv-onpush",
  templateUrl: "./onpush.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnpushComponent extends StrategyComponent {}
