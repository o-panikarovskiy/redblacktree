# Binary Search Tree and Red Black Tree

## Usage

```typescript
type Entity = { title?: string; id: number };

const tree = new RedBlackTree<Entity>((a, b) => a.id - b.id);
tree.add({ id: 10 });
tree.add({ id: 9 });
tree.add({ id: 8 });

// find
const ent: Entity = { title: 'some obj', id: 9 };
console.log(tree.find(ent)); // { value:{id: 9}, color:'B', left:{...}, right:{...} } ;

// iterators also works
console.log([...tree]); // [ {id: 8}, { id: 9}, {id: 10} ]

// inorder by nodes:
for (const node of tree.inorder()) {
  console.log(node.color);
}
```
