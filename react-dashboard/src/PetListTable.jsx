// PetListTable.jsx
import React from 'react';
import { Table, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const PetListTable = ({ examinations }) => {
  // Helper function to create a menu for file downloads
  const createFileMenu = (files) => (
    <Menu>
      {files.map((file, index) => (
        <Menu.Item key={index}>
          <a href={`http://localhost:3010/uploads/${file}`} download>
            {`File ${index + 1}`}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: 'Pet Name',
      dataIndex: ['pet', 'name'],
      key: 'petName',
    },
    {
      title: 'Added By',
      dataIndex: ['addedBy', 'username'],
      key: 'addedByUsername',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Files',
      key: 'files',
      render: (_, record) => (
        record.files && record.files.length > 0 ? (
          <Dropdown overlay={createFileMenu(record.files)}>
            <Button>
              Files <DownOutlined />
            </Button>
          </Dropdown>
        ) : 'No files'
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => (new Date(createdAt)).toLocaleDateString(),
    },
    // Add more columns as needed
  ];

  const dataSource = examinations.map(exam => ({
    key: exam._id,
    pet: exam.pet,
    addedBy: exam.addedBy,
    details: exam.details || 'No details provided',
    createdAt: exam.createdAt,
    files: exam.files,
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default PetListTable;
