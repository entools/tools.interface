type User = {
  id: number;
  // avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profileSettings: string;
};

type ItemType = {
  id: number;
  name: string;
  column: string;
  index?: number;
};

type Block = {
  id: number;
  name: string;
  document: { id: string };
  index: number;
};

type BlockType = {
  index: number;
  block: Block;
  blocks: Block[];
  items: ItemType[];
  setBlocks: Dispatch<SetStateAction<string[]>>;
  setItems: Dispatch<SetStateAction<ItemType[]>>;
  removeBlock: (id: number) => void;
};

type ColumnType = {
  children: ReactNode;
  addItem: (blockName: string) => void;
  removeBlock: (blockId: number) => void;
  block: Block;
};

type MovableItemType = {
  name: string;
  index: number;
  currentColumnName: string;
  items: ItemType[];
  setItems: Dispatch<SetStateAction<ItemType[]>>;
  id: number;
};

type ProjectType = {
  id: string;
  name: string;
  description: string;
  address: string;
};
