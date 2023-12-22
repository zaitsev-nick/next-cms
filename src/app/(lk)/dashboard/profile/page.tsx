'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('api/auth/signin?callbackUrl=/dashboard/profile')
    },
  })

  console.log(session?.user)

  return <div>tt</div>
}