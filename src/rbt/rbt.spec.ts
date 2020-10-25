import test, { ExecutionContext } from 'ava';
import { RedBlackTree } from './rbt.js';

type ExpectedNode = { value: number; color: 'R' | 'B' };

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

  testNode(
    t,
    tree,
    { value: 24, color: 'R' }, // find
    { value: 20, color: 'B' }, // left
    { value: 25, color: 'B' }, // right
    { value: 10, color: 'B' }, // parent
  );
});

test('add', (t) => {
  const tree = new RedBlackTree<number>((a, b) => a - b);

  tree.add(13);
  tree.add(8);
  tree.add(17);
  tree.add(1);
  tree.add(11);
  tree.add(6);
  tree.add(15);
  tree.add(25);
  tree.add(22);
  tree.add(27);

  t.deepEqual([...tree], [1, 6, 8, 11, 13, 15, 17, 22, 25, 27]);

  testNode(
    t,
    tree,
    { value: 13, color: 'B' }, // find
    { value: 8, color: 'R' }, // left
    { value: 17, color: 'R' }, // right
  );

  testNode(
    t,
    tree,
    { value: 8, color: 'R' }, // find
    { value: 1, color: 'B' }, // left
    { value: 11, color: 'B' }, // right
    { value: 13, color: 'B' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 1, color: 'B' }, // find
    void 0, // left
    { value: 6, color: 'R' }, // right
    { value: 8, color: 'R' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 6, color: 'R' }, // find
    void 0, // left
    void 0, // right
    { value: 1, color: 'B' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 11, color: 'B' }, // find
    void 0, // left
    void 0, // right
    { value: 8, color: 'R' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 17, color: 'R' }, // find
    { value: 15, color: 'B' }, // left
    { value: 25, color: 'B' }, // right
    { value: 13, color: 'B' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 15, color: 'B' }, // find
    void 0, // left
    void 0, // right
    { value: 17, color: 'R' }, // parent
  );

  testNode(
    t,
    tree,
    { value: 25, color: 'B' }, // find
    { value: 22, color: 'R' }, // left
    { value: 27, color: 'R' }, // right
    { value: 17, color: 'R' }, // parent
  );
});

function testNode(
  t: ExecutionContext<unknown>,
  tree: RedBlackTree<number>,
  findNode: ExpectedNode,
  left?: ExpectedNode,
  right?: ExpectedNode,
  parent?: ExpectedNode,
) {
  const node = tree.find(findNode.value);

  t.is(node?.value, findNode.value, `node value ${findNode.value} is not equal`);
  t.is(node?.color, findNode.color, `node color of ${findNode.value} is not equal`);
  t.is(node?.left?.value, left?.value, `left value ${findNode.value} is not equal`);
  t.is(node?.left?.color, left?.color, `left color of ${findNode.value} is not equal`);
  t.is(node?.right?.value, right?.value, `right value ${findNode.value} is not equal`);
  t.is(node?.right?.color, right?.color, `right color of ${findNode.value} is not equal`);
  t.is(node?.parent?.value, parent?.value, `parent value ${findNode.value} is not equal`);
  t.is(node?.parent?.color, parent?.color, `parent color of ${findNode.value} is not equal`);
}
