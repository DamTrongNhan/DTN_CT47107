import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles from './Orders.module.scss';

const cx = classNames.bind(styles);

type Props = {};

const Orders = (props: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div style={{ minWidth: '30%' }}>
        <h3>Đơn hàng đã nhận</h3>
        <table className={cx('table-custom-1')}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Mã đơn hàng</th>
              <th style={{ width: '35%' }}>Sản phẩm</th>
              <th style={{ width: '15%' }}>Số lượng</th>
              <th style={{ width: '15%' }}>Thời hạn</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => {
                window.location.href = '/admin/village';
              }}
            >
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Cập nhật
                </Button>
              </td>
            </tr>
            <tr>
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Cập nhật
                </Button>
              </td>
            </tr>
            <tr>
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Cập nhật
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>Đơn hàng mới</h3>
        <table className={cx('table-custom-2')}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Mã đơn hàng</th>
              <th style={{ width: '35%' }}>Sản phẩm</th>
              <th style={{ width: '15%' }}>Số lượng</th>
              <th style={{ width: '15%' }}>Thời hạn</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Xem chi tiết
                </Button>
              </td>
            </tr>
            <tr>
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Xem chi tiết
                </Button>
              </td>
            </tr>
            <tr>
              <td>#20230515</td>
              <td>Rổ tre tròn cỡ lớn (40cm)</td>
              <td>1000 cái</td>
              <td>04/06/2023</td>
              <td>
                <Button color="yellow" border="round">
                  Xem chi tiết
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
