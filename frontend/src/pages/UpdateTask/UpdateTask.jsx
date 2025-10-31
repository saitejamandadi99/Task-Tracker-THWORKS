import {useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateTask = () =>{
    const {id} = useParams();
    const navigate = useNavigate(); 

    const [taskData, setTaskData] = useState([])
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const API_URL = process.env.REACT_APP_API_URL 

    const fetchTasks = async () =>{
        try{
            const response = await fetch(`${API_URL}/api/tasks/getAll`)
            const data = response.json()
            const found = data.tasks.find((eachTask)=>eachTask._id === id)
            if (found) setTaskData(found)
        }
        catch(error){
            setError(error.message)
        }
    }

    useEffect(()=>{
        fetchTasks()
    },[id, API_URL])

    const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/tasks/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("Task updated successfully!");
        setTimeout(() => navigate("/tasks"), 1000);
      } else {
        setError(data.message || "Failed to update task");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Update Task</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate ? taskData.dueDate.split("T")[0] : ""}
          onChange={handleChange}
        />
 
        <select name="status" value={taskData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default UpdateTask