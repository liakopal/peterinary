// AddPet.jsx
import React, { useState, useContext   } from 'react';
import { Form, Input, Radio, Select, Button, DatePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const { Option } = Select;

const AddPet = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  console.log('AddPet component rendered');
  // Additional logs to check local storage and user context
  
  console.log('User context:', user);


  const [petData, setPetData] = useState({
    petType: '',
    name: '',
    breed: '',
    gender: '',
    birthdate: '',
    notes: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setPetData({ ...petData, birthdate: dateString });
  };
  
  const showSuccessAndNavigate = (petId) => {
    message.success('Pet added successfully!', 5, onclose => {
      navigate(`/edit-pet/${petId}`);
    });
  };

  const handleSubmit = () => {
    console.log('Handle submit invoked');

    // Make sure user context is available and user ID is not undefined
    if (!user || !user._id) {
      console.error('User ID not found');
      message.error('Error: Unable to determine owner of the pet.');
      return;
    }
    const token = localStorage.getItem('token'); // Retrieve the token
    console.log('Token at the time of submission:', token); // Log the token

    // Log the user context and local storage token before checking for their presence
    console.log('User context at submit:', user);

    const petDataWithOwner = { ...petData, owner: user._id };
    console.log("Submitting pet data:", petDataWithOwner); // Log pet data being submitted
    console.log("Authorization header:", `Bearer ${token}`);
    console.log('Local storage token:', localStorage.getItem('token'));
    fetch('http://localhost:3010/api/pet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      //credentials: 'include',
      body: JSON.stringify(petDataWithOwner),
    })
    .then(response => {
      console.log("Server response:", response); // Log server response
      if (!response.ok) {
        // If the response is not OK, log the status and throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if(data.petId) {
        showSuccessAndNavigate(data.petId);
      } else {
        console.error('Pet ID not returned from server');
      }
    })
    
    .catch((error) => {
      console.error('Error:', error);
      message.error('There was a problem adding your pet.');
    });
  };
  

  
  // Form rendering logic
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Pet Type" name="petType">
        <Radio.Group name="petType" onChange={handleInputChange}>
          <Radio value="dog">Dog</Radio>
          <Radio value="cat">Cat</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Pet Name" name="name">
        <Input name="name" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label="Breed" name="breed">
        <Input name="breed" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select name="gender" onChange={value => setPetData({ ...petData, gender: value })}>
          <Option value="female">Female</Option>
          <Option value="male">Male</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Pet's Birthdate" name="birthdate">
        <DatePicker onChange={handleDateChange} />
      </Form.Item>
      <Form.Item label="Notes" name="notes">
        <Input.TextArea rows={4} name="notes" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Pet
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPet;
