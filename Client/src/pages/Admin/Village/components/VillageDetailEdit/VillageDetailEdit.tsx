// dung react select de them mang nong ho

import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useParams } from 'react-router-dom';

import styles from './VillageDetailEdit.module.scss';
import Button from '~/components/Button';
import { getVillage, updateProfile } from '~/features/village/villageService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

export const VillageDetailEdit = (props: props) => {
  const { id } = useParams() as { id: string };

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [Village, setVillage] = useState<any | null>(null);
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
        const res = await getVillage(id, user?.accessToken);
        setVillage(res.data);
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
  let VillageSchema = yup.object().shape({
    name: yup.string(),
    address: yup.string(),
    majorWork: yup.string(),
    group: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      majorWork: '',
      group: '',
      description: '',
    },
    validationSchema: VillageSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        let dataVillage: any = values;
        for (let prop in dataVillage) {
          if (dataVillage.hasOwnProperty(prop) && dataVillage[prop] === '') {
            delete dataVillage[prop];
          }
        }
        dataVillage = file
          ? { avatar: file, ...dataVillage }
          : { ...dataVillage };

        if (user?.accessToken) {
          const res = await updateProfile(id, dataVillage, user.accessToken);
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
          <h2>Thông tin làng nghề</h2>
          {!isEdit && (
            <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
              Chỉnh sửa
            </Button>
          )}
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={VillageSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên làng nghề:</h6>
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
                  placeholder="ex: Làng nghề Vị Thủy"
                />
              ) : (
                <p>{Village?.name}</p>
              )}
            </label>
            {formik.errors.name && formik.touched.name && (
              <p className={cx('mess-error')}>{formik.errors.name}</p>
            )}
            <label>
              <h6>Địa chỉ:</h6>
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
                  placeholder="ex: Cần Thơ"
                />
              ) : (
                <p>{Village?.address}</p>
              )}
            </label>
            {formik.errors.address && formik.touched.address && (
              <p className={cx('mess-error')}>{formik.errors.address}</p>
            )}
            <label>
              <h6>Công việc chính:</h6>
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
                <p>{Village?.majorWork}</p>
              )}
            </label>
            {formik.errors.majorWork && formik.touched.majorWork && (
              <p className={cx('mess-error')}>{formik.errors.majorWork}</p>
            )}
            <label>
              <h6>Nhóm:</h6>
              {isEdit ? (
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
              ) : (
                <p>{Village?.group}</p>
              )}
            </label>
            {formik.errors.group && formik.touched.group && (
              <p className={cx('mess-error')}>{formik.errors.group}</p>
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
                <p>{Village?.description}</p>
              )}
            </label>
            {formik.errors.description && formik.touched.description && (
              <p className={cx('mess-error')}>{formik.errors.description}</p>
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
                src={Village?.avatar}
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

export default VillageDetailEdit;
