import { Table, Switch, Button, Drawer } from "antd";
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
    { title: "Email", dataIndex: "email", key: "email" },
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
        <Button onClick={() => setSelectedUser(user)}>View Details</Button>
      ),
    },
  ];

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 " : "bg-white"}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
      />

      <Drawer
        placement="bottom"
        title="User Details"
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {blockedUsers.includes(selectedUser.id) ? "Block" : "UnBlock"}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
