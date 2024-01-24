// LoginForm.jsx
import React, { useContext } from 'react'; // Import useContext Hook
import { Form, Input, Button, Card, Row, Col, Tooltip } from 'antd'; // Import antd components
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext'; // Import UserContext

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Use login function from context

  const onFinish = async (values) => {
    console.log('Login attempt with:', values);
    try {
      const response = await fetch('http://localhost:3010/api/auth/login', { // Corrected URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Response from server:', data);
      

      if (data.success) {
        console.log('Server response data:', data); // Log the entire data object from the server
        // Pass the correct username to the login function
        login({ _id: data.userId, username: data.username, role: data.role });
        console.log('Received token:', data.token); // Log the token
        localStorage.setItem('token', data.token); // Store the token in local storage
        console.log('Login successful, navigating to dashboard...');
        data.role === 'doctor' ? navigate('/doctor-dashboard/doctor-dashboard') : navigate('/user-dashboard/user-dashboard');
      }
       else {
        // Handle login errors, perhaps show a message to the user
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle server errors, perhaps show a message to the user
    }
  };
  const passwordTooltip = (
    <span>
      Remember: Your password is at least 8 characters, including a number, a capital letter, and a symbol.
    </span>
  );

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#033d49' }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={{ width: '80%', maxWidth: 400 }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ fontSize: '1.1rem' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]} 
            >
              <Input.Password placeholder="Password" suffix={<Tooltip title={passwordTooltip}><InfoCircleOutlined /></Tooltip>} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block style={{ backgroundColor: '#045B64' }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </Card>
      </Col>
    </Row>
  );
};
export default LoginForm;
