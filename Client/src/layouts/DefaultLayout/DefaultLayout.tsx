import classNames from 'classnames/bind';

import Header from '~/layouts/Components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '~/layouts/Components/Footer';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
