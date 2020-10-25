import test, { ExecutionContext } from 'ava';
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

  testNode(t, tree, 33, 23, 78);
});

test('add', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  tree.add(10);
  tree.add(5);
  tree.add(20);
  tree.add(25);
  tree.add(3);
  tree.add(24);
  tree.add(18);

  t.deepEqual([...tree], [3, 5, 10, 18, 20, 24, 25]);
  testNode(t, tree, 10, 5, 20);
  testNode(t, tree, 5, 3, void 0);
  testNode(t, tree, 3, void 0, void 0);

  testNode(t, tree, 20, 18, 25);
  testNode(t, tree, 18, void 0, void 0);
  testNode(t, tree, 25, 24, void 0);
  testNode(t, tree, 24, void 0, void 0);
});

test('delete', (t) => {
  const tree = new BinarySearchTree<number>((a, b) => a - b);

  tree.add(8);
  tree.add(6);
  tree.add(5);
  tree.add(7);
  tree.add(12);
  tree.add(14);
  tree.add(10);
  tree.add(11);
  tree.add(9);

  tree.delete(10);
  t.is(tree.find(10), undefined);
  t.deepEqual([...tree], [5, 6, 7, 8, 9, 11, 12, 14]);

  testNode(t, tree, 12, 11, 14);

  tree.delete(8);
  t.is(tree.root()?.value, 9);

  tree.delete(14);
  t.is(tree.root()?.value, 9);
  t.deepEqual([...tree], [5, 6, 7, 9, 11, 12]);

  tree.delete(9);
  t.is(tree.root()?.value, 11);

  tree.delete(11);
  t.is(tree.root()?.value, 12);

  tree.delete(12);
  t.is(tree.root()?.value, 6);

  tree.delete(6);
  t.is(tree.root()?.value, 7);

  tree.delete(7);
  t.is(tree.root()?.value, 5);

  tree.delete(5);
  t.is(tree.root(), undefined);
  t.is([...tree].length, 0);
});

function testNode(
  t: ExecutionContext<unknown>,
  tree: BinarySearchTree<number>,
  findVal: number,
  leftVal?: number,
  rightVal?: number,
) {
  const node = tree.find(findVal);

  t.is(node?.value, findVal);
  t.is(node?.left?.value, leftVal, 'left value is not equal');
  t.is(node?.right?.value, rightVal, 'right value is not equal');
}
