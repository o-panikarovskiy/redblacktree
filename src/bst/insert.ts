import { Comparator, Node } from './types.js';

export function insert<T>(compare: Comparator<T>, node: Node<T>, root?: Node<T>): Node<T> {
  if (root) {
    if (compare(node.value, root.value) < 0) {
      if (root.left) {
        return insert(compare, node, root.left);
      } else {
        root.left = node;
      }
    } else {
      if (root.right) {
        return insert(compare, node, root.right);
      } else {
        root.right = node;
      }
    }
  }
  return node;
}
