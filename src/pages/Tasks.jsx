import { useState } from "react";
import {
  Table,
  Button,
  Select,
  Modal,
  Tag,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskForm from "../components/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  markAsCompleted,
  markAsPending,
} from "../store/taskSlice";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const theme = useSelector((state) => state.theme);
  const { isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return tasks;
    },
    initialData: tasks,
  });

  const createMutation = useMutation({
    mutationFn: async (newTask) => {
      const taskWithId = { ...newTask, id: Date.now() };
      dispatch(addTask(taskWithId));
      return taskWithId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task created successfully!");
    },
    onError: () => {
      message.error("Failed to create task");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTask) => {
      dispatch(updateTask(updatedTask));
      return updatedTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task updated successfully!");
    },
    onError: () => {
      message.error("Failed to update task");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteTask(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete task");
    },
  });
  const completeMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(markAsCompleted(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task marked as completed!");
    },
  });

  const pendingMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(markAsPending(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task marked as pending!");
    },
  });

  const filteredTasks = tasks.filter(
    (task) => statusFilter === "all" || task.status === statusFilter
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Space>
          <Tag color={status === "completed" ? "green" : "orange"}>
            {status.toUpperCase()}
          </Tag>
          {status === "pending" ? (
            <Button
              size="small"
              icon={<CheckOutlined />}
              onClick={() => completeMutation.mutate(record.id)}
            >
              Mark Complete
            </Button>
          ) : (
            <Button
              size="small"
              icon={<ClockCircleOutlined />}
              onClick={() => pendingMutation.mutate(record.id)}
            >
              Mark Pending
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setCurrentTask(record);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
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
    setCurrentTask(null);
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 " : "bg-white"}p-2 md:p-4`}>
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold">Task Management</h1>
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

      <div className="mb-4">
        <Select
          defaultValue="all"
          style={{ width: 150 }}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "All Status" },
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredTasks}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={currentTask ? "Edit Task" : "Create Task"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrentTask(null);
        }}
        footer={null}
        destroyOnClose
      >
        <TaskForm
          initialValues={currentTask}
          onSubmit={handleSubmit}
          isLoading={createMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
