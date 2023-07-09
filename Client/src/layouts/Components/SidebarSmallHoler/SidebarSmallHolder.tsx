import classNames from 'classnames/bind';

import styles from './SidebarSmallHolder.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface ISidebarProps {}

function SidebarSmallHolder() {
  return (
    <div className={cx('wrapper')}>
      <Link className={cx('home')} to={config.routes.home}>
        <FontAwesomeIcon icon={faHouse} />
        Craft Villages
      </Link>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdminSmallHolder.adminSmallHolderUserDetail}
      >
        Account
      </NavLink>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdminSmallHolder.adminSmallHolderMainDetail}
      >
        Nông hộ
      </NavLink>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdminSmallHolder.adminSmallHolderProduct}
      >
        Sản phẩm
      </NavLink>
      <NavLink
        className={(nav) => cx('navlink', { active: nav.isActive })}
        to={config.routesAdminSmallHolder.adminSmallHolderWorkers}
      >
        Người dân
      </NavLink>
    </div>
  );
}

export default SidebarSmallHolder;
