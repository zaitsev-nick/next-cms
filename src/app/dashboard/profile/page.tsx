'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserInfo from '@/components/user/UserInfo';

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('api/auth/signin?callbackUrl=/dashboard/profile')
    },
  })

  console.log(session?.user)

  return <UserInfo />
}