import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';

import styles from './SignIn.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { signIn, reset } from '~/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';

const cx = classNames.bind(styles);

type Props = {};

const SignIn = (props: Props) => {
  const [showPass, setShowPass] = useState(false);
  const handelShowPass = () => {
    setShowPass(!showPass);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    if (user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isSuccess, message, isError, navigate, dispatch]);

  let userSchema = yup.object().shape({
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Tên đăng nhập không được trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải hơn 8 chữ số')
      .required('Mật khẩu không được trống'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: (values): void => {
      dispatch(signIn(values));
    },
  });

  return (
    <div className={cx('wrapper')}>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={userSchema}
        onSubmit={() => formik.handleSubmit()}
      >
        <form className={cx('form-card')} onSubmit={formik.handleSubmit}>
          <h1 className={cx('heading')}>Đăng nhập</h1>
          <h4>Tên đăng nhập</h4>
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
          />
          {formik.errors.email && formik.touched.email && (
            <p className={cx('mess-error')}>{formik.errors.email}</p>
          )}
          <label className={cx('pass-wrap')}>
            <h4>Mật khẩu</h4>
            <input
              type={showPass ? 'text' : 'password'}
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
            />

            <Button
              type="button"
              className={cx('show-pass')}
              onClick={handelShowPass}
            >
              <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
            </Button>
          </label>
          {formik.errors.password && formik.touched.password && (
            <p className={cx('mess-error')}>{formik.errors.password}</p>
          )}
          <div className="d-flex w-100 form-check">
            <input type="checkbox" className="form-check-input" />
            <p>Duy trì đăng nhập</p>
          </div>
          <Button type="submit" color="shadeYellow" border="circle">
            Đăng nhập
          </Button>
          <div className={cx('footer')}>
            <p>Quên mật khẩu?</p>
            <p>
              Chưa có tài khoản?
              <Link to={config.routes.signup}> Đăng ký ngay</Link>
            </p>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default SignIn;
