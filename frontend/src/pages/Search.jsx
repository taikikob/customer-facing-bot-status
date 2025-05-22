import HeaderRow from "../components/HeaderRow"
import JobCounts from "../components/JobCounts"
import "../css/Search.css"
import { useState, useEffect } from "react";
import { authenticate } from "../services/api";

function Search() {
    const [searching, setSearching] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [minBefore, setMinBefore] = useState(0);
    const [statuses, setStatuses] = useState([]);
    const [devNum, setDevNum] = useState(0);

    const handleSearch = (event) => {
        /* Call API calling function here, using minBefore, statuses, devNum */
        event.preventDefault();
        console.log(minBefore);
        console.log(statuses);
        console.log(devNum);
    };

    const handleStatusChange = (event) => {
        const { value, checked } = event.target;

        setStatuses((prev) => 
            checked ? [...prev, value] : prev.filter((status) => status !== value)
        );
    };

    useEffect(()=>{
        const token = localStorage.getItem('authToken');

        if (!token) {
            authenticate();
        }
        console.log(localStorage.getItem('authToken'))
    }, [])

    // create a form
    return (
        <>
            <form onSubmit={handleSearch} className="search-filter-form">
                <div className="field-container">
                    <div className="time-field">
                        <p>
                            Step 1: Show Jobs that Started in the Last X Minutes <b>(Required)</b>
                        </p>
                        {/* Should I make a maximum limit in the time a user can input? */}
                        <input 
                            type="number" 
                            min='1' 
                            step="1" 
                            placeholder="Enter Minutes (Positive Integer)"
                            required
                            onChange={(e) => setMinBefore(e.target.value)}
                        />
                    </div>
                    <div className="status-checklist">
                        <p>
                            Step 2: Select Status of Job <b>(Optional)</b>
                            <br/>
                            If None Selected, All Statuses will be Shown
                        </p>
                        <div>
                            <input type="checkbox" value="Completed" onChange={handleStatusChange}/>
                            <label>Completed</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Waiting" onChange={handleStatusChange}/>
                            <label>Waiting</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Running" onChange={handleStatusChange}/>
                            <label>Running</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Failing" onChange={handleStatusChange}/>
                            <label>Failing</label>
                        </div>
                    </div>
                    <div>
                        <p>
                            Step 3: Select Device Number of Interest <b>(Optional)</b>
                        </p>
                        <input 
                            type="number"
                            min='0' 
                            max='19' 
                            step="1" 
                            placeholder="Enter Device Number (0-19)"
                            onChange={(e) => setDevNum(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" className="search-button">Search</button>
                </div>
            </form>
            <JobCounts />
            <HeaderRow />
        </>
    )
}

export default Search