import { Button, Layout } from "antd";

import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/authSlice";

import "../../styles/MainLayout.css";
import Sidebar from "./Sidebar";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Layout className=" min-h-screen ">
      <Sidebar />

      <Layout>
        <Header
          className="flex justify-end items-center bg-purple-400"
          style={{ padding: 0 }}
        >
          <Button onClick={handleLogout} className="text-white">
            LogOut
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
