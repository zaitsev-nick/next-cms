'use client'

import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.scss';
import Link from 'next/link';
import cx from 'classnames';

export function Header() {
  const { data: session } = useSession();

  const userSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  };

  return (
    <header className={cx(styles.header, 'bg-gray-900 text-gray-100 shadow w-full')}>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link href='/' className='flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0'>
          <span className='ml-3 text-xl'>Logo</span>
        </Link> 
        <nav className='flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto'>
          {session?.user ? (
            <Link href='#' onClick={userSignOut}  className='mx-5 cursor-pointer uppercase hover:text-indio-300'>
              logout
            </Link>
          ) : (
            <>
              <Link href='/login' className='mx-5 cursor-pointer uppercase hover:text-indio-300'>
                login
              </Link>
              <Link href='/register' className='mx-5 cursor-pointer uppercase hover:text-indio-300'>
                register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}