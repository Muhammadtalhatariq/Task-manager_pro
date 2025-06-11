import { Table, Button, Select, Modal, Tag, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TaskForm from "../components/TaskForm";

const fetchTasks = async () => [
  {
    id: 1,
    title: "first task",
    status: "pending",
    description: "this is task",
  },
  {
    id: 2,
    title: "Update dashboard",
    status: "completed",
    description: "Add new stats cards",
  },
];

const createTask = async (task) => task;
const updateTask = async (task) => task;
const deleteTask = async (id) => id;

export default function Tasks() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const filteredTasks = tasks?.filter(
    (task) => statusFilter === "all" || task.status === statusFilter
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <Space>
          <Button
            onClick={() => {
              setCurrentTask(task);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: "Delete Task",
                content: "Are you sure?",
                onOk: () => deleteMutation.mutate(task.id),
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (currentTask) {
      updateMutation.mutate({ ...values, id: currentTask.id });
    } else {
      createMutation.mutate(values);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Tasks</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentTask(null);
            setIsModalOpen(true);
          }}
        >
          Add Task
        </Button>
      </div>

      <Select
        defaultValue="all"
        className="mb-4 w-40"
        onChange={setStatusFilter}
        options={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
        ]}
      />

      <Table
        columns={columns}
        dataSource={filteredTasks}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={currentTask ? "Edit Task" : "Add Task"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <TaskForm
          initialValues={currentTask}
          onSubmit={handleSubmit}
          loading={createMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>
    </div>
  );
}
