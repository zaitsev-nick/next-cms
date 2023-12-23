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
  const [passwordToConfirm, setPasswordToConfirm] = useState('');
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
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
        {/* Leaft Side */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-20">
            <h2 className="font-mono mb-5 text-4xl font-bold">Register</h2>
            <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
              Register a new account.
            </p>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans"
              placeholder="Enter your email"
            />
            <input 
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full p-6 mt-6 border border-gray-300 rounded-md placeholder:font-sans"
              placeholder="Enter your username"
            />
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-6 mt-6 border border-gray-300 rounded-md placeholder:font-sans"
              placeholder="Enter your password"
            />
            <input 
              type="password"
              id="passwordToConfirm"
              value={passwordToConfirm}
              onChange={(event) => setPasswordToConfirm(event.target.value)}
              className="w-full p-6 mt-6 border border-gray-300 rounded-md placeholder:font-sans"
              placeholder="Re-enter your password"
            />
            <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <button className="w-full md:width-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90">
                <span>Register</span>
              </button>
            </div>
            {error && (
              <div className='bg-red-500 text-white mt-6 p-2 inline-flex'>{error}</div>
            )}
          </div>
        </form>

        {/* Right Side */}
        <Image src='/bg-login.jpg' alt='' width={1000} height={1000} className="w-[430px] hidden md:block rounded-r-2xl" />
      </div>
    </div>
  </>
  )
}