import { ChangeDetectionStrategy } from '@angular/core';
import { INode } from '../node.interface';

const tree: INode = {
  type: ChangeDetectionStrategy.OnPush,
  children: [
    {
      type: ChangeDetectionStrategy.OnPush,
      children: [
        {
          type: ChangeDetectionStrategy.OnPush,
        },
        {
          type: ChangeDetectionStrategy.OnPush,
        },
      ],
    },
    {
      type: ChangeDetectionStrategy.OnPush,
      children: [
        {
          type: ChangeDetectionStrategy.OnPush,
        },
        {
          type: ChangeDetectionStrategy.OnPush,
        },
      ],
    },
  ],
};

export default tree;
