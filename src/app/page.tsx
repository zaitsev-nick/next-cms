import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <h1>Exist session</h1>
      ) : (
        <h1>Not logged in</h1>
      )} 
    </>
  )
}
