import { useState } from "react";
import { fetchJobs } from "../services/api";
import "../css/TimeInput.css"

function TimeInput({loading, setJobs, setError, setLoading}) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSearch = async (event) => {
        /* Call API calling function here, using minBefore, statuses, devNum */
        event.preventDefault();
        if (loading) return
        setLoading(true);
        const dateTime = new Date(`${date}T${time}:00`);  // ":00" adds seconds
        const isoString = dateTime.toISOString();

        try {
            const time_filtered_jobs = await fetchJobs(isoString);
            setJobs(time_filtered_jobs);
            setError(null);
        } catch (err){
            console.log(err)
            setError("Failed to filter moveis based on time");
        } finally {
            setLoading(false);
        }
    };

    return <form onSubmit={handleSearch} className="search-filter-form">
        <div>
            <div>
                <label htmlFor="date">Date: </label>
                    <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="time">Time: </label>
                <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                />
            </div>
        </div>
        <div className="button-container">
            <button type="submit" className="search-button">Search</button>
        </div>
    </form>
}

export default TimeInput