function JobCounts() {
    return (
        <div>
            <div className="completed">
                Number of Completed Jobs: 
            </div>
            <div className="waiting">
                Number of Waiting Jobs:
            </div>
            <div className="running">
                Number of Running Jobs:
            </div>
            <div className="failing">
                Number of Failing Jobs:
            </div>
        </div>
    )
}

export default JobCounts