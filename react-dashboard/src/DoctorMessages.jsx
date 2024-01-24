// react-dashboard\src\DoctorMessages.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Form, Select, Input, Button, Table, message as antdMessage, Tag } from 'antd';
import { UserContext } from './UserContext';
import {  DownloadOutlined } from '@ant-design/icons';

const DoctorMessages = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [ setFileList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); 
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token') || user.token;

  useEffect(() => {
    // Fetch Users
    fetch('http://localhost:3010/api/users/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => antdMessage.error('Failed to fetch users: ' + error.message));

    // Fetch Messages with improved error handling
    fetch('http://localhost:3010/api/message/user', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setMessages(data))
    .catch(error => antdMessage.error('Failed to fetch messages: ' + error.message));
  }, [token]); // Added token dependency

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('message', values.message);
    if (selectedDoctorId) {
      formData.append('recipientId', selectedDoctorId); // selected user's ID
    } else {
      console.error('Recipient ID (Doctor ID) is not defined');
      return; // Do not proceed if ID is not defined
    }

    try {
      const response = await fetch('http://localhost:3010/api/message/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response data after sending message:", data);
      antdMessage.success('Message sent successfully');
      form.resetFields();  // Reset the form fields
      setFileList([]);     // Reset the file list
    } catch (error) {
      antdMessage.error('Failed to send message');
    }
  };


  const renderReadStatus = (read) => {
    return read ? <Tag color="blue">Read</Tag> : <Tag color="volcano">Unread</Tag>;
  };

  const renderAttachment = (attachment) => {
    return attachment ? <a href={`http://localhost:3010/${attachment}`} download><DownloadOutlined /></a> : 'None';
  };

  const columns = [
    { title: 'Name', dataIndex: ['user', 'username'], key: 'name' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    { title: 'Sent At', dataIndex: 'createdAt', key: 'createdAt', render: text => new Date(text).toLocaleString() },
    { title: 'Read', dataIndex: 'read', key: 'read', render: renderReadStatus },
    { title: 'Read At', dataIndex: 'readAt', key: 'readAt', render: text => text ? new Date(text).toLocaleString() : 'Not yet' },
    { title: 'Attachment', key: 'attachment', render: (_, record) => user.role === 'doctor' ? renderAttachment(record.attachment) : 'N/A' },
    // Additional columns as needed
  ];

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctorId(doctorId); // Update state when doctor is selected
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Item name="user" label="Select a user" rules={[{ required: true }]}>
          <Select placeholder="Select a user" onChange={handleDoctorChange}>
            {users.map(user => (
              <Select.Option key={user._id} value={user._id}>{user.username}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="message" label="Message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Send Message</Button>
        </Form.Item>
      </Form>
      <Table dataSource={messages} columns={columns} />
    </div>
  );
};

export default DoctorMessages;
