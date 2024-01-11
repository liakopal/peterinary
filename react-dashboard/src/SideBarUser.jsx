// SideBarUser.jsx
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  LogoutOutlined,
  DashboardOutlined,
  PlusSquareOutlined,
  UserOutlined,
  MessageOutlined,
  SearchOutlined,
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
const SideBarUser = () => {
  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/user-dashboard">Dashboard</Link>,
    },
    {
      key: 'add-pet',
      icon: <PlusSquareOutlined />,
      label: <Link to="/add-pet">Add Pet</Link>,
    },
    {
      key: 'pet-owner-profile',
      icon: <UserOutlined />,
      label: <Link to="/pet-owner-profile">Pet Owner Profile</Link>,
    },
    {
      key: 'contact',
      icon: <MessageOutlined />,
      label: <Link to="/contact">Messages</Link>,
    },
    {
      key: 'lost-and-found',
      icon: <SearchOutlined />,
      label: <Link to="/lost-and-found">Lost and Found</Link>,
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
    <Menu mode="inline" theme="dark" items={userMenuItems} style={{ height: '100%', borderRight: 0 }} />
  );
};

  


export default SideBarUser;