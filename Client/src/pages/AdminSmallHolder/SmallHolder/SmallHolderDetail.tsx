import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import styles from './SmallHolderDetail.module.scss';
import Button from '~/components/Button';
import {
  getSmallHolder,
  updateProfile,
} from '~/features/smallHolder/smallHolderService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

const SmallHolderDetail = (props: props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [smallHolder, setSmallHolder] = useState<any | null>(null);
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
        const res = await getSmallHolder(
          user?.smallHolderId,
          user?.accessToken,
        );
        setSmallHolder(res.data);
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
  let smallHolderSchema = yup.object().shape({
    name: yup.string(),
    address: yup.string(),
    city: yup.string(),
    district: yup.string(),
    ward: yup.string(),
    majorWork: yup.string(),
    // materials: yup.string().required('Chất liệu không được trống'),
    quantityWorkers: yup.string(),
    qrCode: yup.string(),
    description: yup.string(),
    exp: yup.string(),
    quantityProduct: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      district: '',
      ward: '',
      majorWork: '',
      // materials: [],
      quantityWorkers: '',
      qrCode: `http://localhost:3000/nongho/${user?.smallHolderId}`,
      description: '',
      exp: '',
      quantityProduct: '',
    },
    validationSchema: smallHolderSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        if (user?.accessToken) {
          let dataSmallHolder: any = values;
          for (let prop in dataSmallHolder) {
            if (
              dataSmallHolder.hasOwnProperty(prop) &&
              dataSmallHolder[prop] === ''
            ) {
              delete dataSmallHolder[prop];
            }
          }
          dataSmallHolder = file
            ? { avatar: file, ...dataSmallHolder }
            : { ...dataSmallHolder };
          const res = await updateProfile(
            user.smallHolderId,
            dataSmallHolder,
            user.accessToken,
          );
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
          <h2>Thông tin nông hộ</h2>
          {!isEdit && (
            <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
              Chỉnh sửa
            </Button>
          )}
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={smallHolderSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên nông hộ:</h6>
              {isEdit ? (
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
                  placeholder="ex: Xóm nghề đan đát rổ truyền thống xã Hòa Bình, huyện Chợ Mới, tỉnh An Giang"
                />
              ) : (
                <p>{smallHolder?.name}</p>
              )}
            </label>
            {formik.errors.name && formik.touched.name && (
              <p className={cx('mess-error')}>{formik.errors.name}</p>
            )}
            <label>
              <h6>Địa chỉ nông hộ:</h6>
              {isEdit ? (
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
                  placeholder="ex: Ấp A, xã Hòa Bình, huyện Chợ Mới, An Giang"
                />
              ) : (
                <p>{smallHolder?.address}</p>
              )}
            </label>
            {formik.errors.address && formik.touched.address && (
              <p className={cx('mess-error')}>{formik.errors.address}</p>
            )}
            <label>
              <h6>Thành phố / Tỉnh:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.city && formik.touched.city
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{smallHolder?.city}</p>
              )}
            </label>
            {formik.errors.city && formik.touched.city && (
              <p className={cx('mess-error')}>{formik.errors.city}</p>
            )}
            <label>
              <h6>Quận / Huyện:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.district && formik.touched.district
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{smallHolder?.district}</p>
              )}
            </label>
            {formik.errors.district && formik.touched.district && (
              <p className={cx('mess-error')}>{formik.errors.district}</p>
            )}
            <label>
              <h6>Phường / Xã:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="ward"
                  id="ward"
                  value={formik.values.ward}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.ward && formik.touched.ward
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{smallHolder?.ward}</p>
              )}
            </label>
            {formik.errors.ward && formik.touched.ward && (
              <p className={cx('mess-error')}>{formik.errors.ward}</p>
            )}
            <label>
              <h6>Chuyên môn nông hộ:</h6>
              {isEdit ? (
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
              ) : (
                <p>{smallHolder?.majorWork}</p>
              )}
            </label>
            {formik.errors.majorWork && formik.touched.majorWork && (
              <p className={cx('mess-error')}>{formik.errors.majorWork}</p>
            )}
            <label>
              <h6>Số nhân công:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="quantityWorkers"
                  id="quantityWorkers"
                  value={formik.values.quantityWorkers}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.quantityWorkers &&
                    formik.touched.quantityWorkers
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{smallHolder?.quantityWorkers}</p>
              )}
            </label>
            {formik.errors.quantityWorkers &&
              formik.touched.quantityWorkers && (
                <p className={cx('mess-error')}>
                  {formik.errors.quantityWorkers}
                </p>
              )}
            {/* <label>
            <h6>Chất liệu sử dụng:</h6>
            {isEdit ? (
              <input
                type="text"
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
                placeholder=""
              />
            ) : (
              <p>materials</p>
            )}
          </label>
          {formik.errors.materials && formik.touched.materials && (
            <p className={cx('mess-error')}>{formik.errors.materials}</p>
          )} */}
            <label>
              <h6>Value mã QrCode:</h6>
              {isEdit ? (
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
              ) : (
                <p>{`${smallHolder?.qrCode}`}</p>
              )}
            </label>
            <label>
              {smallHolder?.qrCode ? (
                <>
                  <h6>Mã QrCode:</h6>
                  <QRCodeCanvas
                    value={`${smallHolder?.qrCode}}`}
                    className={cx('qrImage')}
                    size={200}
                    bgColor={'#ffffff'}
                    fgColor={'#000000'}
                    level={'L'}
                    includeMargin={false}
                    imageSettings={{
                      src: '',
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                  />
                </>
              ) : (
                ''
              )}
            </label>
            {formik.errors.qrCode && formik.touched.qrCode && (
              <p className={cx('mess-error')}>{formik.errors.qrCode}</p>
            )}

            <label>
              <h6>Mô tả:</h6>
              {isEdit ? (
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
              ) : (
                <p>{smallHolder?.description}</p>
              )}
            </label>
            {formik.errors.description && formik.touched.description && (
              <p className={cx('mess-error')}>{formik.errors.description}</p>
            )}
            <label>
              <h6>Kinh nghiệm:</h6>
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
                <p>{smallHolder?.exp}</p>
              )}
            </label>
            {formik.errors.exp && formik.touched.exp && (
              <p className={cx('mess-error')}>{formik.errors.exp}</p>
            )}
            <label>
              <h6>Số lượng sản phẩm:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="quantityProduct"
                  id="quantityProduct"
                  value={formik.values.quantityProduct}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.quantityProduct &&
                    formik.touched.quantityProduct
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{smallHolder?.quantityProduct}</p>
              )}
            </label>
            {formik.errors.quantityProduct &&
              formik.touched.quantityProduct && (
                <p className={cx('mess-error')}>
                  {formik.errors.quantityProduct}
                </p>
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
                src={smallHolder?.avatar}
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

export default SmallHolderDetail;
