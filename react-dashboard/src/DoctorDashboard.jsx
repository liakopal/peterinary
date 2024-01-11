// DoctorDashboard.jsx
import React from 'react';
//import SideBarDoctor from './SideBarDoctor';
import { Layout } from 'antd';

const { Content } = Layout;

const DoctorDashboard = () => {
    const username = localStorage.getItem('username'); // Retrieve the username
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <SideBarDoctor /> */}
        <Content style={{ margin: '16px' }}>
            <h1>{`Welcome, ${username || ''}`}</h1> {/* Display the username */}
          {/* Rest of your dashboard content */}
        </Content>
      </Layout>
    );
  };
  

export default DoctorDashboard;
