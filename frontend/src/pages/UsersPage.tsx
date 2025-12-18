import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../types';
import { fetchUsers, createUser, deleteUser } from '../api';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      message.error('加载用户列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success('删除成功');
      loadUsers();
    } catch (error) {
      message.error('删除失败');
      console.error(error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await createUser(values);
      message.success('创建成功');
      setModalOpen(false);
      loadUsers();
    } catch (error: any) {
      if (error && error.errorFields) {
        return;
      }
      message.error('创建失败');
      console.error(error);
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 100,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: User) => (
        <Popconfirm
          title="确定要删除这个用户吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24 }}>部门人员管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加人员
        </Button>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={false}
          loading={loading}
        />
      </div>

      <Modal
        title="添加人员"
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
