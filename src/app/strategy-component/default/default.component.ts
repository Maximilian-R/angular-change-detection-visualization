import { Component, ChangeDetectionStrategy } from "@angular/core";
import { StrategyComponent } from "../strategy.component";

@Component({
  selector: "cdv-default",
  templateUrl: "./default.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultComponent extends StrategyComponent {}
