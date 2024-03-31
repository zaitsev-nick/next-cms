'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
//import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuSearch, AiOutlineCopy, AiOutlineUser, LiaSignOutAltSolid } from '@/assets/icons/icons';
import { usePathname } from 'next/navigation';

export function Header() {
  const { data: session } = useSession();
  const [isMenu, setisMenu] = useState(false);
  const [isDropdown, openDropdown] = useState(true);
  const [navbarSticky, setNavbarSticky] = useState(false);
  const navigationRef = useRef<any>(null);

  let [menu, setMenu] = useState('');
  let pathname = usePathname();

  useEffect(() => {
    setMenu(pathname);

    function windowScroll() {
      setNavbarSticky( document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", windowScroll);
    }
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  }, [pathname]);

  const userSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  };

  const toggleMenu = () => {
    setisMenu(!isMenu);
    if (navigationRef.current) {
      // @ts-ignore:next-line
      const anchorArray = Array.from(navigationRef.current).getElementsByTagName("a");
      anchorArray.forEach((element: any) => {
        element.addEventListener('click', (elem: any) => {
          const target = elem.target.getAttribute("href")
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle('open');
            }
          }
        })
      });
    }
  };


  return (
    <header id="topnav" className={`${navbarSticky ? "nav-sticky" : "defaultscroll"}`}>
        <div className="container relative">
            <Link className="logo ps-0" href="/">
                <Image src="/images/logo-dark.svg" width={30} height={30} className="inline-block sm:hidden" alt="" />
                <div className="sm:block hidden">
                    <Image src="/images/logo-dark.svg" width={138} height={24} className="inline-block dark:hidden" alt="" />
                    <Image src="/images/logo-light.svg" width={138} height={24} className="hidden dark:inline-block" alt="" />
                </div>
            </Link>

            <div className="menu-extras">
                <div className="menu-item">
                    <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </div>
            </div>

            <ul className="buy-button list-none space-x-1 mb-0">
                {/* <!-- <li className="sm:inline-block hidden mb-0"> --> */}
                <li className="inline-block mb-0">
                    <div className="form-icon relative">
                        <LuSearch className="text-xl absolute top-1/2 -translate-y-1/2 start-3"/>
                        <input type="text" className="form-input sm:w-44 w-28 ps-10 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-3xl outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0 bg-white" name="s" id="searchItem" placeholder="Search..." />
                    </div>
                </li>


                <li className="dropdown inline-block relative ps-1">
                    <button onClick={() => openDropdown(!isDropdown)}  data-dropdown-toggle="dropdown" className="dropdown-toggle size-9  items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white inline-flex" type="button">
                        <Image  src="/images/user.jpeg" width={34} height={34} className="rounded-full" alt="" />
                    </button>

                    <div className= {`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800  ${isDropdown ? 'hidden' : 'block'}`}>
                   
                        <div className="relative">
                            <div className="py-8 bg-gradient-to-tr from-indigo-600 to-red-600"></div>
                            <div className="absolute px-4 -bottom-7 start-0">
                                <div className="flex items-end">
                                    <Image src="/images/user.jpeg" width={34} height={34} className="rounded-full w-10 h-w-10 shadow dark:shadow-gray-700" alt="" />

                                    <span className="font-semibold text-[15px] ms-1">Nick Zaitsau</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 px-4">
                            <h5 className="font-semibold text-[15px]">Wallet:</h5>
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] text-slate-400">qhut0...hfteh45</span>
                                <Link href="#!" className="text-indigo-600"><AiOutlineCopy/></Link>
                            </div>
                        </div>

                        <div className="mt-4 px-4">
                            <h5 className="text-[15px]">Balance: <span className="text-indigo-600 font-semibold">0.00045ETH</span></h5>
                        </div>

                        <ul className="py-2 text-start">
                            <li>
                                <Link href="/nft-creator-profile" className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-indigo-600"><AiOutlineUser className="me-2"/> Profile</Link>
                            </li>
                            <li>
                                <Link href="/nft-creator-profile-edit" className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-indigo-600"><IoSettingsOutline className="me-1 w-5"/> Settings</Link>
                            </li>
                            <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>

                            {session?.user ? (
                              <li>
                                <Link href='#' onClick={userSignOut} className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-indigo-600"><LiaSignOutAltSolid className="me-2 size-4"/> Logout</Link>
                              </li>
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
                        </ul>
                    </div>
                </li>
            </ul>

            <div id="navigation" ref={navigationRef} className={ `display: ${isMenu}` ? 'block' : 'none' }>
                <ul className="navigation-menu justify-start">
                    <li className={menu === "/index-nft" ? "active" : ""}><Link href="/index-nft" className="sub-menu-item">Home</Link></li>

                    <li className={`${["/nft-explore", "/nft-auction","/nft-collection", "/nft-creators","/nft-creator-profile","/nft-creator-profile-edit","/nft-create-item","/nft-detail"].includes(menu)? "active" : ""} has-submenu parent-parent-menu-item`}>
                        <Link href="#!">NFTs</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={menu === "/nft-explore" ? "active" : ""}><Link href="/nft-explore" className="sub-menu-item">Explore</Link></li>
                            <li className={menu === "/nft-auction" ? "active" : ""}><Link href="/nft-auction" className="sub-menu-item">Auction</Link></li>
                            <li className={menu === "/nft-collection" ? "active" : ""}><Link href="/nft-collection" className="sub-menu-item">Collections</Link></li>
                            <li className={`${["/nft-creators", "/nft-creator-profile","/nft-creator-profile-edit"].includes(menu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#!"> Creator  </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={menu === "/nft-creators" ? "active" : ""}><Link href="/nft-creators" className="sub-menu-item"> Creators</Link></li>
                                    <li className={menu === "/nft-creator-profile" ? "active" : ""}><Link href="/nft-creator-profile" className="sub-menu-item"> Creator Profile </Link></li>
                                    <li className={menu === "/nft-creator-profile-edit" ? "active" : ""}><Link href="/nft-creator-profile-edit" className="sub-menu-item"> Profile Edit </Link></li>
                                </ul>
                            </li>
                            <li className={menu === "/nft-create-item" ? "active" : ""}><Link href="/nft-create-item" className="sub-menu-item">Create NFT</Link></li>
                            <li className={menu === "/nft-detail" ? "active" : ""}><Link href="/nft-detail" className="sub-menu-item">Single NFT</Link></li>
                        </ul>
                    </li>

                    <li className={menu === "/nft-wallet" ? "active" : ""}><Link href="/nft-wallet" className="sub-menu-item">Wallet</Link></li>

                    <li className={`${["/auth-login", "/auth-signup","/auth-re-password", "/auth-lock-screen","/page-terms","/page-privacy","/page-comingsoon","/page-maintenance","/page-error","/page-thankyou"].includes(menu)? "active" : ""} has-submenu parent-parent-menu-item`}>
                        <Link href="#!">Pages</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={`${["/auth-login", "/auth-signup","/auth-re-password", "/auth-lock-screen"].includes(menu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#!"> Auth Pages </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={menu === "/auth-login" ? "active" : ""}><Link href="/auth-login" className="sub-menu-item">Login</Link></li>
                                    <li className={menu === "/auth-signup" ? "active" : ""}><Link href="/auth-signup" className="sub-menu-item">Signup</Link></li>
                                    <li className={menu === "/auth-re-password" ? "active" : ""}><Link href="/auth-re-password" className="sub-menu-item">Reset Password</Link></li>
                                    <li className={menu === "/auth-lock-screen" ? "active" : ""}><Link href="/auth-lock-screen" className="sub-menu-item">Lock Screen</Link></li>
                                </ul>
                            </li>
                            <li className={`${["/page-terms", "/page-privacy"].includes(menu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#!"> Utility </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={menu === "/page-terms" ? "active" : ""}><Link href="/page-terms" className="sub-menu-item">Terms of Services</Link></li>
                                    <li className={menu === "/page-privacy" ? "active" : ""}><Link href="/page-privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                </ul>
                            </li>
                            <li className={`${["/page-comingsoon", "/page-maintenance","/page-error","/page-thankyou"].includes(menu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#!"> Special</Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={menu === "/page-comingsoon" ? "active" : ""}><Link href="/page-comingsoon" className="sub-menu-item">Coming Soon</Link></li>
                                    <li className={menu === "/page-maintenance" ? "active" : ""}><Link href="/page-maintenance" className="sub-menu-item">Maintenance</Link></li>
                                    <li className={menu === "/page-error" ? "active" : ""}><Link href="/page-error" className="sub-menu-item">Error</Link></li>
                                    <li className={menu === "/page-thankyou" ? "active" : ""}><Link href="/page-thankyou" className="sub-menu-item">Thank you</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className={menu === "/contact-one" ? "active" : ""}><Link href="/contact-one" className="sub-menu-item">Contact</Link></li>
                </ul>
            </div>
        </div>
    </header>
  )
  
}