import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import styles from './SmallHolder.module.scss';
import Button from '~/components/Button';
import {
  getAllSmallHolderByVillage,
  deleteSmallHolderByVillage,
} from '~/features/smallHolder/smallHolderService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type Props = {};

const SmallHolder = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);
  const [SmallHolderList, setSmallHolderList] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.accessToken && user?.smallHolderId) {
        const res = await getAllSmallHolderByVillage(id, user.accessToken);
        setSmallHolderList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idSmallHolder: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (user?.accessToken) {
            const data = { smallHolderId: idSmallHolder, villageId: id };
            const res = await deleteSmallHolderByVillage(
              data,
              user.accessToken,
            );
            if (res) {
              Swal.fire('Deleted!', res.message, 'success');
              fetchData();
            }
          }
        } catch (err) {
          console.log(err);
          if (err) {
            toast.error(err.response.data.message);
          }
        }
      }
    });
  };

  const [table, setTable] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTable(value);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('smallholder')}>
        <h3>Nông hộ nằm trong làng nghề</h3>

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
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {SmallHolderList.map((item: any, index) => {
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
                          to={`/adminSmallHolder/product/${item._id}`}
                        >
                          Sản phẩm
                        </Button>
                        <Button
                          color="yellow"
                          border="round"
                          to={`/adminSmallHolder/SmallHolder/DetailEdit/${item._id}`}
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="red"
                          border="round"
                          onClick={() => handleDelete(item._id)}
                        >
                          Xóa
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
            count={Math.ceil(SmallHolderList.length / 10)}
            page={table}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default SmallHolder;
