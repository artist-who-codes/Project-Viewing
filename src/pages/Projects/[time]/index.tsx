import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProjectType } from '@/types/ProjectType'
import { useSession } from 'next-auth/react'
import Login from '@/components/Login'
import NavBar from '@/components/NavBar'
import Link from 'next/link'

type Props = {}

const Project = (props: Props) => {
    const router = useRouter()
    const { time } = router.query
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [loading, setLoading] = useState(true)
    async function getData() {
        const response = await fetch(`/api/Projects/${time}`)
        const data = await response.json()
        setProjects(data)
        setLoading(false)
        return (data)

    }
    getData()
    const { data: session } = useSession()

    if (!session) {
        return (<><Login /></>)
    }
    return (
        <div>
            <NavBar />
            {!loading ?
                <div className='mx-24 my-40 text-center'>
                    <ul>
                        {projects.map((project) => {
                            return (
                                <div className="my-10" key={project.project_id}>
                                    <Link href={`/Projects/${time}/${project.project_id}`}>
                                        <li className="text-3xl font-medium" >{project.title}</li>
                                        <p className=''>Some sample description about this {project.title}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                :
                <p className='mx-20 my-5 text-2xl font-bold p-3'>Loading...</p>}
        </div >
    )
}

export default Project

