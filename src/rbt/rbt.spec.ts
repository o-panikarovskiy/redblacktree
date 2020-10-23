import test from 'ava';
import { RedBlackTree } from './rbt.js';

test('find', (t) => {
  const tree = new RedBlackTree<number>((a, b) => a - b);

  t.is(tree.find(0), undefined);

  tree.add(10);
  tree.add(5);
  tree.add(20);
  tree.add(25);
  tree.add(3);
  tree.add(24);
  tree.add(18);

  const node = tree.find(24);
  if (!node) {
    return t.fail('node not found');
  }

  if (!node.left) {
    return t.fail('node.left is empty');
  }

  if (!node.right) {
    return t.fail('node.right is empty');
  }

  if (!node.parent) {
    return t.fail('node.parent is empty');
  }

  t.is(node.value, 24);
  t.is(node.color, 'R');
  t.is(node.left.value, 20);
  t.is(node.left.color, 'B');
  t.is(node.right.value, 25);
  t.is(node.right.color, 'B');
  t.is(node.parent.value, 10);
  t.is(node.parent.color, 'B');
});

test('add', (t) => {
  const tree = new RedBlackTree<number>((a, b) => a - b);

  tree.add(10);
  tree.add(5);
  tree.add(20);
  tree.add(25);
  tree.add(3);
  tree.add(24);
  const root = tree.add(18);

  t.deepEqual([...tree], [3, 5, 10, 18, 20, 24, 25]);

  let n = root;
  while (n.left) {
    n = n.left;
  }

  t.is(n.value, 3);
  t.is(n.color, 'R');
  t.is(n.parent?.value, 5);
  t.is(n.parent?.color, 'B');
});

test('delete', (t) => {
  const tree = new RedBlackTree<number>((a, b) => a - b);

  tree.add(10);
  tree.add(5);
  tree.add(20);
  tree.add(25);
  tree.add(3);
  tree.add(24);
  tree.add(18);

  tree.delete(20);
});
