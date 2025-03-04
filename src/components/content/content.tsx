import type { PropsWithChildren } from 'react';

import Header from '../header/index';

import style from './content.module.css';

export default function Content({ children }: PropsWithChildren) {
  return (
    <main className={style.content}>
      <Header />
      {children}
    </main>
  );
}
