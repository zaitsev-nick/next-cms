'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function AuthLogin() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if(session?.user) {
    router.push('/dashboard/profile')
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInData = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    console.log(signInData)
    
    if(signInData?.error) {
      setError(`${signInData.error}`);
    } else {
      router.push('/dashboard/profile')
    }
  }

  return (
    <>
      <section className="md:h-screen py-36 flex items-center  bg-no-repeat bg-center bg-cover" style={{backgroundImage:"url('/images/login-bg.jpeg')"}}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="container relative">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
              <Link href="/"><Image src="/images/logo-dark.svg" height={64} width={72} className="mx-auto" alt="" /></Link>
              <h5 className="my-6 text-xl font-semibold">Login / Sign In</h5>
              <form onSubmit={handleSubmit} className="text-start">
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="email">Email Address:</label>
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="password">Password:</label>
                    <input 
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="flex items-center mb-0">
                        <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
                        <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                    </div>
                    <p className="text-slate-400 mb-0"><Link href="/reset-password" className="text-slate-400">Forgot password ?</Link></p>
                  </div>

                  <div className="mb-4">
                    <input type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Login / Sign in" />
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">Do not have an account ?</span> <Link href="/register" className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                  </div>

                  {error && (
                    <div className='bg-red-500 text-white mt-6 p-2 inline-flex'>{error}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}