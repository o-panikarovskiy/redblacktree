import test from 'ava';
import { BinarySearchTree } from './bst.js';

test('find', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  t.is(tree.find(0), undefined);

  tree.add(100);
  tree.add(-5);
  tree.add(33);
  tree.add(-9);
  tree.add(-32);
  tree.add(78);
  tree.add(23);

  const node = tree.find(33);
  if (!node) {
    return t.fail('node not found');
  }

  if (!node.left) {
    return t.fail('node.left is empty');
  }

  if (!node.right) {
    return t.fail('node.right is empty');
  }

  t.is(node.value, 33);
  t.is(node.left.value, 23);
  t.is(node.right.value, 78);
});

test('add', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  tree.add(10);
  tree.add(5);
  tree.add(20);
  tree.add(25);
  tree.add(3);
  tree.add(24);
  const root = tree.add(18);

  t.deepEqual(tree.toArray(), [3, 5, 10, 18, 20, 24, 25]);

  let n = root;
  while (n.left) {
    n = n.left;
  }

  t.is(n.value, 3);
});

test('delete', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  tree.add(89);
  tree.add(-0);
  tree.add(10);
  tree.add(12);
  tree.add(-17);
  tree.add(100);
  tree.add(99);

  tree.delete(10);
  t.deepEqual(tree.toArray(), [-17, -0, 12, 89, 99, 100]);

  t.is(tree.find(10), undefined);

  const root = tree.find(0);
  if (!root) {
    return t.fail('root not found');
  }

  if (!root.left) {
    return t.fail('root.left is empty');
  }

  if (!root.right) {
    return t.fail('root.left is empty');
  }

  t.is(root.value, -0);
  t.is(root.left.value, -17);
  t.is(root.right.value, 12);
});

test('print', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  tree.add(43);
  tree.add(12);
  tree.add(-80);
  tree.add(0);
  tree.add(14);
  tree.add(14);
  tree.add(14);

  const res = tree.print();

  t.is(!!res?.['43'], true);
  t.is(res?.['43']?.['-12']?.['--80']?.['+0'], null);
  t.is(res?.['43']?.['-12']?.['+14']?.['+14']?.['+14'], null);
});
