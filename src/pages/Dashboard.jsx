import { Card, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectStatusCounts } from "../store/taskSlice";
import FetchUsers from "../hooks/FetchUsers";

export default function Dashboard() {
  const theme = useSelector((state) => state.theme);
  const Length = useSelector((state) => state.tasks.tasks).length;
  const statusCounts = useSelector(selectStatusCounts);
  const { data: users } = FetchUsers();
  const fetchStats = async () => {
    return {
      totalTasks: Length,
      totalUsers: users.length,
      pendingTasks: statusCounts.pending,
      completedTasks: statusCounts.completed,
    };
  };
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchStats,
  });

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 " : "bg-white"}`}>
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
