import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import moment from 'moment';

import styles from './Workers.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import {
  getAllWorkers,
  deleteWorkers,
} from '~/features/workers/WorkersService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type Props = {};

const Workers = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [WorkersList, setWorkersList] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.accessToken && user?.smallHolderId) {
        const res = await getAllWorkers(user.smallHolderId, user.accessToken);
        console.log(res);

        setWorkersList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
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
            const res = await deleteWorkers(id, user.accessToken);
            if (res) {
              Swal.fire('Deleted!', res.message, 'success');
              fetchData();
            }
          }
        } catch (err) {
          console.log(err);
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
        <h3>Quản lý nhân công</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="green"
            border="round"
            to={config.routesAdminSmallHolder.adminSmallHolderWorkersCreate}
          >
            Thêm thông tin nhân công
          </Button>
        </div>

        <Stack className={cx('stack')} spacing={2}>
          <table className={cx('table-custom')}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '15%' }}>Tên</th>
                <th style={{ width: '15%' }}>Phone</th>
                <th style={{ width: '20%' }}>Năm kinh nghiệm</th>
                <th style={{ width: '15%' }}>CreatedAt</th>
                <th style={{ width: '10%' }}></th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {WorkersList.map((item: any, index) => {
                if (index >= (table - 1) * 10 && index < table * 10 - 1) {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>

                      <td>{item.fullName}</td>
                      <td>{item.phone}</td>
                      <td>{item.exp}</td>
                      <td>
                        {moment(Date.parse(item.createdAt)).format(
                          'DD/MM/YYYY',
                        )}
                      </td>
                      <td>
                        <Button
                          color="yellow"
                          border="round"
                          to={`/adminSmallHolder/Workers/DetailEdit/${item._id}`}
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
            count={Math.ceil(WorkersList.length / 10)}
            page={table}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Workers;
