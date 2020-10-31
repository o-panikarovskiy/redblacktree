import { repairDelete } from './delete.js';
import { repairInsert } from './insert.js';
import { Comparator, DeepReadonly, Node, RBTree } from './types.js';

export class RedBlackTree<T> implements RBTree<T> {
  protected _root?: Node<T>;
  protected readonly compare: Comparator<T>;

  constructor(compare: Comparator<T>, root?: Node<T>) {
    this._root = root;
    this.compare = compare;
  }

  public root(): DeepReadonly<Node<T>> | undefined {
    return this._root;
  }

  public add(val: T): DeepReadonly<Node<T>> {
    let cur = this._root;
    let parent: Node<T> | undefined;
    while (cur) {
      const compareRes = this.compare(val, cur.value);
      if (compareRes === 0) return cur;
      parent = cur;
      cur = compareRes > 0 ? cur.right : cur.left;
    }

    const node: Node<T> = { value: val, color: 'R', parent };
    if (parent) {
      if (this.compare(val, parent.value) > 0) {
        parent.right = node;
      } else {
        parent.left = node;
      }
    } else {
      this._root = node;
    }

    repairInsert(node, this._root as Node<T>);

    cur = this._root;
    while (cur?.parent) {
      cur = cur.parent;
    }
    this._root = cur;

    return node;
  }

  public delete(val: T): DeepReadonly<Node<T>> | undefined {
    const z = this.find(val) as Node<T>;
    if (!z) return;

    let y: Node<T> | undefined;
    if (!z.left || !z.right) {
      y = z;
    } else {
      y = z.right;
      while (y.left) y = y.left;
    }

    const x = y.left || y.right;
    if (x) {
      x.parent = y.parent;
    }

    if (y.parent) {
      if (y == y.parent.left) {
        y.parent.left = x;
      } else {
        y.parent.right = x;
      }
    } else {
      this._root = x;
    }

    if (y != z) {
      z.value = y.value;
    }

    if (x && y.color === 'B') {
      repairDelete(x, this._root as Node<T>);
    }

    return this._root;
  }

  public find(val: T, root = this._root): DeepReadonly<Node<T>> | undefined {
    let node = root;
    while (node) {
      const compareRes = this.compare(val, node.value);
      if (compareRes === 0) {
        return node;
      }
      node = compareRes > 0 ? node.right : node.left;
    }
  }

  public *inorder() {
    let node = this._root;
    const stack: Node<T>[] = [];

    while (node || stack.length > 0) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      node = stack.pop() as Node<T>;
      yield node;
      node = node.right;
    }
  }

  public *[Symbol.iterator]() {
    for (const node of this.inorder()) {
      yield node.value;
    }
  }
}
