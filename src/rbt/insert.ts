import { grandparent, rotateLeft, rotateRight } from './helpers.js';
import { Node } from './types.js';

export function repairInsert<T>(x: Node<T>, root: Node<T>) {
  while (x != root && x.parent?.color == 'R') {
    const g = grandparent(x);
    if (x.parent == g?.left) {
      const y = g.right;
      if (y?.color == 'R') {
        x.parent.color = 'B';
        y.color = 'B';
        g.color = 'R';
        x = g;
      } else {
        if (x == x.parent.right) {
          x = x.parent;
          rotateLeft(x);
        }
        if (x.parent) {
          x.parent.color = 'B';
          g.color = 'R';
          rotateRight(g);
        }
      }
    } else if (g) {
      const y = g.left;
      if (y?.color == 'R') {
        x.parent.color = 'B';
        y.color = 'B';
        g.color = 'R';
        x = g;
      } else {
        if (x == x.parent.left) {
          x = x.parent;
          rotateRight(x);
        }
        if (x.parent) {
          x.parent.color = 'B';
          g.color = 'R';
          rotateLeft(g);
        }
      }
    }
  }
  root.color = 'B';
}
