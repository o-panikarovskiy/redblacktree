import { BinarySearchTree } from './src/bst/bst.js';
import { RedBlackTree } from './src/rbt/rbt.js';

type Entity = { title?: string; id: number };

const bstree = new BinarySearchTree<Entity>((a, b) => a.id - b.id);
bstree.add({ id: 13 });
bstree.add({ id: 12 });
bstree.add({ id: 11 });
bstree.add({ id: 10 });
bstree.add({ id: 9 });
bstree.add({ id: 8 });
bstree.add({ id: 7 });
bstree.add({ id: 6 });
bstree.add({ id: 5 });
bstree.add({ id: 4 });

const rbtree = new RedBlackTree<Entity>((a, b) => a.id - b.id);
rbtree.add({ id: 13 });
rbtree.add({ id: 12 });
rbtree.add({ id: 11 });
rbtree.add({ id: 10 });
rbtree.add({ id: 9 });
rbtree.add({ id: 8 });
rbtree.add({ id: 7 });
rbtree.add({ id: 6 });
rbtree.add({ id: 5 });
rbtree.add({ id: 4 });

console.log(
  JSON.stringify(
    bstree.print((n, b) => `${b}${n.value.id}`),
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    rbtree.print((n, b) => `${b}${n.value.id}${n.color}`),
    null,
    2,
  ),
);
