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
  column?: string;
  index: number;
  block: { id: number; };
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
  item: ItemType;
  index: number;
};

type TemplateType = {
  item: ItemType;
  popupForm: number | null;
  handleClose: () => void;
};

type ProjectType = {
  id: string;
  name: string;
  description: string;
  address: string;
};
