import React, { useState, useEffect } from 'react';
import { Input, Card, Col, Row, Avatar, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const placeholderDogImage = "https://place.dog/400/200"; // Placeholder dog image URL
const placeholderCatImage = "https://placekitten.com/400/200"; // Placeholder cat image URL

const DoctorPetSearch = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch pets data
    const token = localStorage.getItem('token');
    fetch('http://localhost:3010/api/pet/pets', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      setPets(data);
    })
    .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDownload = (exam, petName) => {
    console.log(`Downloading examination for ${petName}:`, exam);
    // Implement download logic here
  };

  const renderExaminations = (petExaminations, petName) => {
    return (
      <div style={{ overflow: 'auto', whiteSpace: 'nowrap', padding: '10px' }}>
        {petExaminations.map((exam, index) => (
          <Button
            key={index}
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(exam, petName)}
            style={{ marginRight: '10px' }} // Add space between buttons
          >
            Download Exam {index + 1}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Input
        placeholder="Type pet name or owner's username to search"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <Row gutter={[16, 16]}>
        {pets.filter(pet =>
          pet.name.toLowerCase().includes(searchTerm) ||
          (pet.owner && pet.owner.username.toLowerCase().includes(searchTerm))
        ).map(pet => (
          <Col span={8} key={pet._id}>
            <Card
              hoverable
              style={{ width: '100%', borderRadius: '20px', overflow: 'hidden' }} // Add border radius and hide overflow
              cover={
                <img
                  alt={pet.name}
                  src={pet.petType === 'dog' ? placeholderDogImage : placeholderCatImage} // Use placeholder images
                />
              }
              actions={[
                renderExaminations(pet.examinations, pet.name)
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={pet.petType === 'dog' ? placeholderDogImage : placeholderCatImage} />} // Use placeholder images
                title={pet.name}
                description={
                  <>
                    <p>Type: {pet.petType}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Gender: {pet.gender}</p>
                    <p>Age: {pet.birthdate ? calculateAge(pet.birthdate) : 'Unknown'} years</p>
                    <p>Owner: {pet.owner ? pet.owner.username : 'No owner'}</p>
                    <p>Notes: {pet.notes}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DoctorPetSearch;

// Helper function to calculate age, assuming it's being used somewhere else
export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
