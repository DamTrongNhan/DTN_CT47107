import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

import styles from './ProductCreate.module.scss';
import Button from '~/components/Button';
import { createProduct } from '~/features/product/productService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

const ProductCreate = (props: props) => {
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

  let productSchema = yup.object().shape({
    name: yup.string().required('Tên sản phẩm không được trống'),
    materials: yup.string().required('Chất liệu không được trống'),
    price: yup.string().required('Giá không được trống'),
    type: yup.string().required('Loại không được trống'),
    qrCode: yup.string().required('Value QrCode không được trống'),
    description: yup.string().required('Mô tả không được trống'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      materials: '',
      price: '',
      type: '',
      qrCode: `http://localhost:3000/nongho/${user?.smallHolderId}`,
      description: '',
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        if (user?.accessToken) {
          const res = await createProduct(
            user.smallHolderId,
            { avatar: file, ...values },
            user.accessToken,
          );
          if (res) {
            toast.success(res.message);
            resetForm();
            navigate(config.routesAdminSmallHolder.adminSmallHolderProduct);
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
          <h2>Tạo sản phẩm nông hộ</h2>
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={productSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên sản phẩm:</h6>

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
                placeholder="ex: Nón lá Việt Nam"
              />
            </label>
            {formik.errors.name && formik.touched.name && (
              <p className={cx('mess-error')}>{formik.errors.name}</p>
            )}
            <label>
              <h6>Chất liệu:</h6>

              <textarea
                name="materials"
                id="materials"
                value={formik.values.materials}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.materials && formik.touched.materials
                    ? cx('input-error')
                    : ''
                }
                placeholder="ex: Tre"
              />
            </label>
            {formik.errors.materials && formik.touched.materials && (
              <p className={cx('mess-error')}>{formik.errors.materials}</p>
            )}
            <label>
              <h6>Giá:</h6>

              <input
                type="text"
                name="price"
                id="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.price && formik.touched.price
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.price && formik.touched.price && (
              <p className={cx('mess-error')}>{formik.errors.price}</p>
            )}
            <label>
              <h6>Loại:</h6>

              <input
                type="text"
                name="type"
                id="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.type && formik.touched.type
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.type && formik.touched.type && (
              <p className={cx('mess-error')}>{formik.errors.type}</p>
            )}

            <label>
              <h6>Value mã QrCode:</h6>

              <input
                type="text"
                name="qrCode"
                id="qrCode"
                value={formik.values.qrCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.qrCode && formik.touched.qrCode
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            </label>
            {formik.errors.qrCode && formik.touched.qrCode && (
              <p className={cx('mess-error')}>{formik.errors.qrCode}</p>
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
                to={config.routesAdminSmallHolder.adminSmallHolderProduct}
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

export default ProductCreate;
