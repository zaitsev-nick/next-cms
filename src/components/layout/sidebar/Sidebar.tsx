import Image from 'next/image';
import styles from './Sidebar.module.scss';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Image src='next.svg' alt='' width={50} height={50} />
      <nav>
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