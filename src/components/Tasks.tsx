import React, { useState } from 'react'

type Props = { task: { project_id: number, id: number, title: string, completed: boolean } }

const Tasks = ({ task }: Props) => {
    const [check, setcheck] = useState(task.completed)
    return (
        <div key={task.id}>
            <label>
                <span className="checkmark"></span>
                <input type="checkbox" className="max-sm:w-4 max-sm:h-4 form-checkbox m-2 w-4 h-4"
                    checked={check}
                    onChange={(e) => setcheck(e.target.checked)} />
                {task.title}
            </label>
        </div>
    )
}

export default Tasks