// SideBarUser.jsx
import React, { useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import {  handleLogout } from './handleLogout';
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


const SideBarUser = () => {
  const { logout } = useContext(UserContext);
  const logoutHandler = () => {
    handleLogout(logout); // Pass the logout function to handleLogout
  };
  

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="user-dashboard">User Dashboard</Link>,
    },
    {
      key: 'add-pet',
      icon: <PlusSquareOutlined />,
      label: <Link to="add-pet">Add Pet</Link>,
    },
    {
      key: 'edit-pet',
      icon: <UserOutlined />,
      label: <Link to="edit-pet/:petId">Edit Pet</Link>,
    },
    {
      key: 'contact',
      icon: <MessageOutlined />,
      label: <Link to="messages">Messages</Link>,
    },
    {
      key: 'lost-and-found',
      icon: <SearchOutlined />,
      label: <Link to="lost-and-found">Lost and Found</Link>,
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
      <Menu mode="inline" theme="dark" items={userMenuItems} style={{ height: '100%', borderRight: 0 }} />
    </div>
  );
};




export default SideBarUser;