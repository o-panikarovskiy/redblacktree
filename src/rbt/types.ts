export type Comparator<T> = (a: T, b: T) => number;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Node<T> = {
  value: T;
  color: 'B' | 'R';
  parent?: Node<T>;
  left?: Node<T>;
  right?: Node<T>;
};

export type RBTree<T> = Iterable<T> & {
  root(): DeepReadonly<Node<T>> | undefined;
  add(val: T): DeepReadonly<Node<T>>;
  delete(val: T): DeepReadonly<Node<T>> | undefined;
  find(key: T, root?: Node<T>): DeepReadonly<Node<T>> | undefined;
  inorder(): Generator<DeepReadonly<Node<T>>>;
};
