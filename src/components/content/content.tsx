// import React from 'react';
import type { PropsWithChildren } from 'react';

import Header from '../header/index.tsx';
import Footer from '../footer/index.ts';

import style from './content.module.css';

export default function Content({ children }: PropsWithChildren) {
  return (
    <main className={style.content}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
