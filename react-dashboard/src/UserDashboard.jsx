// UserDashboard.jsx
import React from 'react';
//import SideBarUser from './SideBarUser';
import { Layout } from 'antd';

const { Content } = Layout;

const UserDashboard = () => {
  const username = localStorage.getItem('username'); // Retrieve the username
  console.log('Username from localStorage:', username); // For debugging

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <UserDashboard /> */}
      <Content style={{ margin: '16px' }}>
          <h1>{`Welcome, ${username || 'username'}`}</h1> {/* Display the username */}
        {/* Rest of your dashboard content */}
      </Content>
    </Layout>
  );
};


export default UserDashboard;
