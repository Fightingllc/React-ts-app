import { Breadcrumb } from 'antd';
import React from 'react'
import styles from '../Home.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

export default function HomeBreadcrumb() {



  return (
    <Breadcrumb className={styles['home-breadcrumb']}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Application center</Breadcrumb.Item>
  </Breadcrumb>
  )
}
