import classNames from 'classnames/bind';
import { Virtual, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Carousel } from 'react-bootstrap';

import 'swiper/css/bundle';
import 'swiper/scss';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SlideProps = {
  className?: String;
  carousel?: true | false;
  type?: 'heading' | 'villages' | 'products';
  autoPlay?: false | true;
  space?: number | string | undefined;
  perView?: number | 'auto' | undefined;
};

type Slide = {
  url: string;
  title: string;
}[];

type carousel = {
  url: string;
}[];

const carousels: carousel = [
  {
    url: 'https://znews-photo.zingcdn.me/w1920/Uploaded/mdf_eioxrd/2020_02_06/9_1.jpg',
  },
  {
    url: 'https://znews-photo.zingcdn.me/w1920/Uploaded/mdf_eioxrd/2020_02_06/8_1.jpg',
  },
  {
    url: 'https://znews-photo.zingcdn.me/w1920/Uploaded/mdf_eioxrd/2020_02_06/5_2.jpg',
  },
  {
    url: 'https://znews-photo.zingcdn.me/w1920/Uploaded/mdf_eioxrd/2020_02_06/7_1.jpg',
  },
  {
    url: 'https://znews-photo.zingcdn.me/w960/Uploaded/mdf_eioxrd/2020_02_06/1_4.jpg',
  },
];

const slides: Slide = [
  {
    url: 'https://toplist.vn/images/800px/lang-gom-bat-trang-814755.jpg',
    title: 'Làng gốm Bát Tràng – Một trong các làng nghề nổi tiếng ở Hà Nội',
  },
  {
    url: 'https://static.vinwonders.com/2023/02/lang-nghe-o-ha-noi-5.jpg',
    title: 'Quảng Phú Cầu – Làng nghề làm hương ở Hà Nội',
  },
  {
    url: 'https://static.vinwonders.com/2023/02/lang-nghe-o-ha-noi-3.jpeg',
    title: 'Làng nón Chuông – Làng nghề làm nón ở Hà Nội',
  },
  {
    url: 'https://static.vinwonders.com/2023/02/lang-nghe-o-ha-noi-8.jpg',
    title: 'Làng Đào Thục – Làng nghề múa rối nước độc đáo',
  },
  {
    url: 'https://static.vinwonders.com/2023/02/optimize_lang-nghe-o-ha-noi-10.png',
    title: 'Làng Định Công – Làng nghề ở Hà Nội chuyên làm kim hoàn lâu đời',
  },
];

const Slider = ({
  className,
  carousel,
  type,
  autoPlay,
  space,
  perView,
}: SlideProps) => {
  const between = Number(space);
  const per = Number(perView);
  if (carousel) {
    return (
      <Carousel interval={3000}>
        {carousels.map((slide, index) => {
          return (
            <Carousel.Item className={cx('carousel')} key={index}>
              <img className="d-block " src={slide.url} alt="" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  return (
    <Swiper
      modules={[Virtual, Autoplay]}
      autoplay={
        autoPlay
          ? {
              delay: 3000,
              disableOnInteraction: false,
            }
          : false
      }
      loop={type === 'heading' && true}
      breakpoints={{
        // when window width is >= 360px
        360: {
          slidesPerView: 1,
          spaceBetween: between * 0.4,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: between * 0.4,
        },

        // when window width is >= 1024px
        1080: {
          slidesPerView: type === 'products' ? per - 1 : 3,
          spaceBetween: between * 0.6,
        },
        // when window width is >= 1440px
        1440: {
          slidesPerView: type === 'villages' ? per : 3,
          spaceBetween: between * 0.8,
        },
        // when window width is >= 1800px
        1680: {
          slidesPerView: per,
          spaceBetween: between,
        },
      }}
      virtual
    >
      {slides.map((slide, index) => {
        switch (type) {
          case 'heading':
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div className={cx('slide-heading')}>
                  <img src={slide.url} alt="" />
                </div>
              </SwiperSlide>
            );
          case 'villages':
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div className={cx('card-village')}>
                  <img src={slide.url} alt="" />
                  <p className={cx('title')}>{slide.title}</p>
                </div>
              </SwiperSlide>
            );
          case 'products':
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div className={cx('card-product')}>
                  <img src={slide.url} alt="" />
                  <p className={cx('title')}>Sản phẩm</p>
                </div>
              </SwiperSlide>
            );
          default:
            return null;
        }
      })}
    </Swiper>
  );
};

export default Slider;
