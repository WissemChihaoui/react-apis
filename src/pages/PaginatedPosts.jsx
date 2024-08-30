import React, { useState, useEffect } from 'react';

function PaginatedPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [page]);

  return (
    <div>
      <h1>Posts</h1>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
}

export default PaginatedPosts;
