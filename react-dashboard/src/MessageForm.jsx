// react-dashboard\src\MessageForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Form, Select, Input, Button, Upload, Table, message as antdMessage, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext';

const { Dragger } = Upload;

const MessageForm = () => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token') || user.token;

  useEffect(() => {
    // Fetch Doctors
    fetch('http://localhost:3010/api/doctors', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setDoctors(data))
    .catch(error => antdMessage.error('Failed to fetch doctors: ' + error.message));

    // Fetch Messages for the user
    fetch('http://localhost:3010/api/message/user', { // Adjust as needed
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setMessages(data))
    .catch(error => antdMessage.error('Failed to fetch messages: ' + error.message));
  }, [token]);


  const handleSubmit = async (values) => {
    console.log("Form values before submitting:", values);
    const formData = new FormData();
    formData.append('message', values.message); // Add the message to the form
    formData.append('doctorId', values.doctor); // Add the selected doctor's ID
    fileList.forEach(file => {                  // Add the file to the form
      formData.append('files', file.originFileObj);   // Add the file to the form
    });

    const token = localStorage.getItem('token') || user.token; // Add the token to the form
    console.log("Token for submission:", token);

    try {
      const response = await fetch('http://localhost:3010/api/message', {
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
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Failed to send message:', error);
      antdMessage.error('Failed to send message');
    }
  };

  const onFileChange = info => {
    console.log('FileList:', info.fileList);
    setFileList(info.fileList);
  };

  const renderReadStatus = (read) => {
    return read ? <Tag color="blue">Read</Tag> : <Tag color="volcano">Unread</Tag>;
  };
  const renderAttachment = (attachment) => {
    return attachment ? <a href={`http://localhost:3010/${attachment}`} Upload><Upload /></a> : 'None';
  };

  const columns = [
    { title: 'Name', dataIndex: ['user', 'username'], key: 'name' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    { title: 'Sent At', dataIndex: 'createdAt', key: 'createdAt', render: text => new Date(text).toLocaleString() },
    { title: 'Read', dataIndex: 'read', key: 'read', render: renderReadStatus },
    { title: 'Read At', dataIndex: 'readAt', key: 'readAt', render: text => text ? new Date(text).toLocaleString() : 'Not yet' },
    { title: 'Attachment', key: 'attachment', render: (_, record) => user.role === 'user' ? renderAttachment(record.attachment) : 'N/A' },
    // Additional columns as needed
  ];
  

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
        <Form.Item name="doctor" label="Select Doctor" rules={[{ required: true }]}>
          <Select placeholder="Select a doctor">
            {doctors.map(doctor => (
              <Select.Option key={doctor._id} value={doctor._id}>{doctor.username}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="message" label="Message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Attach Files">
          <Dragger beforeUpload={() => false} onChange={onFileChange} multiple>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
        <Table dataSource={messages} columns={columns} />
      </Form>
    </div>
  );
};

export default MessageForm;
