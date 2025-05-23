import HeaderRow from "../components/HeaderRow"
import JobCounts from "../components/JobCounts"
import JobEntry from "../components/JobEntry";
import "../css/Search.css"
import { useState, useEffect } from "react";
import { fetchJobs } from "../services/api";

function Search({ jobs, setJobs }) {
    const [completed, setCompleted] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [running, setRunning] = useState([]);
    const [failed, setFailed] = useState([]);
    const [minBefore, setMinBefore] = useState(0);
    const [statuses, setStatuses] = useState([]);
    const [devNum, setDevNum] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (event) => {
        /* Call API calling function here, using minBefore, statuses, devNum */
        event.preventDefault();
        if (loading) return
        setLoading(true);

        try {
            const time_filtered_jobs = await fetchJobs(minBefore);
            setJobs(time_filtered_jobs);
            setError(null);
        } catch (err){
            console.log(err)
            setError("Failed to filter moveis based on time");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (event) => {
        const { value, checked } = event.target;

        setStatuses((prev) => 
            checked ? [...prev, value] : prev.filter((status) => status !== value)
        );
    };

    useEffect(()=>{
        // manipulate jobs list whenever jobs is updated
        let filtered = jobs.filter(job => job.deviceName && job.deviceName.includes("SSC"));
        setCompleted(filtered.filter(job => job.status === "COMPLETED"));
        setWaiting(filtered.filter(job => (job.status === "RUN_PAUSED" || job.status === "QUEUED" || job.status === "PENDING_EXECUTION")));
        setRunning(filtered.filter(job => (job.status === "UPDATE" || job.status === "DEPLOYED" || job.status === "RUNNING")));
        setFailed(filtered.filter(job => (job.status === "RUN_FAILED" || job.status === "UNKNOWN" || job.status === "RUN_ABORTED" || job.status === "RUN_TIMED_OUT" || job.status === "DEPLOY_FAILED")));
    },[jobs])

    return (
        <>
            <div className="controls">
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
                    </div>
                    <div className="button-container">
                        <button type="submit" className="search-button">Search</button>
                    </div>
                </form>
                <div className="display-options">
                    <div className="display-options-header">Display Options: </div>
                    <div className="display-options-body">
                        <div className="status-checklist">
                            <p>
                                Select Status of Job
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
                                <input type="checkbox" value="Failed" onChange={handleStatusChange}/>
                                <label>Failed</label>
                            </div>
                        </div>
                        <div className="devNum-input">
                            <p>
                                Select Device Number of Interest
                            </p>
                            <input 
                                type="number"
                                min='0' 
                                max='19' 
                                step="1" 
                                placeholder="Enter Device Number (0-19)"
                                onChange={(e) => {
                                    setDevNum(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <JobCounts numCompleted={completed.length} numWaiting={waiting.length} numRunning={running.length} numFailed={failed.length}/>
            <HeaderRow />
            
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="jobs-grid">
                    {!statuses.length || statuses.includes("Completed") ? (
                        <div className="completed">
                            {completed
                                .filter(job => {
                                    if (!devNum) return true; // no filter applied
                                    const paddedDevNum = devNum.toString().padStart(3, "0");
                                    return job.deviceName && job.deviceName.includes(paddedDevNum);
                                })
                                .map((job) => (
                                    <JobEntry job={job} key={job.id}/>
                                ))}
                        </div>
                    ):null}
                    {!statuses.length || statuses.includes("Waiting") ? (
                        <div className="waiting">
                            {waiting
                            .filter(job => {
                                    if (!devNum) return true; // no filter applied
                                    const paddedDevNum = devNum.toString().padStart(3, "0");
                                    return job.deviceName && job.deviceName.includes(paddedDevNum);
                            })
                            .map((job) => (
                                <JobEntry job={job} key={job.id}/>
                            ))}
                        </div>
                    ):null}
                    {!statuses.length || statuses.includes("Running") ? (
                        <div className="running">
                            {running
                            .filter(job => {
                                    if (!devNum) return true; // no filter applied
                                    const paddedDevNum = devNum.toString().padStart(3, "0");
                                    return job.deviceName && job.deviceName.includes(paddedDevNum);
                            })
                            .map((job) => (
                                <JobEntry job={job} key={job.id}/>
                            ))}
                        </div>
                    ):null}
                    {!statuses.length || statuses.includes("Failed") ? (
                        <div className="failed">
                            {failed
                            .filter(job => {
                                    if (!devNum) return true; // no filter applied
                                    const paddedDevNum = devNum.toString().padStart(3, "0");
                                    return job.deviceName && job.deviceName.includes(paddedDevNum);
                            })
                            .map((job) => (
                                <JobEntry job={job} key={job.id}/>
                            ))}
                        </div>
                    ):null}
                </div>
            )}
        </>
    )
}

export default Search