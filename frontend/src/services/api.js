export const authenticate = async () => {
    try {
    const response = await fetch('http://localhost:3001/api/token', {
        method: 'POST',
    });

    const data = await response.json();
    // chose to store token in the local storage since we are not worried about any security issues
    // local storage is a storage on browser
    localStorage.setItem('authToken', data.token);
    return data.token;
  } catch (err) {
    console.error("Frontend auth error:", err);
    throw err;
  }
};