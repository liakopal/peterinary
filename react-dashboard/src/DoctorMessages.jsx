// src/components/DoctorMessages.jsx
import React, { useState, useEffect } from 'react';
import { Table, message as antdMessage } from 'antd';

const DoctorMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => antdMessage.error('Failed to fetch messages'));
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    // ... Define more columns if needed
  ];

  return (
    <Table dataSource={messages} columns={columns} />
  );
};

export default DoctorMessages;
