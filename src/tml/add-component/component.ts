export const name='index.tsx';

export const getContent=(name:string)=>`import React, { memo } from 'react';
import styles from './index.module.scss';

type Props = {
};

export const ${name} = memo(({ }: Props) => {
  return (
    <div className={styles.root}>

    </div>
  );
});
`