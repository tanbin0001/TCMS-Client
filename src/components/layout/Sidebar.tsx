import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
import { userRoutePaths } from "../../routes/userRoutes";
import { TUser, useCurrentToken } from "../../redux/features/authSlice";

const { Sider } = Layout;

const userRole = {
  USER: "user",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sideBarItems;

  switch ((user as TUser)!.role) {
    case userRole.USER:
      sideBarItems = sidebarItemsGenerator(userRoutePaths, userRole.USER);
      break;
  }
  return (
    <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={() => {}}>
      <div
        style={{
          color: "white",

          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="demo-logo-vertical text-white flex items-center justify-center text-2xl h-20 font-bold  bg-purple-400">
          <img src="/logo.png" className="w-10" alt="" /> <h1>TourCompass</h1>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems as any}
        className="bg-purple-400"
      />
    </Sider>
  );
};    

export default Sidebar;
