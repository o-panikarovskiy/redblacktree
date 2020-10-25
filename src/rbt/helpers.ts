import { Node } from './types.js';

export function grandparent<T>(n?: Node<T>) {
  if (n?.parent) {
    return n.parent.parent;
  }
}

export function uncle<T>(n?: Node<T>) {
  return sibling(n?.parent);
}

export function sibling<T>(n?: Node<T>) {
  if (n?.parent?.left === n) {
    return n?.parent?.right;
  }

  return n?.parent?.left;
}

export function rotateLeft<T>(n: Node<T>) {
  const pivot = n.right as Node<T>;

  pivot.parent = n.parent;
  if (n.parent) {
    if (n.parent.left === n) {
      n.parent.left = pivot;
    } else {
      n.parent.right = pivot;
    }
  }

  n.right = pivot.left;
  if (pivot.left) {
    pivot.left.parent = n;
  }

  n.parent = pivot;
  pivot.left = n;
}

export function rotateRight<T>(n: Node<T>) {
  const pivot = n.left as Node<T>;

  pivot.parent = n.parent;
  if (n.parent) {
    if (n.parent.left === n) {
      n.parent.left = pivot;
    } else {
      n.parent.right = pivot;
    }
  }

  n.left = pivot.right;
  if (pivot.right) {
    pivot.right.parent = n;
  }

  n.parent = pivot;
  pivot.right = n;
}

export function replaceNode<T>(n: Node<T>, child: Node<T>) {
  child.parent = n.parent;
  if (n === n.parent?.left) {
    n.parent.left = child;
  } else if (n.parent) {
    n.parent.right = child;
  }
}
