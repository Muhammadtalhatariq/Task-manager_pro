import { Form, Input, Select, Button } from "antd";

export default function TaskForm({ initialValues, onSubmit, loading }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || { status: "pending" }}
      onFinish={onSubmit}
      className="w-full"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: "Please enter a title" },
          {
            validator: (_, value) => {
              if (value && value.trim().length === 0) {
                return Promise.reject(new Error("Title cannot be only spaces"));
              }
              if (value && value.trim().length < 3) {
                return Promise.reject(
                  new Error("Title must be at least 3 characters")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter a description" },
          {
            validator: (_, value) => {
              if (value && value.trim().length === 0) {
                return Promise.reject(
                  new Error("Description cannot be only spaces")
                );
              }
              if (value && value.trim().length < 10) {
                return Promise.reject(
                  new Error("Description must be at least 10 characters")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.TextArea rows={4} size="large" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select a status" }]}
      >
        <Select size="large">
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          block
          className="md:w-auto"
        >
          {initialValues ? "Update Task" : "Add Task"}
        </Button>
      </Form.Item>
    </Form>
  );
}
