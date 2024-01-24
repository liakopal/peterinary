// RegistrationForm.jsx
import React from 'react';
import { Form, Input, Button, Card, Row, Col, Radio, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('Form submit attempt', values);
      const response = await fetch('http://localhost:3010/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Registration was successful
        navigate('/login');
      } else {
        // Handle registration errors, perhaps show a message to the user
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle server errors, perhaps show a message to the user 
    }
  };

  const passwordRules = [
    { required: true, message: 'Please input your Password!' },
    () => ({
      validator(_, value) {
        if (!value || value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('Password must be at least 8 characters, including at least one number, one uppercase letter, and one symbol.')
        );
      },
    }),
  ];

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#033d49' }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={{ width: '100%', maxWidth: 400 }}>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{ fontSize: '1.1rem' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={passwordRules}
              tooltip="Must contain at least 8 characters, one uppercase letter, one number, and one symbol."
            >
              <Input.Password
                placeholder="Password"
                suffix={<Tooltip title="Password requirements"><QuestionCircleOutlined /></Tooltip>}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Radio.Group>
                <Radio value="user">User</Radio>
                <Radio value="doctor">Doctor</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#045B64' }}>
                Register
              </Button>
            </Form.Item>
          </Form>
          <p>
            Already registered? <a href="/login">Log in</a>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default RegistrationForm;