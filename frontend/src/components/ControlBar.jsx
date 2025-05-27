import DisplayOptions from "./DisplayOptions"
import TimeInput from "./TimeInput"
import "../css/ControlBar.css"

function ControlBar({ loading, setJobs, setError, setLoading, setShowStarred, setStatuses, setDevNum }) {
    return <div className="control-bar">
        <div className="title"> Select Start Time of Job of Interest:</div>
        <TimeInput setJobs={setJobs} setError={setError} setLoading={setLoading}/>
        <DisplayOptions setShowStarred={setShowStarred} setStatuses={setStatuses} setDevNum={setDevNum}/>
    </div>
}

export default ControlBar