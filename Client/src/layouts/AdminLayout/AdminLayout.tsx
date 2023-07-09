import classNames from 'classnames/bind';

import Sidebar from '~/layouts/Components/Sidebar';
import SidebarSmallHolder from '~/layouts/Components/SidebarSmallHoler';
import styles from './AdminLayout.module.scss';

import { useAppSelector } from '~/app/hooks';


const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
  const { user } = useAppSelector(
    (state) => state.auth,
  );

  return (
    <div className={cx('container')}>
      {user?.isAdminWebsite ? <Sidebar /> : <SidebarSmallHolder />}
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default AdminLayout;
