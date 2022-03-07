import { Component, Input } from "@angular/core";
import { INode } from "../tree/node.interface";

@Component({ template: "" })
export class StrategyComponent {
  @Input() public node?: INode;
  @Input() public input: number = 0;
}
