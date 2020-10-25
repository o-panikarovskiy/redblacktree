import { insert, repairInsert } from './insert.js';
import { remove } from './remove.js';
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
    const node = insert(this.compare, { value: val } as Node<T>, this._root);

    repairInsert(node);

    let root = node;
    while (root.parent) {
      root = root.parent;
    }

    this._root = root;
    return this._root;
  }

  public delete(val: T): DeepReadonly<Node<T>> | undefined {
    this._root = remove(this.compare, val, this._root);
    return this._root;
  }

  public find(val: T, root = this._root): DeepReadonly<Node<T>> | undefined {
    if (!root) return;

    const res = this.compare(val, root.value);
    if (res === 0) {
      return root;
    }

    if (res > 0 && root.right) {
      return this.find(val, root.right);
    }

    if (root.left) {
      return this.find(val, root.left);
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
