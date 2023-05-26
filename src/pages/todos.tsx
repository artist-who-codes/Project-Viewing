// import Login from '@/components/Login'
// import { getServerSession } from 'next-auth'
// import { useSession } from 'next-auth/react'
// import React from 'react'

// type Props = { todos: any }

// const index = ({ todos }: Props) => {
//     return (
//         <>
//             {todos.map((todo) => {
//                 return (
//                     <div key={todo.id}>
//                         <p>{todo.userId}</p>
//                         <p>{todo.title}</p>
//                     </div>
//                 )
//             })}
//         </>
//     )
// }

// export default index

// export async function getServerSideProps(context: any, authOptions: any) {
//     const session = await getServerSession(context.req,
//         context.res,
//         authOptions)
//     console.log(session)
//     if (session) {
//         const response1 = await fetch("https://jsonplaceholder.typicode.com/todos")
//         const data1 = await response1.json()
//         return ({ props: { todos: data1 } })
//     }
//     else {
//         const response2 = await fetch("https://jsonplaceholder.typicode.com/posts")
//         const data2 = await response2.json()
//         return ({ props: { todos: data2 } })
//     }
// }

import { getSession } from "next-auth/react"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequest, NextApiResponse } from "next"
import Login from "@/components/Login"
import { Session } from "inspector"
import NavBar from "@/components/NavBar"


type Props = { data: any, session: Session }

const index = ({ data, session }: Props) => {
    return (
        <div className="">
            {session ? <> <NavBar /><div className=" mx-24 my-10 text-2xl font-bold">This is Todos page</div> </> : <><Login /><div className=" mx-24 my-10 text-2xl font-bold">This is posts page</div></>}
            {data.map((todo) => {
                return (
                    <div className="py-3 mx-24" key={todo.id}>
                        <p>User:{todo.userId}</p>
                        <p>{todo.id}.{todo.title}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default index

export async function getServerSideProps(context: { req: any | NextApiRequest | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> }); res: any | ServerResponse<IncomingMessage> | NextApiResponse }) {
    const session = await getSession(context)


    if (session) {
        const response1 = await fetch("https://jsonplaceholder.typicode.com/todos")
        const data1 = await response1.json()
        return { props: { session: session, data: data1 } }
    }
    else {
        const response2 = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data2 = await response2.json()
        return { props: { session: session, data: data2 } }
    }

}


