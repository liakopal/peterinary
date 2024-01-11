// PetListTable.jsx in src/components
import React from 'react';
import { Table, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PetListTable = ({ pets, onFileUpload, showUploadButton, onEditPet  }) => {
  // Function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Age',
      dataIndex: 'birthdate',
      key: 'age',
      render: birthdate => `${calculateAge(birthdate)} years`,
    },
    {
      title: 'Examinations',
      dataIndex: 'examinations',
      key: 'examinations',
      render: (text, record) => (
        <div>
          {record.examinations.map((file, index) => (
            <a key={index} href={`http://localhost:3010/uploads/${file}`} download>
              Examination {index + 1} - {new Date(file.uploadDate).toLocaleDateString()}
            </a>
          ))}
          {showUploadButton && (
            <Upload
              beforeUpload={(file) => {
                onFileUpload(file, record.key);
                return false; // Prevent default upload behavior
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          )}
        </div>
      ),
    },
  ];

  const dataSource = pets.map(pet => ({
    key: pet._id,
    name: pet.name,
    breed: pet.breed,
    birthdate: pet.birthdate,
    examinations: pet.examinations.map(exam => ({
      ...exam,
      uploadDate: exam.uploadDate || new Date(), // Assuming each exam object has an uploadDate field
    })),
  }));

  columns.push({
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button onClick={() => onEditPet(record.key)}>Edit</Button>
    ),
  });
  

  return (
    <Table dataSource={dataSource} />
  );
};

export default PetListTable;
