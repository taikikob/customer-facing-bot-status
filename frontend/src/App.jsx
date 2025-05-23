import './css/App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from "react-router-dom";
import Search from './pages/Search';
import Starred from './pages/Starred';
import { useState } from 'react';

function App() {

  const [jobs, setJobs] = useState([]);

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Search jobs={jobs} setJobs={setJobs}/>}/>
          <Route path='/starred' element={<Starred/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
