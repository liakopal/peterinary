// DoctorPetSearch.jsx
import React, { useState, useEffect } from 'react';
import { message, Input } from 'antd';
import PetListTable from './PetListTable';
import { SearchOutlined } from '@ant-design/icons';

const DoctorPetSearch = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://localhost:3010/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => message.error('Error fetching pets'));
  }, []);

  const filteredPets = searchTerm
    ? pets.filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pets;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Type pet name to search"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <PetListTable pets={filteredPets} showUploadButton={true} />
    </div>
  );
};

export default DoctorPetSearch;
