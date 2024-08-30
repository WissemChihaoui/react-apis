import React, { useState, useEffect } from 'react';

function UserPosts() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ]);

        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();

        setUsers(usersData);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h1>Users and Posts</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <ul>
              {posts
                .filter(post => post.userId === user.id)
                .map(post => (
                  <li key={post.id}>{post.title}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;
