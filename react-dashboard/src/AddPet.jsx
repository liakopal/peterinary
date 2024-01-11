// AddPet.jsx
import React, { useState, useContext   } from 'react';
import { Form, Input, Radio, Select, Button, DatePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const { Option } = Select;

const AddPet = () => {
  const [petData, setPetData] = useState({
    petType: '',
    name: '',
    breed: '',
    gender: '',
    birthdate: '',
    notes: '',
  });
  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setPetData({ ...petData, birthdate: dateString });
  };

  const handleSubmit = () => {
    const petDataWithOwner = { ...petData, owner: user._id };
    console.log("Submitting pet data:", petDataWithOwner); // Log pet data being submitted
  
    fetch('http://localhost:3010/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petDataWithOwner),
    })
    .then(response => {
      console.log("Server response:", response); // Log server response
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Success:', data);
      message.success('Pet added successfully!');
      navigate('/success');
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
