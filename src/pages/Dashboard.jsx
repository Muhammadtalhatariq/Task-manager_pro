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
      totalUsers: users?.length || 0,
      pendingTasks: statusCounts.pending,
      completedTasks: statusCounts.completed,
    };
  };
  
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchStats,
  });

  return (
    <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-4`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card loading={isLoading} title="Total Tasks" bordered={false}>
            <div className="text-2xl font-semibold">{data?.totalTasks || 0}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card loading={isLoading} title="Total Users" bordered={false}>
            <div className="text-2xl font-semibold">{data?.totalUsers || 0}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card loading={isLoading} title="Completed Tasks" bordered={false}>
            <div className="text-2xl font-semibold">{data?.completedTasks || 0}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card loading={isLoading} title="Pending Tasks" bordered={false}>
            <div className="text-2xl font-semibold">{data?.pendingTasks || 0}</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}