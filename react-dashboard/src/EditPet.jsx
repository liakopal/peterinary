// EditPet.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message as antdMessage } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const EditPet = () => {
  const [petData, setPetData] = useState({});
  const { petId } = useParams(); // To access the dynamic segment in the URL
  const navigate = useNavigate(); // To navigate user after form submission

  useEffect(() => {
    // Replace this URL with the correct endpoint to fetch a specific pet
    fetch(`http://your-api-endpoint/pets/${petId}`)
      .then(response => response.json())
      .then(data => setPetData(data))
      .catch(error => antdMessage.error('Failed to fetch pet data.'));
  }, [petId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to handle form submission, likely sending the updated pet data to the server
    // Replace this URL with the correct endpoint
    fetch(`http://your-api-endpoint/pets/${petId}`, {
      method: 'PUT', // or 'POST' depending on your API
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      antdMessage.success('Pet updated successfully');
      navigate('/some-route'); // Redirect to the desired route after successful update
    })
    .catch(error => {
      antdMessage.error('Failed to update pet');
      console.error('Error updating pet:', error);
    });
  };

  return (
    <Form form={petData} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Pet Name" rules={[{ required: true }]}>
        <Input name="name" value={petData.name} onChange={handleInputChange} />
      </Form.Item>
      {/* Add other Form.Item and Input components for the rest of the pet data fields */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Pet</Button>
      </Form.Item>
    </Form>
  );
};

export default EditPet;
