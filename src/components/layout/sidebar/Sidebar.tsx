import Image from 'next/image';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import cx from 'classnames';

export function Sidebar() {
  return (
    <aside className={cx(styles.sidebar, 'basis-1/5 bg-gray-200 text-gray-900')}>
      <nav className="grid grid-flow-row auto-rows-max">
        <Link href='/users'>
          users
        </Link>
        <Link href='/test'>
          test
        </Link>
      </nav>
    </aside>
  )
}