// SideBarDoctor.jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {  handleLogout } from './handleLogout';
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

const SideBarDoctor = () => {
  const { logout } = useContext(UserContext);
  const logoutHandler = () => {
    handleLogout(logout); // Pass the logout function to handleLogout
  };  
  const doctorMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="doctor-dashboard"> Doctor Dashboard</Link>,
    },
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: <Link to="pet-search">Search Pet</Link>,
    },
    {
      key: 'add-examination',
      icon: <FileAddOutlined />,
      label: <Link to="add-doctor-examination">Add Doctor Examination</Link>,
    },
    {
      key: 'contact',
      icon: <MessageOutlined />,
      label: <Link to="messages">Messages</Link>,
    },
    {
      key: 'book-appointment',
      icon: <ScheduleOutlined />,
      label: <Link to="book-appointment">Book Appointment</Link>,
    },
    {
      key: 'pets-health',
      icon: <HeartOutlined />,
      label: <Link to="pets-health">Pets Health</Link>,
    },
    {
      key: 'account',
      icon: <TeamOutlined />,
      label: <Link to="account">Account</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />, // Import this icon from 'antd'
      label: (
        <button onClick={logoutHandler} style={{ border: 'none', background: 'none', color: 'inherit', padding: 0, font: 'inherit', cursor: 'pointer' }}>Logout</button>
      ),
    },
  ];
  return (
    <div>
      <div className="flashing-text">You are logged in!</div>
      <Menu mode="inline" theme="dark" items={doctorMenuItems} style={{ height: '100%', borderRight: 0 }} />
    </div>
  );
};



export default SideBarDoctor;