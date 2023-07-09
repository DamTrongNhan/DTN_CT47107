import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';

import styles from './SignUp.module.scss';
import config from '~/config';
import { signUp, reset } from '~/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Props = {};

const SignUp = (props: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const handelShowPass = () => {
    setShowPass(!showPass);
  };
  const handelShowPass2 = () => {
    setShowPass2(!showPass2);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isError, isSuccess, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate('/dangnhap');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  let userSchema = yup.object().shape({
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Tên đăng nhập không được trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải hơn 8 chữ số')
      .required('Mật khẩu không được trống'),
    cPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Mật khẩu nhập lại không khớp'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cPassword: '',
    },
    validationSchema: userSchema,
    onSubmit: (values): void => {
      dispatch(signUp(values));
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
          <h1>Đăng ký</h1>
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
              {showPass ? (
                <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              )}
            </Button>
          </label>
          {formik.errors.password && formik.touched.password && (
            <p className={cx('mess-error')}>{formik.errors.password}</p>
          )}
          <label className={cx('pass-wrap')}>
            <h4>Xác nhận mật khẩu</h4>
            <input
              type={showPass2 ? 'text' : 'password'}
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
            />
            <Button
              type="button"
              className={cx('show-pass')}
              onClick={handelShowPass2}
            >
              {showPass2 ? (
                <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              )}
            </Button>
          </label>
          {formik.errors.cPassword && formik.touched.cPassword && (
            <p className={cx('mess-error')}>{formik.errors.cPassword}</p>
          )}
          <div className="d-flex">
            <input type="checkbox" className="form-check-input" />
            <p className="m-0">
              Đồng ý với
              <Link to={config.routes.signup}> Điều khoản sử dụng </Link>
              và <Link to={config.routes.signup}>Chính sách bảo mật</Link> của
              chúng tôi
            </p>
          </div>
          <Button type="submit" color="shadeYellow" border="circle">
            Đăng ký
          </Button>
          <div className={cx('footer')}>
            <p>
              Đã có tài khoản?
              <Link to={config.routes.signin}> Đăng nhập </Link>
            </p>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default SignUp;
