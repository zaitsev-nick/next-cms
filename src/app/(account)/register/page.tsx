'use client';

import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if(session?.user) {
    router.push('/dashboard/profile')
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(!email || !password || !username) {
      setError('All fields are necessary!');
      return;
    } else {
      setError('');
    }

    try {
      const response = await fetch('api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if(response.ok) {
        router.push('/login')
      } else {
        setError('Registration failed');
      }
    } catch(error) {
      setError(`${error}`);
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
            <h5 className="my-6 text-xl font-semibold">Register / Sign Up </h5>
            <form onSubmit={handleSubmit} className="text-start">
              <div className="grid grid-cols-1">
                <div className="mb-4">
                  <label className="font-semibold" htmlFor="username">Your Name:</label>  
                  <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
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

                <div className="mb-4">
                  <div className="flex items-center w-full mb-0">
                    <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C" />
                    <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">I Accept <Link href="#" className="text-indigo-600">Terms And Condition</Link></label>
                  </div>
                </div>

                <div className="mb-4">
                  <input type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Register" />
                </div>

                <div className="text-center">
                  <span className="text-slate-400 me-2">Already have an account ? </span> <Link href="/login" className="text-black dark:text-white font-bold inline-block">Sign in</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}