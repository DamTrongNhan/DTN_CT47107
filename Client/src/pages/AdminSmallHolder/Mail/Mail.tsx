import classNames from 'classnames/bind';

import styles from './Mail.module.scss';

const cx = classNames.bind(styles);
type props = {}
const Mail = (props: props) => {
    return <div className={cx('wrapper')}> Mail</div>;
}

export default Mail;
