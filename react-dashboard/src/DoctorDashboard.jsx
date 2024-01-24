// DoctorDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Input, message } from 'antd';
import PetListTable from './PetListTable';
import { UserContext } from './UserContext';
import { SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;

const DoctorDashboard = () => {
  const { user } = useContext(UserContext);
  const [examinations, setExaminations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExaminations = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3010/api/examinations', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExaminations(data);
      } catch (error) {
        console.error('Error fetching examinations:', error);
        message.error('Error fetching examinations.');
      }
    };

    fetchExaminations();
  }, []);

  const filteredExams = examinations.filter(exam =>
    exam.pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Content style={{  }}>
      <h1>Welcome, {user ? `Dr. ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}` : 'Doctor'}</h1>
      <Input
        placeholder="Search by pet name"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={onSearchChange}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <PetListTable examinations={filteredExams} />
    </Content>
  );
};

export default DoctorDashboard;
