import { useState,useEffect } from "react";

const Tasks = () =>{
    const [tasksList , setTasksList] = useState([])
    const [success,setSuccess] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchTasks = async ()=>{
        try {
           setIsLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const response = await fetch(`${API_URL}/api/tasks/getAll`,{
                method:'GET',
                headers : {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            if(response.ok){
                setSuccess(data.message)
                setTasksList(data.tasks)
                setError('')
            }
            else{
                setError(data.message || "Failed to fetch tasks");
            }
            
        }  catch (error) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchTasks()
    },[])

    return(
        <div>
            <h1>All Tasks</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}

            <ul>
                {
                    tasksList.length > 0 ? (
                        tasksList.map(eachTask=>(
                            <li key={eachTask._id}>
                                <strong>{eachTask.title}</strong> - {eachTask.status}
                            </li>
                        ))

                    ) : (
                        !isLoading && <p>No tasks found.</p>
                    )
                }
            </ul>

        </div>
    )
}

export default Tasks