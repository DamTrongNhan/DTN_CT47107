import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import moment from 'moment';

import styles from './Product.module.scss';
import Button from '~/components/Button';
import { getAllProductBySmallHolder } from '~/features/product/productService';
import { useAppSelector } from '~/app/hooks';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

type Props = {};

const Product = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.accessToken && user?.smallHolderId) {
        const res = await getAllProductBySmallHolder(id, user.accessToken);
        setProductList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [table, setTable] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTable(value);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('smallholder')}>
        <h3>Các sản phẩm của nông hộ</h3>

        <Stack className={cx('stack')} spacing={2}>
          <table className={cx('table-custom')}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '20%' }}>Tên sản phẩm</th>
                <th style={{ width: '20%' }}>Giá</th>
                <th style={{ width: '10%' }}>Loại</th>
                <th style={{ width: '15%' }}>CreatedAt</th>
                <th style={{ width: '10%' }}></th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item: any, index) => {
                if (index >= (table - 1) * 10 && index < table * 10 - 1) {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>

                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.type}</td>
                      <td>
                        {moment(Date.parse(item.createdAt)).format(
                          'DD/MM/YYYY',
                        )}
                      </td>
                      <td>
                        <Button
                          color="yellow"
                          border="round"
                          to={`/adminSmallHolder/Product/DetailEdit/${item._id}`}
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          <Pagination
            className={cx('pagination')}
            count={Math.ceil(productList.length / 10)}
            page={table}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Product;
