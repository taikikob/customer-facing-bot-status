import ControlBar from "../components/ControlBar";
import HeaderRow from "../components/HeaderRow"
import JobCounts from "../components/JobCounts"
import JobEntry from "../components/JobEntry";
import "../css/Search.css"
import { useState, useEffect } from "react";

function Search({ jobs, setJobs }) {
    const [completed, setCompleted] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [running, setRunning] = useState([]);
    const [failed, setFailed] = useState([]);
    const [showStarred, setShowStarred] = useState(false);
    const [starred, setStarred] = useState(()=> {
        const stored = localStorage.getItem("Starred");
        return stored ? JSON.parse(stored) : [];
    });
    const [statuses, setStatuses] = useState([]);
    const [devNum, setDevNum] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(()=> {
        console.log(JSON.stringify(starred));
        localStorage.setItem("Starred", JSON.stringify(starred));
        console.log(localStorage.getItem("Starred"));
    }, [starred])

    useEffect(()=>{
        // manipulate jobs list whenever jobs is updated
        let filtered = jobs.filter(job => job.deviceName && job.deviceName.includes("SSC"));
        setCompleted(filtered.filter(job => job.status === "COMPLETED"));
        setWaiting(filtered.filter(job => (job.status === "RUN_PAUSED" || job.status === "QUEUED" || job.status === "PENDING_EXECUTION")));
        setRunning(filtered.filter(job => (job.status === "UPDATE" || job.status === "DEPLOYED" || job.status === "RUNNING")));
        setFailed(filtered.filter(job => (job.status === "RUN_FAILED" || job.status === "UNKNOWN" || job.status === "RUN_ABORTED" || job.status === "RUN_TIMED_OUT" || job.status === "DEPLOY_FAILED")));
    },[jobs])

    const refreshJobs = () => {
        console.log(showStarred);
        console.log(starred);
    }

    const isJobStarred = (jobId) => starred.some(jId => jId === jobId);

    return <div className="main">
            <div>
                <ControlBar loading={loading} setJobs={setJobs} setError={setError} setLoading={setLoading} setShowStarred={setShowStarred} setStatuses={setStatuses} setDevNum={setDevNum}/>
            </div>  
            <div className="jobs">
                <div className="top">
                    <button className="refresh-button" onClick={refreshJobs}> Refresh </button>
                    <JobCounts numCompleted={completed.length} numWaiting={waiting.length} numRunning={running.length} numFailed={failed.length}/>
                </div>
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
                                        <JobEntry job={job} setStarred={setStarred} isStarred={isJobStarred(job.id)} key={job.id}/>
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
                                    <JobEntry job={job} setStarred={setStarred} isStarred={isJobStarred(job.id)} key={job.id}/>
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
                                    <JobEntry job={job} setStarred={setStarred} isStarred={isJobStarred(job.id)} key={job.id}/>
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
                                    <JobEntry job={job} setStarred={setStarred} isStarred={isJobStarred(job.id)} key={job.id}/>
                                ))}
                            </div>
                        ):null}
                    </div>
                )}
            </div>
        </div>
}

export default Search