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
  index: number;
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
};

type ColumnType = {
  children: ReactNode;
  block: Block;
};

type MovableItemType = {
  name: string;
  index: number;
  currentColumnName: string;
  items: ItemType[];
  id: number;
};

type ProjectType = {
  id: string;
  name: string;
  description: string;
  address: string;
};
