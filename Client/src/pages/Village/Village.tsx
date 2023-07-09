import * as React from 'react';
import  { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';


import classNames from 'classnames/bind';
import styles from './Village.module.scss';
import img1 from '../../assets/images/introduce-img1.png'

const cx = classNames.bind(styles);

interface IVillageProps {}

const Village: React.FunctionComponent<IVillageProps> = (props) => {
  return <div className={cx('wrapper')}>
    <div className={cx('village-container')}>
      <div className={cx('village-content')}>
        <div className={cx('village-prominent')}>
          <div className={cx('village-header')}>
            <div className={cx('village-title')}>
              <div>
                Làng nghề nổi bật
              </div>
            </div>
            <div className={cx('village-sort')}>
              <FontAwesomeIcon icon={faFilter} className={cx('filter-icon')}/>
              <div className={cx('village-sort-text')}>Sắp xếp: </div>
              <Dropdown
                placeholder="Select an option"
                options={['Ngày tạo mới nhất', 'two', 'three']}
                value="Ngày tạo mới nhất"
                onChange={(value) => console.log('change!', value)}
                onSelect={(value) => console.log('selected!', value)}
                onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                onOpen={() => console.log('open!')}
              />
              {/* <Selection
                options={['Ngày tạo mới nhất', 'two', 'three']}
                value="Ngày tạo mới nhất"
                onChange={(value) => console.log('change!', value)}
              /> */}
            </div>
            </div>

            <div className={cx('village-item')}>
              <div className={cx('village-item-left')}>
                <div className={cx('village-img')}>
                  <img src={img1} alt='Lỗi ảnh'/>
                </div>
                <div className={cx('village-location')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('location-icon')}/>
                  <div className={cx('village-location-text')}>
                    An Giang
                  </div>
                </div>
              </div>
              <div className={cx('village-item-right')}>
                <div className={cx('village-item-right-title')}>Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</div>
                <div className={cx('village-item-right-text')}>Nghề đan đát Hoà Bình có từ rất lâu rồi, 
                              nhiều ông bà làm nghề này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập trung chủ yếu 
                              ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
                              </div>
              </div>
            </div>

            <div className={cx('village-item')}>
              <div className={cx('village-item-left')}>
                <div className={cx('village-img')}>
                  <img src={img1} alt='Lỗi ảnh'/>
                </div>
                <div className={cx('village-location')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('location-icon')}/>
                  <div className={cx('village-location-text')}>
                    An Giang
                  </div>
                </div>
              </div>
              <div className={cx('village-item-right')}>
                <div className={cx('village-item-right-title')}>Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</div>
                <div className={cx('village-item-right-text')}>Nghề đan đát Hoà Bình có từ rất lâu rồi, 
                              nhiều ông bà làm nghề này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập trung chủ yếu 
                              ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
                              </div>
              </div>
            </div>

            <div className={cx('village-item')}>
              <div className={cx('village-item-left')}>
                <div className={cx('village-img')}>
                  <img src={img1} alt='Lỗi ảnh'/>
                </div>
                <div className={cx('village-location')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('location-icon')}/>
                  <div className={cx('village-location-text')}>
                    An Giang
                  </div>
                </div>
              </div>
              <div className={cx('village-item-right')}>
                <div className={cx('village-item-right-title')}>Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</div>
                <div className={cx('village-item-right-text')}>Nghề đan đát Hoà Bình có từ rất lâu rồi, 
                              nhiều ông bà làm nghề này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập trung chủ yếu 
                              ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
                              </div>
              </div>
            </div>

            <div className={cx('village-item')}>
              <div className={cx('village-item-left')}>
                <div className={cx('village-img')}>
                  <img src={img1} alt='Lỗi ảnh'/>
                </div>
                <div className={cx('village-location')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('location-icon')}/>
                  <div className={cx('village-location-text')}>
                    An Giang
                  </div>
                </div>
              </div>
              <div className={cx('village-item-right')}>
                <div className={cx('village-item-right-title')}>Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</div>
                <div className={cx('village-item-right-text')}>Nghề đan đát Hoà Bình có từ rất lâu rồi, 
                              nhiều ông bà làm nghề này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập trung chủ yếu 
                              ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
                              </div>
              </div>
            </div>

            <div className={cx('village-item')}>
              <div className={cx('village-item-left')}>
                <div className={cx('village-img')}>
                  <img src={img1} alt='Lỗi ảnh'/>
                </div>
                <div className={cx('village-location')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('location-icon')}/>
                  <div className={cx('village-location-text')}>
                    An Giang
                  </div>
                </div>
              </div>
              <div className={cx('village-item-right')}>
                <div className={cx('village-item-right-title')}>Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</div>
                <div className={cx('village-item-right-text')}>Nghề đan đát Hoà Bình có từ rất lâu rồi, 
                              nhiều ông bà làm nghề này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập trung chủ yếu 
                              ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
                              </div>
              </div>
            </div>
          </div>
          
          <div className={cx('village-filter')}>
            <div className={cx('village-header')}>
              <div className={cx('village-title')}>
                <div>
                  Địa điểm làng nghề
                </div>
              </div>
            </div>
            <div className={cx('pt10')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Hà Giang</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Cao Bằng</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Bắc Kan</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Lai Châu</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Lạng Sơn</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Yên Bái</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Hà Nội</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Quảng Ninh</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Ninh Bình</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Nam Định</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Quảng Ninh</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Quảng Trị</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Thừa Thiên Huế</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Đà Nẵng</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Thanh Hóa</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Nghệ An</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Hà Tĩnh</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Long An</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Đồng Tháp</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >An Giang</label>
              </div>
            </div>

              <br /><br />
            <div className={cx('village-header')}>
              <div className={cx('village-title')}>
                <div>
                  Làng nghề chuyên môn
                </div>
              </div>
            </div>
            <div className={cx('pt10')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Đan tre, trúc</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Đan mây</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Làm gốm</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Dệt lụa</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Dệt chiếu</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Dệt lưới</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Dệt thổ cẩm</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label  >Làm thuyền, thủng</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Dệt thổ cẩm</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Khảm trai</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Điêu khắc gỗ</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Tranh dân gian</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Làm trống</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Thiêu ren</label>
              </div>
            </div>

            <div className={cx('village-filter-item')}>
              <div className={cx('village-filter-checbox')}>
                <input type="checkbox" id="myCheckbox" className={cx('custom-checkbox')} />
              </div>
              <div className={cx('village-filter-text')}>
                <label >Chạm bạc đồng</label>
              </div>
            </div>
        </div>

        
      </div>

      <div className={cx('pagination')}>
        <ReactPaginate
          nextLabel="next >"
          // onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={25}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  </div>;
};

export default Village;
