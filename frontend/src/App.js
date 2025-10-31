
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import CreateTask from './pages/CreateTask/CreateTask'
import Tasks from './pages/Tasks/Tasks'
import UpdateTask from './pages/UpdateTask/UpdateTask'
import './App.css';

function App() {
  return (
    <Router>
        <div className='app-container'>
          <h1>Welcome to the Task Tracker</h1>
        
        <Routes>
          <Route path ='/' element={<Tasks />} />
          <Route path='/create' element={<CreateTask />} />
          <Route path ='/update/:id' element={<UpdateTask />} />
        </Routes>
        </div>
    </Router>

  );
}

export default App;
