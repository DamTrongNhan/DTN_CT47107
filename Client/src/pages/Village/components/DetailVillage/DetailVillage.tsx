import classNames from 'classnames/bind';

import styles from './DetailVillage.module.scss';
import left from '~/assets/left.svg';
import right from '~/assets/right.svg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getVillage } from '~/features/village/villageService';
import { useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type Props = {};

const DetailSmallHolder = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);
  const [village, setVillage] = useState({}) as any;

  const fetchData = async () => {
    if (user?.accessToken) {
      const res = await getVillage(id, user.accessToken);
      if (res) {
        setVillage(res.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <div className={cx('image-cropper')}>
          <img src={village?.avatar} alt="" />
        </div>
        <h1>{village?.name}</h1>
      </div>
      <div className={cx('detail-body')}>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          <p>Giới thiệu về làng nghề</p>
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('details')}>
          <div className={cx('detail')}>
            <ul>
              <li>
                Ngày thành lập:{' '}
                {moment(Date.parse(village.createdAt)).format('DD/MM/YYYY')}
              </li>
              <li>Chuyên môn: {village.majorWork}</li>
              <li>Nguyên liệu: Tre, trúc, mây</li>
              <li>Số thành viên: {village.smallHolderId?.length} hộ dân</li>
              <li>Địa chỉ: {village.address}</li>
              <li>Số điện thoại: 0386666707 (chị 9 Nê) </li>
            </ul>
            <img
              src="https://langthangangiang.net/wp-content/uploads/2022/12/1-1024x576.jpg"
              alt=""
            ></img>
          </div>
          <div className={cx('detail')}>
            <img src={village.avatar} alt="" />
            <div className={cx('description')}>
              <p>{village.description}</p>
            </div>
          </div>
          <div className={cx('detail')}>
            <div className={cx('description')}>
              <p>{village.description}</p>
            </div>
            <img src={village.avatar} alt="" />
          </div>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          Thành tích
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('achievement')}>
          <div className={cx('achievement-subtitle')}>
            Trong 3 năm qua, làng nghề đã đạt được các thành tích nổi trội như:
          </div>
          <div className={cx('achievement-item-wrap')}>
            <div className={cx('achievement-item')}>
              <p>Sản lượng</p>
              <p className={cx('achievement-item-number')}>45-55</p>
              <p>Sản phẩm/ ngày</p>
            </div>
            <div className={cx('achievement-item')}>
              <p>Sản xuất</p>
              <p className={cx('achievement-item-number')}>12345</p>
              <p>Sản phẩm</p>
            </div>
            <div className={cx('achievement-item')}>
              <p>Xuất khẩu</p>
              <p className={cx('achievement-item-number')}>4</p>
              <p>Quốc gia</p>
            </div>
          </div>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          Sản phẩm chính
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('products')}>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          Hình ảnh nổi bật
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('village-images')}></div>
      </div>
    </div>
  );
};

export default DetailSmallHolder;
