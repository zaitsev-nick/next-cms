import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)

  return (
    <>
      {session?.user ? (
        <h1>Exist session. User {session?.user.username}</h1>
      ) : (
        <h1>Not logged in</h1>
      )} 
    </>
  )
}
