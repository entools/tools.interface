type User = {
  id: number;
  name: string;
  about: string;
  avatar: string;
  email: string;
};

type ItemType = {
  id: number;
  name: string;
  column: string;
  index?: number;
};

type BlockType = {
  index: number;
  item: string;
  setBlocks: (blocks: string[] | ((prevState: string[]) => string[])) => void;
  // addItem: (block: string) => void;
  blocks: string[];
  items: ItemType[];
  setItems: (items: ItemType[]) => void;
};

type ColumnType = {
  children: ReactNode;
  className: string;
  title: string;
  addItem: (block: string) => void;
  removeBlock: (title: string) => void;
};
