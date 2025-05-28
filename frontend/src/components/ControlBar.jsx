import DisplayOptions from "./DisplayOptions"
import TimeInput from "./TimeInput"
import "../css/ControlBar.css"

function ControlBar({ loading, setJobs, setError, setLoading, starred_count, setShowStarred, setStatuses, setDevNum }) {
    return <div className="control-bar">
        <div className="title"> Select Start Time of Job of Interest:</div>
        <TimeInput loading={loading} setJobs={setJobs} setError={setError} setLoading={setLoading}/>
        <DisplayOptions starred_count={starred_count} setShowStarred={setShowStarred} setStatuses={setStatuses} setDevNum={setDevNum}/>
    </div>
}

export default ControlBar