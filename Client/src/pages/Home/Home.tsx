import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';

import styles from './Home.module.scss';
import Slider from '~/components/Slider';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      <Slider carousel />
      <div className={cx('wrapper')}>
        <div className={cx('list')}>
          <div className={cx('heading')}>
            <div className={cx('line-heading')}>
              <h4>Làng nghề nổi bật</h4>
            </div>
            <Link to={config.routes.villages}>Xem tất cả</Link>
          </div>
          <div className={cx('item-list')}>
            <Slider type="villages" space={0} perView={3} />
          </div>
        </div>
        <div className={cx('list')}>
          <div className={cx('heading')}>
            <div className={cx('line-heading')}>
              <h4>Sản phẩm nổi bật</h4>
            </div>
            <Link to={config.routes.products}>Xem tất cả</Link>
          </div>
        </div>
        <div className={cx('item-list')}>
          <Slider type="products" space={0} perView={4} />
        </div>
      </div>
    </>
  );
}

export default Home;
