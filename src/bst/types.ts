export type Comparator<T> = (a: T, b: T) => number;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Node<T> = {
  value: T;
  left?: Node<T>;
  right?: Node<T>;
};

export type BSTree<T> = Iterable<T | void> & {
  root(): DeepReadonly<Node<T>> | undefined;
  add(val: T): DeepReadonly<Node<T>>;
  delete(val: T): DeepReadonly<Node<T>> | undefined;
  find(key: T, root?: Node<T>): DeepReadonly<Node<T>> | undefined;
  inorder(): Generator<DeepReadonly<Node<T>> | undefined>;
};
