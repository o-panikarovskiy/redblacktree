import { insert } from './insert.js';
import { remove } from './remove.js';
import { BSTree, Comparator, DeepReadonly, Node } from './types.js';

export class BinarySearchTree<T> implements BSTree<T> {
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
    const node = insert(this.compare, { value: val }, this._root);

    if (!this._root) {
      this._root = node;
    }

    return this._root;
  }

  public delete(val: T): DeepReadonly<Node<T>> | undefined {
    return remove(this.compare, val, this._root);
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

      node = stack.pop();
      yield node;
      node = node?.right;
    }
  }

  public *[Symbol.iterator]() {
    for (const node of this.inorder()) {
      yield node?.value;
    }
  }
}
