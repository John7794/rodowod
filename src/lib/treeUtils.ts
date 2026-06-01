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

export function flattenGenerationalTree(tree: TreeItem[], generation = 1): (Person & { level: number, itemIndex: string })[] {
  const flattened: (Person & { level: number, itemIndex: string })[] = [];
  
  function traverse(nodes: TreeItem[], currentLevel: number, prefix: string) {
    nodes.forEach((node, index) => {
      const currentPrefix = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      flattened.push({
        ...node,
        level: currentLevel,
        itemIndex: currentPrefix,
      });
      if (node.children.length > 0) {
        traverse(node.children, currentLevel + 1, currentPrefix);
      }
    });
  }

  traverse(tree, generation, '');
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
