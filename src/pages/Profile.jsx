import { Form, Input, Button, Card } from "antd";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme);

  const onFinish = (values) => {
    console.log("Profile updated:", values);
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-4`}>
      <Card
        title={<h1 className="text-2xl font-bold">Profile</h1>}
        className="max-w-2xl mx-auto"
      >
        <Form 
          initialValues={user} 
          onFinish={onFinish} 
          layout="vertical"
          className="w-full"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item 
            label="New Password" 
            name="password" 
            rules={[{ min: 6 }]}
          >
            <Input.Password 
              size="large" 
              placeholder="Leave blank to keep current" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              block
              className="md:w-auto"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}