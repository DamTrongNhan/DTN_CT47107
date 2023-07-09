import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  to?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'white'
    | 'shadeYellow'
    | 'yellow'
    | 'red'
    | 'green';
  size?: string;
  border?: 'round' | 'circle';
} & Omit<React.ComponentProps<'button'>, 'children'>;

const Button = ({
  className,
  to,
  color,
  size,
  border,
  children,
  ...rest
}: ButtonProps) => {
  const classes = cx('wrapper', className, color, size, border);

  if (to) {
    return (
      <Link to={to}>
        <button className={classes} {...rest}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
