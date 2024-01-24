// AddDoctorExamination.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext';
import { Card } from 'antd';

const { Option } = Select;

const AddDoctorExamination = () => {
  const [petData, setPetData] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null)
  const [selectedPetName, setSelectedPetName] = useState(""); // New state to store selected pet's name;
  const [fileList, setFileList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Fetching pets for examination.");
    const token = localStorage.getItem('token');
    fetch('http://localhost:3010/api/pet/pets', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Pets fetched successfully.", data);
      setPetData(data);
    })
    .catch(error => {
      console.error('Error fetching pets:', error);
      message.error('Error fetching pets.');
    });
  }, []);
  
  const handlePetSelection = value => {
    const selected = petData.find(pet => pet._id === value);
    setSelectedPet(value);
    setSelectedPetName(selected ? selected.name : "");
    console.log(`Pet selected for examination: ${selected ? selected.name : 'No pet selected'}`);
  };

  const handleSubmit = (values) => {
    console.log("Submitting new examination for pet:", selectedPet);
    const formData = new FormData();
    formData.append('petId', selectedPet);
    formData.append('examinationDetails', values.examinationDetails);
    fileList.forEach(file => formData.append('files', file));
  
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:3010/api/examinations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Uploading files for pet: ${selectedPetName}`, fileList);
      return response.json();
    })
    .then(data => {
      console.log("Examination added successfully.", data);
      message.success(`Files uploaded successfully for pet ${selectedPetName} by ${user?.username}!`);
    })
    .catch(error => {
      console.error('Error adding examination:', error);
      message.error('Error adding examination.');
    });
    // Clear the file list after "uploading"
    setFileList([]);
  };

  const onFileChange = (info) => {
    console.log("Files selected for upload:", info.fileList);
    setFileList(info.fileList.map(file => file.originFileObj));
  };
  
  

  return (
    <Card title="Add Examination" bordered={false} style={{ background: '#f0f2f5' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="petSelect" label="Select Pet">
          <Select onChange={handlePetSelection}>
            {petData.map(pet => (
              <Option key={pet._id} value={pet._id}>{pet.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="examinationDetails" label="Examination Details">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="upload" label="Upload File">
          <Upload
            beforeUpload={() => false}
            onChange={onFileChange}
            multiple={true}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Examination
        </Button>
      </Form>
    </Card>
  );
};

export default AddDoctorExamination;
