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

type RainRunoffType = {
  id: number;
  roof: string;
  pavements: string;
  tracks: string;
  ground: string;
  cobblestone: string;
  stone: string;
  lawns: string;
  place: string;
  intensity: string;
  condition: string;
  // koef: number;
  timeInit: string;
  lengthPipe: string;
  lengthTray: string;
  velocityPipe: string;
  velocityTray: string;
  flow: string;
};
type ItemType = {
  id: number;
  name: string;
  column?: string;
  index: number;
  block: { id: number; };
  rainRunoff: RainRunoffType;
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
  // blocks: BlockType[];
};
