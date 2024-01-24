import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Table, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext';

const placeholderDogImage = "https://place.dog/200/200"; // Placeholder dog image URL
const placeholderCatImage = "https://placekitten.com/200/200"; // Placeholder cat image URL

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [pets, setPets] = useState([]);
  const [examinations, setExaminations] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      const token = localStorage.getItem('token');

      fetch(`http://localhost:3010/api/pet/user/${user._id}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(petsData => {
          setPets(petsData);
          return fetch('http://localhost:3010/api/examinations', { headers: { 'Authorization': `Bearer ${token}` } });
        })
        .then(res => res.json())
        .then(examsData => {
          setExaminations(examsData);
        })
        .catch(error => console.error("Error fetching data", error));
    }
  }, [user]);
  

  const getUserPetExaminations = (petId) => {
    return examinations.filter(exam => exam.pet._id === petId);
  };

  const createFileMenu = (files) => (
    <Menu>
      {files.map((file, index) => (
        <Menu.Item key={index}>
          <a href={`http://localhost:3010/uploads/${file}`} download>{`File ${index + 1}`}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const examinationColumns = [
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Added By Dr.',
      dataIndex: ['addedBy', 'username'],
      key: 'addedByUsername',
      render: username => username.charAt(0).toUpperCase() + username.slice(1),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => (new Date(createdAt)).toLocaleDateString(),
    },
    {
      title: 'Files',
      key: 'files',
      render: (_, record) => (
        record.files && record.files.length > 0 ? (
          <Dropdown overlay={createFileMenu(record.files)}>
            <Button>
              Files <DownOutlined />
            </Button>
          </Dropdown>
        ) : 'No files'
      ),
    },
  ];

  return (
    <div>
      <h1>Welcome, {user ? `Mr. ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}` : 'User'}</h1>
      {pets.map(pet => (
        <div key={pet._id}>
          <h2>
            <Avatar 
              src={pet.petType === 'dog' ? placeholderDogImage : placeholderCatImage}
              shape="square" 
            />
            {' '}{pet.name} - {pet.breed}
          </h2>
          <Table 
            dataSource={getUserPetExaminations(pet._id).map(exam => ({
              key: exam._id,
              details: exam.details || 'No details provided',
              addedBy: exam.addedBy,
              createdAt: exam.createdAt,
              files: exam.files,
            }))}
            columns={examinationColumns}
          />
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
