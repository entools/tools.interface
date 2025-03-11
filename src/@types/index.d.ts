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

type BlockType = {
  index: number;
  block: string;
  blocks: string[];
  items: ItemType[];
  setBlocks: Dispatch<SetStateAction<string[]>>;
  setItems: Dispatch<SetStateAction<ItemType[]>>;
};

type ColumnType = {
  children: ReactNode;
  title: string;
  addItem: (block: string) => void;
  removeBlock: (title: string) => void;
};

type MovableItemType = {
  name: string;
  index: number;
  currentColumnName: string;
  items: ItemType[];
  setItems: Dispatch<SetStateAction<ItemType[]>>;
  id: number;
};
