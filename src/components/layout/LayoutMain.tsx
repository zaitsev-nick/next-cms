'use client';

import type { PropsWithChildren } from 'react';
import { Header } from './header/Header';
import styles from './LayoutMain.module.scss';


export default function LayoutMain({ children }:
  PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <main className={styles.layout}>
        <div>{children}</div>
      </main>
    </>
  )
}