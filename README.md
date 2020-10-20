# Binary Search Tree and Red Black Tree implemenation in typescript

## Intall
```
npm i
```

## Usage
```typescript
type Entity = { title?: string; id: number };

const bstree = new BinarySearchTree<Entity>((a, b) => a.id - b.id);
bstree.add({ id: 10 });
bstree.add({ id: 9 });
bstree.add({ id: 8 });

const rbtree = new RedBlackTree<Entity>((a, b) => a.id - b.id);
rbtree.add({ id: 10 });
rbtree.add({ id: 9 });
rbtree.add({ id: 8 });

const resBST = bstree.print((n, b) => `${b}${n.value.id}`);
const resRBT = rbtree.print((n, b) => `${b}${n.value.id}${n.color}`);

console.log(JSON.stringify(resBST, null, 2));
console.log(JSON.stringify(resRBT, null, 2));
```
