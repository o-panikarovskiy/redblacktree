export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Comparator<T> = (a: T, b: T) => number;
export type PrintNode<T> = (a: Node<T>, branch?: string) => string;

export type Node<T> = {
  value: T;
  left?: Node<T>;
  right?: Node<T>;
};

export type IStringNode = {
  [key: string]: IStringNode | null;
};

export type BSTree<T> = {
  root(): DeepReadonly<Node<T>> | undefined;
  add(val: T): DeepReadonly<Node<T>>;
  delete(val: T): DeepReadonly<Node<T>> | undefined;
  find(key: T, root?: Node<T>): DeepReadonly<Node<T>> | undefined;
  print(fn?: PrintNode<T>): IStringNode | null;
  toArray(): readonly T[];
};
