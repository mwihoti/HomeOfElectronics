"use client"
import React, { useState } from 'react';

const UsersForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    description: '',
    telNumber: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let key in userData) {
      formData.append(key, userData[key]);
    }
    Array.from(images).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('User added successfully!');
        setUserData({
          firstName: '',
          description: '',
          telNumber: '',
        });
        setImages([]);
      } else {
        alert(`Failed to add user: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className='underline'>Users endpoint testing</h4>
        <div>
          <label>
            User firstName: <input className='border' type='text' name='firstName' onChange={handleChange} value={userData.firstName} required />
          </label>
        </div>
        <div>
          <label>
            User description: <input className='border' type='text' name='description' onChange={handleChange} value={userData.description} required />
          </label>
        </div>
        <div>
          <label>
            User telNumber: <input className='border p-1' type='text' name='telNumber' onChange={handleChange} value={userData.telNumber} required />
          </label>
        </div>
        <div>
          <label>
            Upload Images: <input className='border p-1' type='file' name='images' onChange={handleFileChange} multiple />
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default UsersForm;
