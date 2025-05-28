export const fetchJobs = async (timeString) => {
  // start retrieving jobs here
  try {
    const response = await fetch('http://localhost:3001/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "timeString" : timeString})
    })
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    console.log(data.list);
    return data.list;
  } catch (err) {
    console.error("Frontend job fetch error:", err);
    throw err;
  }
};

export const refreshStarredJobs = async (starred) => {
  const updatedStarredJobs = await Promise.all(
    starred.map(async (job) => {
      try {
        const res = await fetch(`http://localhost:3001/api/starred-jobs/${job.id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const updatedJob = await res.json();
        return updatedJob;
      } catch (err) {
        console.error(`Error updating job ${job.id}:`, err);
        return job;
      }
    })
  );

  return updatedStarredJobs;
};