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

export function repairTree<T>(node: Node<T>) {
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

  repairTree(g);
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

function grandparent<T>(n?: Node<T>) {
  if (n && n.parent) {
    return n.parent.parent;
  }
}

function uncle<T>(n?: Node<T>) {
  if (!n) return;

  const g = grandparent(n);
  if (!g) return;

  if (n.parent === g.left) {
    return g.right;
  }

  return g.left;
}

function rotateLeft<T>(n: Node<T>) {
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

function rotateRight<T>(n: Node<T>) {
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
