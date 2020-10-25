import { grandparent, rotateLeft, rotateRight, uncle } from './helpers.js';
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

  node.color = 'R';
  node.parent = root;

  return node;
}

export function repairInsert<T>(node: Node<T>) {
  if (!node.parent) {
    return insertCase1(node);
  }

  if (node.parent.color === 'B') {
    return insertCase2(node);
  }

  const u = uncle(node);
  if (u && u.color === 'R') {
    return insertCase3(node);
  }

  return insertCase4(node);
}

function insertCase1<T>(n: Node<T>) {
  n.color = 'B';
}

function insertCase2<T>(n: Node<T>) {
  return;
}

function insertCase3<T>(n: Node<T>) {
  const p = n.parent as Node<T>;
  const u = uncle(n) as Node<T>;
  const g = grandparent(n) as Node<T>;

  p.color = 'B';
  u.color = 'B';
  g.color = 'R';

  repairInsert(g);
}

function insertCase4<T>(n: Node<T>) {
  let p = n.parent as Node<T>;
  let g = grandparent(n) as Node<T>;

  if (n === p.right && p === g.left) {
    rotateLeft(p);
    n = n.left as Node<T>;
  } else if (n === p.left && p === g.right) {
    rotateRight(p);
    n = n.right as Node<T>;
  }

  p = n.parent as Node<T>;
  g = grandparent(n) as Node<T>;

  if (n === p.left) {
    rotateRight(g);
  } else {
    rotateLeft(g);
  }

  p.color = 'B';
  g.color = 'R';
}
