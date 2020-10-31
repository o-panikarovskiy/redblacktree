import { Comparator, Node } from './types.js';

export function remove<T>(compare: Comparator<T>, val: T, node?: Node<T>): Node<T> | undefined {
  if (!node) return;

  const compareRes = compare(val, node.value);
  if (compareRes < 0) {
    node.left = remove(compare, val, node.left);
  } else if (compareRes > 0) {
    node.right = remove(compare, val, node.right);
  } else {
    if (!node.left) {
      return node.right;
    } else if (!node.right) {
      return node.left;
    }

    let n = node.right;
    let min = n.value;
    while (n.left) {
      min = n.left.value;
      n = n.left;
    }

    node.value = min;
    node.right = remove(compare, node.value, node.right);
  }

  return node;
}
