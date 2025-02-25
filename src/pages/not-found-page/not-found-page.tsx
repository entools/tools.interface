import { Text, Link } from '@gravity-ui/uikit';

import style from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div className={style.container}>
      <Text
        variant="display-1"
      >
        404
      </Text>
      <Text
        variant="header-1"
      >
        Нет такой страницы
      </Text>
      <Text variant="subheader-1">
        {'Вы можете перейти на '}
        <Link
          href="/"
          className={style.link}
        >
          главную
        </Link>
      </Text>
    </div>
  );
}
