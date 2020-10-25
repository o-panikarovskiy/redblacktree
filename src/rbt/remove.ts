import { rotateLeft, rotateRight, sibling } from './helpers.js';
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

function deleteCase1<T>(n: Node<T>) {
  if (n.parent) {
    deleteCase2(n);
  }
}

function deleteCase2<T>(n: Node<T>) {
  const s = sibling(n);

  if (s?.color === 'R' && n.parent) {
    n.parent.color = 'R';
    s.color = 'B';
    if (n === n.parent.left) {
      rotateLeft(n.parent);
    } else {
      rotateRight(n.parent);
    }
  }

  deleteCase3(n);
}

function deleteCase3<T>(n: Node<T>) {
  const s = sibling(n);

  if (
    n.parent?.color === 'B' && //
    s?.color === 'B' &&
    s.left?.color === 'B' &&
    s.right?.color === 'B'
  ) {
    s.color = 'R';
    deleteCase1(n.parent);
  } else {
    deleteCase4(n);
  }
}

function deleteCase4<T>(n: Node<T>) {
  const s = sibling(n);

  if (
    n.parent?.color === 'R' && //
    s?.color === 'B' &&
    s.left?.color === 'B' &&
    s.right?.color === 'B'
  ) {
    s.color = 'R';
    n.parent.color = 'B';
  } else {
    deleteCase5(n);
  }
}

function deleteCase5<T>(n: Node<T>) {
  const s = sibling(n);

  if (s?.color === 'B') {
    if (
      n === n.parent?.left && //
      s.right?.color === 'B' &&
      s.left?.color === 'R'
    ) {
      s.color = 'R';
      s.left.color = 'B';
      rotateRight(s);
    } else if (
      n === n.parent?.right && //
      s.left?.color === 'B' &&
      s.right?.color === 'R'
    ) {
      s.color = 'R';
      s.right.color = 'B';
      rotateLeft(s);
    }
  }

  deleteCase6(n);
}

function deleteCase6<T>(n: Node<T>) {
  if (!n.parent) return;
  const s = sibling(n);

  if (!s) return;
  s.color = n.parent.color;
  n.parent.color = 'B';

  if (n === n.parent.left && s.right) {
    s.right.color = 'B';
    rotateLeft(n.parent);
  } else if (s.left) {
    s.left.color = 'B';
    rotateRight(n.parent);
  }
}
