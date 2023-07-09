import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

import styles from './VillageCreate.module.scss';
import Button from '~/components/Button';
import { createVillage } from '~/features/village/villageService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

const VillageCreate = (props: props) => {
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

  let VillageSchema = yup.object().shape({
    name: yup.string().required('Tên làng nghề không được trống'),
    address: yup.string().required('Địa chỉ không được trống'),
    majorWork: yup.string().required('Chuyên môn không được trống'),
    group: yup.string().required('Nhóm không được trống'),
    description: yup.string().required('Mô tả không được trống'),
  });

  const formik = useFormik({
    initialValues: {
      name: 'Làng nghề Vị Thủy',
      address: 'Hậu Giang',
      majorWork: 'Nón',
      group: 'Nhóm',
      description: 'Làng nghề từ hồi đó',
    },
    validationSchema: VillageSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        if (user?.accessToken) {
          const res = await createVillage(
            { avatar: file, ...values },
            user.accessToken,
          );
          if (res) {
            toast.success(res.message);
            resetForm();
            navigate(config.routesAdmin.adminVillage);
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
          <h2>Tạo thông tin làng nghề</h2>
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={VillageSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên làng nghề:</h6>

              <textarea
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.name && formik.touched.name
                    ? cx('input-error')
                    : ''
                }
                placeholder="ex: Làng nghề Vị Thủy"
              />
            </label>
            {formik.errors.name && formik.touched.name && (
              <p className={cx('mess-error')}>{formik.errors.name}</p>
            )}
            <label>
              <h6>Địa chỉ:</h6>

              <textarea
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.address && formik.touched.address
                    ? cx('input-error')
                    : ''
                }
                placeholder="ex: Cần Thơ"
              />
            </label>
            {formik.errors.address && formik.touched.address && (
              <p className={cx('mess-error')}>{formik.errors.address}</p>
            )}
            <label>
              <h6>Công việc chính:</h6>

              <input
                type="text"
                name="majorWork"
                id="majorWork"
                value={formik.values.majorWork}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.majorWork && formik.touched.majorWork
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.majorWork && formik.touched.majorWork && (
              <p className={cx('mess-error')}>{formik.errors.majorWork}</p>
            )}
            <label>
              <h6>Nhóm:</h6>

              <input
                type="text"
                name="group"
                id="group"
                value={formik.values.group}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.group && formik.touched.group
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.group && formik.touched.group && (
              <p className={cx('mess-error')}>{formik.errors.group}</p>
            )}

            <label>
              <h6>Mô tả:</h6>

              <textarea
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.description && formik.touched.description
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.description && formik.touched.description && (
              <p className={cx('mess-error')}>{formik.errors.description}</p>
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
                to={config.routesAdmin.adminVillage}
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

export default VillageCreate;
