import { ChangeDetectionStrategy } from "@angular/core";
import { INode } from "../node.interface";

const generate = (levels: number) => {
  const node: any = {
    type: ChangeDetectionStrategy.Default,
  };

  if (levels > 0) {
    node.children = [generate(levels - 1), generate(levels - 1)];
  }

  return node;
};

const tree: INode = generate(3);

export default tree;
