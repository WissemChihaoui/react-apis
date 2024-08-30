import React, { useState, useEffect } from 'react';

function CachingFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = sessionStorage.getItem('fetchedData');
    if (cachedData) {
      // If data is found in sessionStorage, use it
      setData(JSON.parse(cachedData));
    } else {
      // If no cached data, fetch from the API
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(fetchedData => {
          setData(fetchedData);
          setLoading(false);
          // Cache the data for future use
          sessionStorage.setItem('fetchedData', JSON.stringify(fetchedData));
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data && data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CachingFetch;
