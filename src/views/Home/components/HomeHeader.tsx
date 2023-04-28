import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Space } from 'antd';
import classNames from 'classnames';
import React from 'react'
import styles from '../Home.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { MenuProps } from 'antd';




export default function HomeHeader() {
  const name = useSelector((state: RootState) => state.users.infos.name) as string
  // debugger
  
  const head = useSelector((state: RootState) => state.users.infos.head) as string
  console.log('naem',name);
  

    const items1: MenuProps['items'] = [
        {
            key: '1',
            label: (
              <div>message</div>
            ),
        }
    ]
    const items2: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div>个人中心</div>
          ),
        },
        {
          key: '2',
          label: (
            <div>退出</div>
          ),
        }
      ]

  return (
    <div className={styles['home-header']}>
      <span className={styles['home-header-logo']}>
        <i className={classNames('iconfont icon-react', styles['icon-react'])}></i>
        <i className={classNames('iconfont icon-icon-test', styles['icon-icon-test'])}></i>
        <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
      </span>
      <span className={styles['home-header-title']}>在线考勤系统</span>
      <Dropdown menu={{ items: items1 }} arrow placement="bottom">
        <Badge dot>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </Dropdown>
      <Dropdown menu={{ items: items2 }} arrow placement="bottom">
        <Space className={styles['home-header-space']}>
          <Avatar src={head} size="large" /> {name}
        </Space>
      </Dropdown>
    </div>
  )
}
