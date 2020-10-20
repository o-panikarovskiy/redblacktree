import { insert } from './insert.js';
import { remove } from './remove.js';
import { BSTree, Comparator, DeepReadonly, IStringNode, Node, PrintNode } from './types.js';

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

  public print(fn?: PrintNode<T>): IStringNode | null {
    const printKey = fn || (((n, b) => `${b}${n.value}`) as PrintNode<T>);

    const iterator = (res: IStringNode | null, node?: Node<T>, branch?: string): IStringNode | null => {
      if (!node || !res) return res;

      const key = printKey(node, branch);
      res[key] = !node.left && !node.right ? null : {};

      iterator(res[key], node.left, '-');
      iterator(res[key], node.right, '+');

      return res;
    };

    return iterator({}, this._root, '');
  }

  public toArray(): readonly T[] {
    const iterator = (arr: T[], node?: Node<T>) => {
      if (!node) return arr;

      iterator(arr, node.left);
      arr.push(node.value);
      iterator(arr, node.right);

      return arr;
    };

    return iterator([], this._root);
  }
}
