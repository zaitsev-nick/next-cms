'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserInfo from '@/components/user/UserInfo';

export default function ProfilePage() {
  const { data: session } = useSession();

  console.log(session?.user)

  return <UserInfo />
}