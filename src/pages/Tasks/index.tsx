import Login from '@/components/Login'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import Tasks from '@/components/Tasks'
import { TaskType } from '@/types/TaskType'

type Props = {}

const index = (props: Props) => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([])
    const { data: session } = useSession()
    useEffect(() => {
        async function getdata() {
            const response = await fetch("/api/Tasks")
            const data = await response.json()
            setTasks(data)
            setFilteredTasks(data)
        }
        getdata()

    }, [])
    useEffect(() => {
        console.log(filteredTasks)
    }, [filteredTasks])


    function filterbyTime(time: string) {
        let newtasks: TaskType[]
        if (time === "past") {
            newtasks = tasks.filter((task) => task.project_id === 1 || task.project_id === 2 || task.project_id === 3)
        }
        else if (time === "present") {
            newtasks = tasks.filter((task) => task.project_id === 4 || task.project_id === 5 || task.project_id === 6)
        }
        else {
            newtasks = tasks.filter((task) => task.project_id === 7 || task.project_id === 8 || task.project_id === 9)
        }
        setFilteredTasks(newtasks)
    }


    if (session) {
        return (
            <>
                <NavBar />
                {filteredTasks.length != 0 ?
                    <div className='mx-20 my-14 flex'>
                        <div>
                            {
                                filteredTasks.map((task) => {
                                    return (
                                        <div key={task.id}>
                                            <Tasks task={task} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='mx-20'>
                            <a rel="noopener noreferrer" href="#" className="peer text-2xl font-medium transition duration-150 ease-in-out flex items-center px-4 -mb-1 border-b-2 dark:border-transparent focus:dark:text-violet-400 focus:dark:border-violet-400">Filter By</a>
                            <div className='hidden peer-hover:flex rounded-lg hover:flex w-[200px] flex-col peer-hover:bg-[#101827] drop-shadow-lg '>
                                <a onClick={() => { filterbyTime("past") }} className='px-5 py-3 rounded-t-lg hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Past</a>
                                <a onClick={() => { filterbyTime("present") }} className='px-5 py-3 hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Present</a>
                                <a onClick={() => { filterbyTime("future") }} className='px-5 py-3 hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>Future</a>
                                <a onClick={() => { setFilteredTasks(tasks) }} className='px-5 py-3 rounded-b-lg hover:bg-violet-300 bg-[#101827] bg-violet-400 text-gray-900 font-semibold'>All</a>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='mx-20 my-5 text-2xl font-bold p-3'>Loading...</div>}

            </>
        )
    }
    else {
        return (<Login />)
    }
}

export default index