import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

import styles from './WorkersCreate.module.scss';
import Button from '~/components/Button';
import { createWorkers } from '~/features/workers/WorkersService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

const WorkersCreate = (props: props) => {
  const [file, setFile] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setFile(reader.result as string);
    };
  };

  let WorkersSchema = yup.object().shape({
    fullName: yup.string().required('Tên nhân công không được trống'),
    age: yup.string().required('Tuổi không được trống'),
    exp: yup.string().required('Năm kinh nghiệm được trống'),
    gender: yup.string().required('Giới tính không được trống'),
    phone: yup.string().required('Phone không được trống'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      exp: '',
      gender: '',
      phone: '',
    },
    validationSchema: WorkersSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        if (user?.accessToken) {
          const res = await createWorkers(
            user.smallHolderId,
            { avatar: file, ...values },
            user.accessToken,
          );
          if (res) {
            toast.success(res.message);
            resetForm();
            navigate(config.routesAdminSmallHolder.adminSmallHolderWorkers);
          }
        }
      } catch (err) {
        console.log(err);
        if (err) {
          toast.error(err.response.data.message);
        }
        resetForm();
      }
    },
  });
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('heading')}>
          <h2>Tạo thông tin nhân công</h2>
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={WorkersSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên nhân công:</h6>

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
                placeholder=""
              />
            </label>
            {formik.errors.fullName && formik.touched.fullName && (
              <p className={cx('mess-error')}>{formik.errors.fullName}</p>
            )}
            <label>
              <h6>Tuổi:</h6>
              <input
                type="text"
                name="age"
                id="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.age && formik.touched.age
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.age && formik.touched.age && (
              <p className={cx('mess-error')}>{formik.errors.age}</p>
            )}
            <label>
              <h6>Năm kinh nghiệm:</h6>

              <input
                type="text"
                name="exp"
                id="exp"
                value={formik.values.exp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.exp && formik.touched.exp
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.exp && formik.touched.exp && (
              <p className={cx('mess-error')}>{formik.errors.exp}</p>
            )}
            <label>
              <h6>Giới tính:</h6>

              <input
                type="text"
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.gender && formik.touched.gender
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.gender && formik.touched.gender && (
              <p className={cx('mess-error')}>{formik.errors.gender}</p>
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
                placeholder=""
              />
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <p className={cx('mess-error')}>{formik.errors.phone}</p>
            )}

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
                        style={{ maxWidth: '30%' }}
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
            <div className={cx('form-btn')}>
              <Button type="submit" color="shadeYellow" border="round">
                Lưu
              </Button>
              <Button
                color="secondary"
                border="round"
                to={config.routesAdminSmallHolder.adminSmallHolderWorkers}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Formik>
      </div>
    </>
  );
};

export default WorkersCreate;
