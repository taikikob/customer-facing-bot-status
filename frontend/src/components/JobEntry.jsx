import "../css/JobEntry.css"

function JobEntry({job}) {
    return (
        <div className="job-entry">
            <div className="star-col">
                <button>
                    ☆
                </button>
            </div>
            <div>
                {job.status}
            </div>
            <div>
                {job.automationName}
            </div>
            <div>
                {job.currentBotName}
            </div>
            <div>
                {job.startDateTime}
            </div>
            <div>
                {job.endDateTime}
            </div>
            <div>
                {job.type}
            </div>
            <div>
                {job.deviceName}
            </div>
        </div>
    )
}

export default JobEntry