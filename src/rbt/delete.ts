import { rotateLeft, rotateRight } from './helpers.js';
import { Node } from './types.js';

export function repairDelete<T>(x: Node<T>, root: Node<T>) {
  while (x != root && x.color == 'B') {
    if (x == x.parent?.left) {
      let w = x.parent.right;
      if (w?.color === 'R') {
        w.color = 'B';
        x.parent.color = 'R';
        rotateLeft(x.parent);
        w = x.parent.right;
      }

      if (w?.left?.color === 'B' && w.right?.color === 'B') {
        w.color = 'R';
        x = x.parent;
      } else {
        if (w?.right?.color == 'B' && w.left) {
          w.left.color = 'B';
          w.color = 'R';
          rotateRight(w);
          w = x.parent.right;
        }

        if (w?.right) {
          w.color = x.parent.color;
          x.parent.color = 'B';
          w.right.color = 'B';
          rotateLeft(x.parent);
          x = root;
        }
      }
    } else if (x.parent) {
      let w = x.parent.left;
      if (w?.color == 'R') {
        w.color = 'B';
        x.parent.color = 'R';
        rotateRight(x.parent);
        w = x.parent.left;
      }

      if (w?.right?.color == 'B' && w?.left?.color == 'B') {
        w.color = 'R';
        x = x.parent;
      } else {
        if (w?.left?.color == 'B' && w.right) {
          w.right.color = 'B';
          w.color = 'R';
          rotateLeft(w);
          w = x.parent.left;
        }

        if (w?.left) {
          w.color = x.parent.color;
          x.parent.color = 'B';
          w.left.color = 'B';
          rotateRight(x.parent);
          x = root;
        }
      }
    }
  }
  x.color = 'B';
}
