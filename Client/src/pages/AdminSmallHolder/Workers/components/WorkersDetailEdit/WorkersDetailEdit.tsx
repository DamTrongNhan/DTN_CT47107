import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './WorkersDetailEdit.module.scss';
import Button from '~/components/Button';
import { getWorkers, updateProfile } from '~/features/workers/WorkersService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

export const WorkersDetailEdit = (props: props) => {
  const { id } = useParams() as { id: string };

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [Workers, setWorkers] = useState<any | null>(null);
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
        const res = await getWorkers(id, user?.accessToken);
        setWorkers(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  let WorkersSchema = yup.object().shape({
    fullName: yup.string(),
    age: yup.string(),
    exp: yup.string(),
    gender: yup.string(),
    phone: yup.string(),
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
        let dataWorkers: any = values;
        for (let prop in dataWorkers) {
          if (dataWorkers.hasOwnProperty(prop) && dataWorkers[prop] === '') {
            delete dataWorkers[prop];
          }
        }
        dataWorkers = file
          ? { avatar: file, ...dataWorkers }
          : { ...dataWorkers };

        if (user?.accessToken) {
          const res = await updateProfile(id, dataWorkers, user.accessToken);
          if (res) {
            toast.success(res.message);
            setIsEdit(false);
            resetForm();
            fetchData();
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
          <h2>Thông tin nhân công</h2>
          {!isEdit && (
            <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
              Chỉnh sửa
            </Button>
          )}
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={WorkersSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên nhân công:</h6>
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
                  placeholder=""
                />
              ) : (
                <p>{Workers?.fullName}</p>
              )}
            </label>
            {formik.errors.fullName && formik.touched.fullName && (
              <p className={cx('mess-error')}>{formik.errors.fullName}</p>
            )}
            <label>
              <h6>Tuổi:</h6>
              {isEdit ? (
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
              ) : (
                <p>{Workers?.age}</p>
              )}
            </label>
            {formik.errors.age && formik.touched.age && (
              <p className={cx('mess-error')}>{formik.errors.age}</p>
            )}
            <label>
              <h6>Năm kinh nghiệm:</h6>
              {isEdit ? (
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
              ) : (
                <p>{Workers?.exp}</p>
              )}
            </label>
            {formik.errors.exp && formik.touched.exp && (
              <p className={cx('mess-error')}>{formik.errors.exp}</p>
            )}
            <label>
              <h6>Giới tính:</h6>
              {isEdit ? (
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
              ) : (
                <p>{Workers?.gender}</p>
              )}
            </label>
            {formik.errors.gender && formik.touched.gender && (
              <p className={cx('mess-error')}>{formik.errors.gender}</p>
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
                  placeholder=""
                />
              ) : (
                <p>{Workers?.phone}</p>
              )}
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <p className={cx('mess-error')}>{formik.errors.phone}</p>
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
                            Drag and drop an image here or click to select a
                            file
                          </i>
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            ) : (
              <img
                src={Workers?.avatar}
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
    </>
  );
};

export default WorkersDetailEdit;
