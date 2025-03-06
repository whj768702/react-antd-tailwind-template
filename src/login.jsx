import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("登录信息:", values);
    // 这里应该调用实际的登录 API
    // 模拟登录成功
    localStorage.setItem("isLoggedIn", "true");
    message.success("登录成功！");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">欢迎登录</h1>
          <p className="text-gray-600 mt-2">请输入您的账号和密码</p>
        </div>

        <Form name="login" onFinish={onFinish} autoComplete="off" size="large">
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="用户名" className="rounded-md" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="密码"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full rounded-md bg-blue-600 hover:bg-blue-700">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
