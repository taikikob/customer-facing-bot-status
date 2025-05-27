export const fetchJobs = async (timeString) => {
  // start retrieving jobs here
  try {
    console.log(timeString);
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