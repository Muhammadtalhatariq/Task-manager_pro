import { Table, Switch, Button, Drawer } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBlockUser } from '../store/authSlice';
import { useState } from 'react';

const fetchUsers = async () => [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users, isLoading } = useQuery({
    queryKey:["users"],
    queryFn:fetchUsers
  });
  const blockedUsers = useSelector(state => state.auth.blockedUsers);
  const dispatch = useDispatch();

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      key: 'status',
      render: (_, user) => (
        <Switch
          checked={!blockedUsers.includes(user.id)}
          onChange={() => dispatch(toggleBlockUser(user.id))}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Button onClick={() => setSelectedUser(user)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={isLoading}
        rowKey="id"
      />

      <Drawer
        title="User Details"
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      >
        {selectedUser && (
          <div>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {blockedUsers.includes(selectedUser.id) ? 'Blocked' : 'Active'}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}