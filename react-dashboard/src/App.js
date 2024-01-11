import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBarUser from './SideBarUser';
import SideBarDoctor from './SideBarDoctor';
import AddPet from './AddPet';
import EditPet from './EditPet';
import DoctorPetSearch from './DoctorPetSearch';
import DoctorMessages from './DoctorMessages';
import MessageForm from './MessageForm';
import PetListTable from './PetListTable';
import AddDoctorExamination from './AddDoctorExamination';
import DoctorDashboard from './DoctorDashboard';
import UserDashboard from './UserDashboard';
import HandleLoginRedirect from './HandleLoginRedirect';
import { UserProvider } from './UserContext'; // Import UserProvider from UserContext
import { Layout } from 'antd';
import './App.css';

const { Content, Sider } = Layout;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    console.log('Token:', token, 'Role:', role); // Add this log
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const Sidebar = userRole === 'doctor' ? <SideBarDoctor /> : <SideBarUser />;
  const redirectPath = isAuthenticated ? `/${userRole}-dashboard` : '/login';

  return (
    <UserProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible>
            {Sidebar}
          </Sider>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/doctor-dashboard" element={isAuthenticated && userRole === 'doctor' ? <DoctorDashboard /> : <Navigate to={redirectPath} />} />
              <Route path="/user-dashboard" element={isAuthenticated && userRole === 'user' ? <UserDashboard /> : <Navigate to={redirectPath} />} />
              <Route path="/add-pet" element={isAuthenticated ? <AddPet /> : <Navigate to={redirectPath} />} />
              <Route path="/edit-pet/:petId" element={isAuthenticated ? <EditPet /> : <Navigate to={redirectPath} />} />
              <Route path="/doctor-pet-search" element={isAuthenticated && userRole === 'doctor' ? <DoctorPetSearch /> : <Navigate to={redirectPath} />} />
              <Route path="/messages" element={isAuthenticated ? <DoctorMessages /> : <Navigate to={redirectPath} />} />
              <Route path="/contact" element={isAuthenticated ? <MessageForm /> : <Navigate to={redirectPath} />} />
              <Route path="/pet-list" element={isAuthenticated && userRole === 'user' ? <PetListTable /> : <Navigate to={redirectPath} />} />
              <Route path="/add-doctor-examination" element={isAuthenticated && userRole === 'doctor' ? <AddDoctorExamination /> : <Navigate to={redirectPath} />} />
              <Route path="/handle-login-redirect" element={<HandleLoginRedirect />} />
              <Route path="*" element={<Navigate to={redirectPath} />} /> {/* Redirect any unmatched route */}
            </Routes>
          </Content>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
