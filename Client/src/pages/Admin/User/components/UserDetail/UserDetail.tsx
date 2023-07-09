import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';

import styles from './UserDetail.module.scss';
import Button from '~/components/Button';
import { useAppSelector } from '~/app/hooks';
import { createUser } from '~/features/user/userService';
import { getUser } from '~/features/user/userService';

const cx = classNames.bind(styles);

type props = {};

const UserDetail = (props: props) => {
  const { user } = useAppSelector((state) => state.auth);

  const { id } = useParams() as { id: string };
  const [userData, setUserData] = useState<any>({});

  const fetchData = async () => {
    try {
      if (user?.accessToken) {
        const res = await getUser(id, user.accessToken);
        console.log(res.data);

        setUserData(res.data);
      }
    } catch (err) {
      console.error(err);
      if (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let UserSchema = yup.object().shape({
    isAdmin: yup.boolean(),
    isAdminSmallHolder: yup.boolean(),
  });
  type values = Record<string, string>;
  const formik = useFormik({
    initialValues: {
      isAdmin: false,
      isAdminSmallHolder: false,
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        if (user?.accessToken) {
          const res = await createUser(values, user.accessToken);
          toast.success(res.message);
          resetForm();
        }
      } catch (err) {
        console.log(err);
        if (err) {
          toast.error(err.response.data.message);
          resetForm();
        }
      }
    },
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <h2>Info account</h2>
      </div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={UserSchema}
        onSubmit={() => formik.handleSubmit()}
      >
        <form className={cx('form-user-detail')} onSubmit={formik.handleSubmit}>
          <label>
            <h6>Email:</h6>
            <p>{userData.email}</p>
          </label>

          <label>
            <h6>Phone:</h6>
            <p>{userData.phone}</p>
          </label>

          <label>
            <h6>FullName: </h6>

            <p>{userData.fullName}</p>
          </label>

          <label>
            <h6>Role: </h6>
            <p>{userData.isAdmin ? 'Admin' : 'User'} </p>
          </label>

          {formik.errors.isAdmin && formik.touched.isAdmin && (
            <p className={cx('mess-error')}>{formik.errors.isAdmin}</p>
          )}
          <label>
            <h6>isAdminSmallHolder: </h6>
            <p>{`${userData.isAdminSmallHolder}`} </p>
          </label>

          {formik.errors.isAdminSmallHolder &&
            formik.touched.isAdminSmallHolder && (
              <p className={cx('mess-error')}>
                {formik.errors.isAdminSmallHolder}
              </p>
            )}
          <label>
            <h6>CreatedAt: </h6>

            <p>{moment(Date.parse(userData.createdAt)).format('DD/MM/YYYY')}</p>
          </label>

          {/* <Button type="submit" color="shadeYellow" border="round">
            Save
          </Button> */}
        </form>
      </Formik>
    </div>
  );
};

export default UserDetail;
