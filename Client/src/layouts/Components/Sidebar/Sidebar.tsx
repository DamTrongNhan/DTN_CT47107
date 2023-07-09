import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface ISidebarProps {}

function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <Link className={cx('home')} to={config.routes.home}>
        <FontAwesomeIcon icon={faHouse} />
        Craft Villages
      </Link>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdmin.adminUser}
      >
        Quản lý tài khoản
      </NavLink>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdmin.adminVillage}
      >
        Quản lý làng nghề
      </NavLink>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdmin.adminOrders}
      >
        Báo cáo
      </NavLink>
    </div>
  );
}

export default Sidebar;
