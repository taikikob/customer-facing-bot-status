import "../css/JobEntry.css"

function JobEntry({job, setStarred, isStarred}) {
    
    function onStarClick(e) {
        e.preventDefault();
        if (isStarred) {
            setStarred(prev => prev.filter(starredJobIds => starredJobIds!== job.id));
        } else {
            setStarred(prev => [...prev, job.id]);
        }
    }
    
    return (
        <div className="job-entry">
            <div className="star-col">
                <button className={`starred-btn ${isStarred ? "active":""}`} onClick={onStarClick}>
                    ★
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