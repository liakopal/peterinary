// App.jsx
import React from 'react';
//import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import UserDashboard from './UserDashboard';
import SideBarDoctor from './SideBarDoctor'; // Import this
import SideBarUser from './SideBarUser'; // Import this

// DOCTOR
import DoctorPetSearch from './DoctorPetSearch';
import AddDoctorExamination from './AddDoctorExamination';
import DoctorMessages from './DoctorMessages';

// USER
import AddPet from './AddPet';
import EditPet from './EditPet';
import MessageForm from './MessageForm';

// LoginForm.js & RegisterForm.js
import LoginForm from './LoginForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';

import { UserProvider } from './UserContext'; // Import UserProvider

import { Layout } from 'antd';
import './App.css';

const { Content, Sider } = Layout;

const App = () => {
  return (
    <UserProvider> {/* Wrap the Router with UserProvider */}
      <Router>
        <Routes>
          {/* Separate pages for login and registration without sidebars */}
          <Route path="/" element={<div>Welcome to the React Dashboard</div>} />
          {/* <Route path="/" element={<Navigate to="/register" replace />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          

          {/* Dashboard Routes with Sidebar */}
          <Route path="/doctor-dashboard/*" element={<DashboardLayout dashboardType="doctor" />} />
          <Route path="/user-dashboard/*" element={<DashboardLayout dashboardType="user" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

const DashboardLayout = ({ dashboardType }) => {
  console.log("Dashboard Type:", dashboardType);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        {dashboardType === "doctor" ? <SideBarDoctor /> : <SideBarUser />}
      </Sider>
      <Content style={{ margin: '16px' }}>
        <Routes>
          {/* Doctor specific routes */}
          {dashboardType === "doctor" && (
            <>
              <Route path= "/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/pet-search" element={<DoctorPetSearch />} />
              <Route path="/add-doctor-examination" element={<AddDoctorExamination />} />
              <Route path="/messages" element={<DoctorMessages />} />
            </>
          )}
          {/* User specific routes */}
          {dashboardType === "user" && (
            <>
              <Route path= "/user-dashboard" element={<UserDashboard />} />
              <Route path="/add-pet" element={<AddPet />} />
              <Route path="/edit-pet/:petId" element={<EditPet />} />
              <Route path="/messages" element={<MessageForm />} />
            </>
          )}
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
