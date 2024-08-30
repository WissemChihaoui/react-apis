import React, { useState, useEffect } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => {
          setUsers(data.items);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for users..."
      />
      {loading ? <p>Loading...</p> : null}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
