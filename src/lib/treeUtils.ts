import { Person, TreeItem } from '../types';

export function buildGenerationalTree(people: Person[]): TreeItem[] {
  const itemMap = new Map<string, TreeItem>();
  const rootItems: TreeItem[] = [];

  // Initialize all items in the map
  people.forEach(person => {
    itemMap.set(person.id, { ...person, children: [] });
  });

  // Assign children to their parents
  itemMap.forEach(item => {
    if (item.parentId && itemMap.has(item.parentId)) {
      itemMap.get(item.parentId)!.children.push(item);
    } else {
      rootItems.push(item);
    }
  });

  // Sort children by order if available, otherwise by id/name
  const sortChildren = (items: TreeItem[]) => {
    items.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return a.id.localeCompare(b.id);
    });
    items.forEach(item => sortChildren(item.children));
  };

  sortChildren(rootItems);

  return rootItems;
}

export function flattenGenerationalTreeClassic(tree: TreeItem[], generation = 1): (Person & { level: number, treeIndex: string })[] {
  const flattened: (Person & { level: number, treeIndex: string })[] = [];
  
  const rootSymbols = ['+', '♣', '♦', '♥', '♠', '★', '●'];

  function traverse(nodes: TreeItem[], currentLevel: number) {
    nodes.forEach((node, index) => {
      let treeIndex = '';
      if (currentLevel === 1) {
        treeIndex = rootSymbols[index % rootSymbols.length]; 
      } else {
        const letter = String.fromCharCode(64 + currentLevel - 1);
        treeIndex = `${letter}${index + 1}`;
      }
      
      flattened.push({
        ...node,
        level: currentLevel,
        treeIndex: treeIndex,
      });
      if (node.children.length > 0) {
        traverse(node.children, currentLevel + 1);
      }
    });
  }

  traverse(tree, generation);
  return flattened;
}

export function romanize(num: number): string {
  if (isNaN(num)) return NaN.toString();
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop()! + (i * 10)] || "") + roman;
  return Array(new Array(+digits.join("") + 1).join("M")).join("") + roman;
}
