import React from 'react'
import { signOut, useSession } from 'next-auth/react'

type Props = {}

const NavBar = (props: Props) => {
    const { data: session } = useSession()
    return (
        <div>
            <header className="px-16 py-4 dark:bg-gray-800 dark:text-gray-100 ease-in-out">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex">
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <div className="relative flex-shrink-0">
                                <span className="absolute bottom-0 right-0 w-3 h-3 dark:bg-green-600 border rounded-full dark:text-gray-100 dark:border-gray-900"></span>
                                <img src={session ? `${session.user.image}` : ""} alt="" className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700" />
                            </div>
                        </a>
                        <ul className="items-stretch hidden space-x-3 lg:flex">
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent focus:dark:text-violet-400 focus:dark:border-violet-400">Home</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/Tasks" className="flex items-center  px-4 -mb-1 border-b-2 dark:border-transparent focus:dark:text-violet-400 focus:dark:border-violet-400">Tasks</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/todos" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent focus:dark:text-violet-400 focus:dark:border-violet-400">Todos</a>
                            </li>
                            <li className="">
                                <a rel="noopener noreferrer" href="#" className="peer transition duration-150 py-5 ease-in-out flex items-center px-4 -mb-1 border-b-2 dark:border-transparent focus:dark:text-violet-400 focus:dark:border-violet-400">Projects</a>
                                <div className='hidden peer-hover:flex rounded-lg hover:flex w-[200px] flex-col peer-hover:bg-[#101827] drop-shadow-lg '>
                                    <a href='/Projects/past' className='px-5 py-3 rounded-t-lg hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Past</a>
                                    <a href='/Projects/present' className='px-5 py-3 hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Present</a>
                                    <a href='/Projects/future' className='px-5 py-3 rounded-b-lg hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Future</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button onClick={() => { signOut() }} className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign Out</button>
                    </div>
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default NavBar