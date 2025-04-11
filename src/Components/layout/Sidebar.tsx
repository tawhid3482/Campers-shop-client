import { Layout, Menu } from 'antd';

import {
  TUser,
  useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { useAppSelector } from '@/redux/features/hook';
import { adminPaths } from '@/routes/admin.route';
import { userPaths } from '@/routes/user.route';
import { sidebarItemsGenerator } from '@/utils/sidebarItemsGenerator';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
