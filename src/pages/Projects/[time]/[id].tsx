import Login from '@/components/Login'
import { ProjectType } from '@/types/ProjectType'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { NextPage } from 'next';
import NavBar from '@/components/NavBar'
type Props = {}

const Project: NextPage = (props: Props) => {
    const router = useRouter()
    const query = router.query
    const [project, setProject] = useState<ProjectType>()
    async function getData(time: string, id: string) {
        const response = await fetch(`/api/Projects/${time}/${id}`)
        const data = await response.json();
        setProject(data)
    }
    useEffect(() => {
        const time = query.time as string
        const id = query.id as string
        if (time && id) {
            getData(time, id)
        }
    }, [query])
    const { data: session } = useSession()

    if (!session) {
        return (<><Login /></>)
    }
    return (

        <div>
            <NavBar />
            {project ? <div className='mx-20 my-14'>
                <div className="text-3xl font-bold p-3">{project.title}</div>
                <p className='indent-32 '>{project.description}</p>
                <p className='text-2xl font-bold py-7'>Images Regarding {project.title}</p>
                <div className='flex mx-5'>
                    <Image
                        className='p-5'
                        alt="alt text."
                        src={`${project.image1}`}
                        width={350}
                        height={200}
                    />
                    <Image
                        className='p-5'
                        alt="alt text."
                        src={`${project.image2}`}
                        width={350}
                        height={200}
                    />
                    <Image
                        className='p-5'
                        alt="alt text."
                        src={`${project.image3}`}
                        width={350}
                        height={200}
                    />
                </div>
            </div> :
                <p className='mx-20 my-5 text-2xl font-bold p-3'>Loading...</p>}
        </div>
    )
}

export default Project