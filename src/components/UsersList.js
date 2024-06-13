"use client"
import React, { useEffect, useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getUsers');
        const result = await response.json();
        if (response.ok) {
          setUsers(result);
        } else {
          console.error(`Failed to fetch users: ${result.error}`);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4 className='underline'>Users List</h4>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} className='border p-2 my-2'>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Description:</strong> {user.description}</p>
              <p><strong>Tel Number:</strong> {user.telNumber}</p>
              {user.images && user.images.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div className='flex'>
                    {user.images.map((image, index) => (
                      <img
                        key={index}
                        src={`data:image/jpeg;base64,${image}`}
                        alt={`User image ${index + 1}`}
                        className='w-24 h-24 object-cover m-2'
                      />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
