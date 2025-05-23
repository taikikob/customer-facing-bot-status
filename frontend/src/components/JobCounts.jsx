import "../css/JobCounts.css"

function JobCounts({numCompleted, numWaiting, numRunning, numFailed}) {
    return (
        <div className="job-counts-container">
            <div className="completed">
                Number of Completed Jobs: {numCompleted}
            </div>
            <div className="waiting">
                Number of Waiting Jobs: {numWaiting}
            </div>
            <div className="running">
                Number of Running Jobs: {numRunning}
            </div>
            <div className="failed">
                Number of Failed Jobs: {numFailed}
            </div>
        </div>
    )
}

export default JobCounts