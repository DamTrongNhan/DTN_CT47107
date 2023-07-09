import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';

import styles from './UserCreate.module.scss';
import Button from '~/components/Button';
import { useState, useEffect } from 'react';
import { useAppSelector } from '~/app/hooks';
import { createUser } from '~/features/user/userService';
import { toast } from 'react-toastify';
import config from '~/config';
const cx = classNames.bind(styles);

type props = {};

const UserCreate = (props: props) => {
  const { user } = useAppSelector((state) => state.auth);

  let UserSchema = yup.object().shape({
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Email không được trống'),
    phone: yup.string().required('Phone không được trống'),
    fullName: yup.string().required('Tên không được trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải hơn 8 chữ số')
      .required('Password không được trống'),
    cPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Mật khẩu nhập lại không khớp'),
  });
  type values = Record<string, string>;
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      fullName: '',
      password: '',
      cPassword: '',
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
        <h2>Tạo account</h2>
      </div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={UserSchema}
        onSubmit={() => formik.handleSubmit()}
      >
        <form onSubmit={formik.handleSubmit}>
          <label>
            <h6>Email:</h6>
            <input
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.email && formik.touched.email
                  ? cx('input-error')
                  : ''
              }
              placeholder="ex:nhan@gmail.com"
            />
          </label>
          {formik.errors.email && formik.touched.email && (
            <p className={cx('mess-error')}>{formik.errors.email}</p>
          )}
          <label>
            <h6>Phone:</h6>

            <input
              type="text"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.phone && formik.touched.phone
                  ? cx('input-error')
                  : ''
              }
              placeholder="ex:0883264567"
            />
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <p className={cx('mess-error')}>{formik.errors.phone}</p>
          )}
          <label>
            <h6>Tên: </h6>

            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.fullName && formik.touched.fullName
                  ? cx('input-error')
                  : ''
              }
              placeholder="ex:Trong Nhan"
            />
          </label>
          {formik.errors.fullName && formik.touched.fullName && (
            <p className={cx('mess-error')}>{formik.errors.phone}</p>
          )}

          <label>
            <h6>Password: </h6>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.password && formik.touched.password
                  ? cx('input-error')
                  : ''
              }
              placeholder=""
            />
          </label>

          {formik.errors.password && formik.touched.password && (
            <p className={cx('mess-error')}>{formik.errors.password}</p>
          )}

          <label>
            <h6>Confirm password: </h6>
            <input
              type="password"
              name="cPassword"
              id="cPassword"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.cPassword && formik.touched.cPassword
                  ? cx('input-error')
                  : ''
              }
              placeholder=""
            />
          </label>

          {formik.errors.cPassword && formik.touched.cPassword && (
            <p className={cx('mess-error')}>{formik.errors.cPassword}</p>
          )}
          <div className={cx('form-btn')}>
            <Button
              type="submit"
              color="shadeYellow"
              border="round"
            >
              Lưu
            </Button>
            <Button color="secondary" border="round" to={config.routesAdmin.adminUser}>
              Hủy
            </Button>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default UserCreate;
