import { useState,useEffect } from "react";

const Tasks = () =>{
    const [tasksList , setTasksList] = useState([])
    const [success,setSuccess] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [insights,setInsights] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchTasks = async ()=>{
        try {
           setIsLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const response = await fetch(`${API_URL}/api/tasks/getAll`,{
                method:'GET',
                headers : {'Content-Type': 'application/json'},
            })
            const responseInsights = await fetch(`${API_URL}/api/tasks/insights`,{
                method:'GET',
                headers : {'Content-Type': 'application/json'},
            })

            const data = await response.json()
            const dataInsights = await responseInsights.json()
            if(response.ok && responseInsights.ok){
                setSuccess(data.message)
                setTasksList(data.tasks)
                setError('')
                setInsights(dataInsights.insights)
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

    const handleDelete = async (taskId) =>{
        try{
            setIsDeleting(true)
            const API_URL = process.env.REACT_APP_API_URL
            const confirmDelete = window.confirm('Do you want to delete this task')
            if (!confirmDelete) return

            const response = await fetch(`${API_URL}/api/tasks/delete/${taskId  }`,{
                method: 'DELETE',
                headers: {"Content-Type":"application/json"}
            })
            const data = await response.json()
            if(response.ok){
                setSuccess(data.message || 'Task deleted successfully')
                setError('')
                setTasksList(tasksList.filter((eachTask)=>taskId !==eachTask._id))
            }
            else{
                setError(data.message || 'Failed to delete the task')
                setSuccess('')

            }
        }
        catch (error) {
            setError(error.message)
        }
        finally{
            setIsDeleting(false)
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
            {insights && <p>{insights}</p>}

            <ul>
                {
                    tasksList.length > 0 ? (
                        tasksList.map(eachTask=>(
                            <li key={eachTask._id}>
                                <strong>{eachTask.title}</strong> - {eachTask.status}
                                <button type="button">Update</button>
                                <button type="button" disabled={isDeleting} onClick={()=>handleDelete(eachTask._id)}>Delete</button>
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