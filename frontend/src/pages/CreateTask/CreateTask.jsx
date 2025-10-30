import { useState } from "react";

const CreateTask = () =>{
    const [formList, setFormList] = useState({
        title:'',
        description:'',
        priority:'Low',
        status:'Open',
        dueDate:''
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (e) =>{
        setFormList({...formList, [e.target.id.replace('Input', '')]: e.target.value})
    }
    const submitFormData = async (e) =>{
        e.preventDefault()
        try {
            setIsLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const response = await fetch(`${API_URL}/api/tasks/create`,{
                method:'POST',
                headers : {'Content-Type': 'application/json'},
                body:JSON.stringify(formList)
            })

            const data = await response.json()
            if(response.ok){
                setSuccess('Tasks fetched Successfully')
                setError('')
                console.log(data)
                setFormList({title:'',description:'',priority:'Low',status:'Open',dueDate:'' })
            }  
            else{
                setError(data.message || "Failed to create task");
            }          
        } catch (error) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return(
        <form onSubmit={submitFormData}>
            <div className="inputLabelContainer">
                <label htmlFor="titleInput">Title</label>
                <input type='text' id = 'titleInput' value={formList.title} onChange={handleChange} />
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="descriptionInput">Description: </label>
                <textarea id = 'descriptionInput' value={formList.description} onChange={handleChange} ></textarea>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="priorityInput">Priority: </label>
                <select id ='priorityInput' className="priorityInput" value={formList.priority} onChange={handleChange} >
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="statusInput">Status: </label>
                <select id ='statusInput' className="statusInput" value={formList.status} onChange={handleChange} >
                    <option value='Open'>Open</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="dueDateInput">dueDate: </label>
                <input type='date' id = 'dueDateInput' className="dueDateInput" value={formList.dueDate} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading?'Creating':'Create'}
            </button>
            {success && <p style={{color:'green'}}>{success}</p>}
            {error && <p style={{color:'red'}}>{error}</p>}
        </form>
    )

}

export default CreateTask