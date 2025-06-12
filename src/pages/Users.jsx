import { Table, Switch, Button, Drawer, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlockUser } from "../store/authSlice";
import { useState } from "react";
import FetchUsers from "../hooks/FetchUsers";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const blockedUsers = useSelector((state) => state.auth.blockedUsers);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const { data: users, isLoading } = FetchUsers();

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { 
      title: "Email", 
      dataIndex: "email", 
      key: "email",
      responsive: ['md']
    },
    {
      title: "Status",
      key: "status",
      render: (_, user) => (
        <Switch
          checked={!blockedUsers.includes(user.id)}
          onChange={() => dispatch(toggleBlockUser(user.id))}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <Button 
          onClick={() => setSelectedUser(user)}
          size="small"
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-4`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: true }}
        className="overflow-x-auto"
      />

      <Drawer
        title="User Details"
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        width={window.innerWidth > 768 ? '40%' : '80%'}
      >
        {selectedUser && (
          <Card>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>
                  {blockedUsers.includes(selectedUser.id) ? (
                    <Tag color="red">Blocked</Tag>
                  ) : (
                    <Tag color="green">Active</Tag>
                  )}
                </p>
              </div>
            </div>
          </Card>
        )}
      </Drawer>
    </div>
  );
}