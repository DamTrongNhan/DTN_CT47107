import React from 'react';
import './GlobalStyles.scss';

type GStylesProps = {
  children: React.ReactNode;
};

const GlobalStyles = ({ children }: GStylesProps) => {
  return <>{children}</>;
};

export default GlobalStyles;
