import { ChangeDetectionStrategy } from '@angular/core';

export interface INode {
  type: ChangeDetectionStrategy;
  children?: INode[];
}
