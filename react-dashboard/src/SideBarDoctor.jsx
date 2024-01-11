// SideBarDoctor.jsx
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  LogoutOutlined,
  DashboardOutlined,
  SearchOutlined,
  FileAddOutlined,
  MessageOutlined,
  ScheduleOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const handleLogout = () => {
  fetch('/auth/logout', {
    method: 'POST',
    credentials: 'include' // Required for cookies to be sent
  })
  .then(() => {
    // Clear local storage and redirect after successful server-side logout
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = 'http://localhost:3010/login';
  })
  .catch(error => {
    console.error('Logout error:', error);
  });
};

const SideBarDoctor = () => {
  const doctorMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/doctor-dashboard">Dashboard</Link>,
    },
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: <Link to="/doctor-pet-search">Search Pet</Link>,
    },
    {
      key: 'add-examination',
      icon: <FileAddOutlined />,
      label: <Link to="/add-doctor-examination">Add Doctor Examination</Link>,
    },
    {
      key: 'contact',
      icon: <MessageOutlined />,
      label: <Link to="/contact">Messages</Link>,
    },
    {
      key: 'book-appointment',
      icon: <ScheduleOutlined />,
      label: <Link to="/book-appointment">Book Appointment</Link>,
    },
    {
      key: 'pets-health',
      icon: <HeartOutlined />,
      label: <Link to="/pets-health">Pets Health</Link>,
    },
    {
      key: 'account',
      icon: <TeamOutlined />,
      label: <Link to="/account">Account</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />, // Import this icon from 'antd'
      label: (
        <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'inherit', padding: 0, font: 'inherit', cursor: 'pointer' }}>Logout</button>
      ),
    },
  ];
  return (
    <Menu mode="inline" theme="dark" items={doctorMenuItems} style={{ height: '100%', borderRight: 0 }} />
  );
};



export default SideBarDoctor;