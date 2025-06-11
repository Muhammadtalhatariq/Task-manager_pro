import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector(state => state.auth.user);

  const onFinish = (values) => {
    console.log('Profile updated:', values);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      <Form
        initialValues={user}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[{ min: 6 }]}
        >
          <Input.Password placeholder="Leave blank to keep current" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}