import { Link, Icon } from '@gravity-ui/uikit';
import { ChevronLeft } from '@gravity-ui/icons';

export type FormPayload = Omit<User, 'id'>;

export default function HomeButton() {
  return (
    <Link
      href="/"
      view="normal"
    >
      <Icon data={ChevronLeft} size={16} />
    </Link>
  );
}
