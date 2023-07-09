import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSearch,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

type Props = {};

const Search = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue !== '') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [searchValue]);

  const handleChange = (e: any) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cx('search')}>
      <Button>
        <FontAwesomeIcon
          className={cx('search-btn')}
          icon={faSearch}
        ></FontAwesomeIcon>
      </Button>
      <input
        ref={inputRef}
        value={searchValue}
        placeholder="Tìm kiếm"
        spellCheck={false}
        onChange={handleChange}
      />
      {!!searchValue && (
        <button id="search-clear" className={cx('clear')} onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      )}
      {loading && (
        <FontAwesomeIcon
          className={cx('loading')}
          icon={faSpinner}
        ></FontAwesomeIcon>
      )}
    </div>
  );
};

export default Search;
