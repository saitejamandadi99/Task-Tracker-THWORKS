import { useState, useEffect } from "react";

const CreateTask = () =>{
    const [formList, setFormList] = useState({})
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const submitFormData = async (e) =>{
        e.preventDefault()
        try {
            setIsLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const response = await fetch(`${API_URL}\tasks\api\create`,{
                method:'POST',
                headers : {'Content-Type': 'application/json'},
                body:JSON.stringify(formList)
            })

            const data = await response.json()
            console.log(data)            
        } catch (error) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        submitFormData()
    }, [formList])
    return(
        <form onSubmit={submitFormData}>
            <div className="inputLabelContainer">
                <label htmlFor="titleInput">Title</label>
                <input type='text' id = 'titleInput' />
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="descriptionInput">Description: </label>
                <textarea id = 'descriptionInput'></textarea>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="priorityInput">Priority: </label>
                <select id ='priorityInput' className="priorityInput" >
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="statusInput">Status: </label>
                <select id ='statusInput' className="statusInput" >
                    <option value='Open'>Open</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>

            <div className="inputLabelContainer">
                <label htmlFor="dateInput">Date: </label>
                <input type='date' id = 'dateInput' className="dateInput" />
            </div>
            <button type="submit">
                Create
            </button>
        </form>
    )

}

export default CreateTask