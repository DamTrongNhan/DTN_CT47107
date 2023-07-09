import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Dropzone, { DropzoneState } from 'react-dropzone';

import styles from './UserDetail.module.scss';
import Button from '~/components/Button';
import { useAppSelector } from '~/app/hooks';
import { updateProfile, getUser } from '~/features/user/userService';
const cx = classNames.bind(styles);

type props = {};

const UserDetail = (props: props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  const [userData, setUserData] = useState<any | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  const handleDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setFile(reader.result as string);
    };
  };

  const fetchData = async () => {
    try {
      if (user?.accessToken) {
        const res = await getUser(user?._id, user?.accessToken);
        setUserData(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  let UserSchema = yup.object().shape({
    email: yup.string().email('Nhập sai định dạng email'),
    phone: yup.string(),
    fullName: yup.string(),
    password: yup.string().min(8, 'Mật khẩu phải hơn 8 chữ số'),
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
        let dataUser: any = values;
        for (let prop in dataUser) {
          if (
            (dataUser.hasOwnProperty(prop) && dataUser[prop] === '') ||
            prop === 'cPassword'
          ) {
            delete dataUser[prop];
          }
        }
        dataUser = file ? { avatar: file, ...dataUser } : { ...dataUser };
        if (user?.accessToken) {
          const res = await updateProfile(dataUser, user.accessToken);
          if (res) {
            fetchData();
            toast.success(res.message);
            setIsEdit(!isEdit);
            resetForm();
          }
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        resetForm();
      }
    },
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <h2>Thông tin account</h2>
        {!isEdit && (
          <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
            Chỉnh sửa
          </Button>
        )}
      </div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={UserSchema}
        onSubmit={() => formik.handleSubmit()}
      >
        <form onSubmit={formik.handleSubmit}>
          <label>
            <h6>Email:</h6>
            {isEdit ? (
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
            ) : (
              <p>{userData?.email}</p>
            )}
          </label>
          {formik.errors.email && formik.touched.email && (
            <p className={cx('mess-error')}>{formik.errors.email}</p>
          )}
          <label>
            <h6>Phone:</h6>
            {isEdit ? (
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
            ) : (
              <p>{userData?.phone}</p>
            )}
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <p className={cx('mess-error')}>{formik.errors.phone}</p>
          )}
          <label>
            <h6>Tên: </h6>
            {isEdit ? (
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
            ) : (
              <p>{userData?.fullName}</p>
            )}
          </label>
          {formik.errors.fullName && formik.touched.fullName && (
            <p className={cx('mess-error')}>{formik.errors.phone}</p>
          )}
          {isEdit ? (
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
          ) : (
            ''
          )}
          {formik.errors.password && formik.touched.password && (
            <p className={cx('mess-error')}>{formik.errors.password}</p>
          )}
          {isEdit ? (
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
          ) : (
            ''
          )}
          {formik.errors.cPassword && formik.touched.cPassword && (
            <p className={cx('mess-error')}>{formik.errors.cPassword}</p>
          )}
          {isEdit ? (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }: DropzoneState) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {file ? (
                      <img
                        className={cx('fileUploadImage')}
                        src={file}
                        alt="preview"
                        style={{ maxWidth: '20%' }}
                      />
                    ) : (
                      <p className={cx('fileUpload')}>
                        <i>
                          Drag and drop an image here or click to select a file
                        </i>
                      </p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          ) : (
            <img
              src={userData?.avatar}
              className={cx('fileUploadedImage')}
              alt=""
              style={{ maxWidth: '70%' }}
            />
          )}
          {isEdit && (
            <div className={cx('form-btn')}>
              <Button type="submit" color="shadeYellow" border="round">
                Lưu
              </Button>
              <Button color="secondary" border="round" onClick={handleIsEdit}>
                Hủy
              </Button>
            </div>
          )}
        </form>
      </Formik>
    </div>
  );
};

export default UserDetail;
