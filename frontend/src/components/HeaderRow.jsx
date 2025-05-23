import "../css/HeaderRow.css"

function HeaderRow() {
    return (
        <div className="header-row">
            <div className="star-col">
                Star
            </div>
            <div>
                Job Status
            </div>
            <div>
                Automation Name
            </div>
            <div>
                Activity Name
            </div>
            <div>
                Start Time
            </div>
            <div>
                End Time
            </div>
            <div>
                Activity Type
            </div>
            <div>
                Devices
            </div>
        </div>
    )
}

export default HeaderRow