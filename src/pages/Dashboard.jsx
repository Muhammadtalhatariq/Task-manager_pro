import { Card, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  return {
    totalTasks: 5,
    totalUsers: 2,
    pendingTasks: 1,
    completedTasks: 4,
  };
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchStats,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <Row gutter={20}>
        <Col span={6}>
          <Card loading={isLoading} title="Total Tasks">
            {data?.totalTasks}
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading} title="Total Users">
            {data?.totalUsers}
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading} title="Completed Tasks">
            {data?.completedTasks}
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isLoading} title="Pending Tasks">
            {data?.pendingTasks}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
