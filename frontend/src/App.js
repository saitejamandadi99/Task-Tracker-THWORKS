
import { BrowserRouter as Router , Routes, Route,Link } from 'react-router-dom';
import CreateTask from './pages/CreateTask/CreateTask'
import Tasks from './pages/Tasks/Tasks'
import UpdateTask from './pages/UpdateTask/UpdateTask'
import './App.css';
function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#282c34',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
    >
      <h2>Task Tracker</h2>
      <nav>
        <Link to="/" style={linkStyle}>All Tasks</Link>
        <Link to="/create" style={linkStyle}>Create Task</Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px',
  fontWeight: '500',
};

function App() {
  return (
    <Router>
        <div className='app-container'>
          <Header />
        
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
