import "../css/DisplayOptions.css"
function DisplayOptions({ starred_count, setShowStarred, setStatuses, setDevNum }) {
    const handleStarDisplay = (event) => {
        const {checked} = event.target;
        setShowStarred(checked);
    }
    
    const handleStatusChange = (event) => {
        const { value, checked } = event.target;

        setStatuses((prev) => 
            checked ? [...prev, value] : prev.filter((status) => status !== value)
        );
    };

    return <div className="display-options">
        <div className="display-options-header">Display Options: </div>
        <div className="display-options-body">
            <div className="show-starred">
                <label>
                    Starred ({starred_count})
                    <input type="checkbox" onChange={handleStarDisplay}/>
                </label>
            </div>
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
            <div className="devNum-input" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label htmlFor="devnum">Enter Device Number</label>
                <input 
                    id="devnum"
                    type="number"
                    min="0"
                    max="19"
                    step="1"
                    placeholder="0-19"
                    onChange={(e) => setDevNum(e.target.value)}
                />
            </div>
        </div>
    </div>
}

export default DisplayOptions