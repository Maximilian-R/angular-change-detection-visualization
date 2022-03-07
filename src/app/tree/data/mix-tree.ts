import { ChangeDetectionStrategy } from '@angular/core';
import { INode } from '../node.interface';

const tree: INode = {
  type: ChangeDetectionStrategy.Default,
  children: [
    {
      type: ChangeDetectionStrategy.OnPush,
      children: [
        {
          type: ChangeDetectionStrategy.OnPush,
        },
        {
          type: ChangeDetectionStrategy.Default,
        },
      ],
    },
    {
      type: ChangeDetectionStrategy.Default,
      children: [
        {
          type: ChangeDetectionStrategy.OnPush,
        },
        {
          type: ChangeDetectionStrategy.Default,
        },
      ],
    },
  ],
};

export default tree;
