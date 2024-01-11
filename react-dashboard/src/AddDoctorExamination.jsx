// AddDoctorExamination.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddDoctorExamination = () => {
  const [petData, setPetData] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Replace with actual API call to fetch pets
    fetch('http://localhost:3010/api/pets')
      .then(response => response.json())
      .then(data => setPetData(data))
      .catch(error => message.error('Error fetching pets.'));
  }, []);

  const handlePetSelection = (value) => {
    setSelectedPet(value);
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('petId', selectedPet);
    formData.append('examinationDetails', values.examinationDetails);
    fileList.forEach(file => formData.append('files', file.originFileObj));

    fetch('http://localhost:3010/api/examinations', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => message.success('Examination added successfully!'))
    .catch(error => message.error('Error adding examination.'));
  };

  const onFileChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
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
  );
};

export default AddDoctorExamination;
