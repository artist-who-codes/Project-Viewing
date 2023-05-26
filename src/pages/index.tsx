
import Login from '@/components/Login'
import NavBar from '@/components/NavBar'
import { useSession, getSession } from "next-auth/react"
import CredentialsSignin from '@/components/CredentialsSignin'



export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return (<Login />)
  }

  return (
    <>
      <NavBar />
      <div className='py-8 px-20'>
        <h1 className='text-4xl font-bold'>{(session != undefined) ? `${session.user.name}` : 'Hehe'}</h1>
      </div>
    </>
  )
}