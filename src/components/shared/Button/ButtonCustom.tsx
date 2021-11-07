import React from 'react';

import styles from './ButtonCustom.module.css';

type ButtonCustomProps = {
  color: 'blue' | 'pink';
  className?: string;
  children: string;
};

export default function ButtonCustom(props: ButtonCustomProps) {
  const classNames = [styles.btn, styles[`btn-${props.color}`], props.className];
  return <button className={classNames.join(' ')}>{props.children}</button>;
}
