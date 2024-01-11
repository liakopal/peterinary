// src/MessageForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message as antdMessage } from 'antd';

const MessageForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setSubmitting(true);
    // POST request to backend API
    fetch('http://localhost:3010/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      antdMessage.success('Message sent successfully');
      form.resetFields();
    })
    .catch(error => antdMessage.error('Failed to send message'))
    .finally(() => setSubmitting(false));
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="message" label="Message" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessageForm;
