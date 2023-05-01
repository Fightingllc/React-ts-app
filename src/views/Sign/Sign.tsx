/*
 * @Author: 刘凌晨 liulingchen1109@163.com
 * @Date: 2023-04-29 16:37:28
 * @LastEditTime: 2023-05-01 21:44:13
 * @FilePath: \React-ts-app\src\views\Sign\Sign.tsx
 */
import React, { useEffect, useState } from "react";
import styles from "./Sign.module.scss";
import {
  Button,
  Calendar,
  Descriptions,
  Row,
  Select,
  Space,
  Tag,
  message,
} from "antd";
// 日期组件国际化配置（默认的是英文 转为中文）
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import type { RootState } from "../../store";
import _ from "lodash";
import {
  getTimeAction,
  putTimeAction,
  updateInfos,
} from "../../store/modules/signs";
import type { Infos } from "../../store/modules/signs";
import { toZero } from "../../utils/common";

const date = new Date();

enum DetailKey {
  normal = "正常出勤",
  absent = "矿工",
  miss = "漏打卡",
  late = "迟到",
  early = "早退",
  lateAndEarly = "迟到并早退",
}
// 我们需要将下面的值遇上面做个关联，将上面的枚举类型转换为number类型
const originDetailValue: Record<keyof typeof DetailKey, number> = {
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
};

// 状态
const originDetailState = {
  type: "success" as "success" | "error",
  text: "正常" as "正常" | "异常",
};

export default function Sign() {
  const [month, setMonth] = useState(date.getMonth());
  const navigate = useNavigate();

  const signsInfos = useSelector((state: RootState) => state.signs.infos);
  const usersInfos = useSelector((state: RootState) => state.users.infos);
  const dispatch = useAppDispatch();
  const [detailValue, setDetailValue] = useState({ ...originDetailValue });
  const [detailState, setDetailState] = useState({ ...originDetailState });

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({ userid: usersInfos._id as string })).then(
        (action) => {
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos));
          }
        }
      );
    }
  }, [signsInfos, usersInfos, dispatch]);

  useEffect(() => {
    if (signsInfos.detail) {
      const detailMonth = (signsInfos.detail as { [index: string]: unknown })[
        toZero(month + 1)
      ] as { [index: string]: unknown };

      for (let attr in detailMonth) {
        switch (detailMonth[attr]) {
          case DetailKey.normal:
            originDetailValue.normal++;
            break;
          case DetailKey.absent:
            originDetailValue.absent++;
            break;
          case DetailKey.miss:
            originDetailValue.miss++;
            break;
          case DetailKey.late:
            originDetailValue.late++;
            break;
          case DetailKey.early:
            originDetailValue.early++;
            break;
          case DetailKey.lateAndEarly:
            originDetailValue.lateAndEarly++;
            break;
        }
      }

      //   状态
      for (const attr in originDetailValue) {
        if (
          attr !== "normal" &&
          originDetailValue[attr as keyof typeof originDetailValue] !== 0
        ) {
          setDetailState({
            type: "error",
            text: "异常",
          });
        }
      }

      setDetailValue({ ...originDetailValue });
    }

    return () => {
      //更新前触发或销毁的时候
      setDetailState({
        type: "success",
        text: "正常",
      });
      for (let attr in originDetailValue) {
        originDetailValue[attr as keyof typeof originDetailValue] = 0;
      }
    };
  }, [month, signsInfos]);

  console.log("signsinfos", signsInfos);

  const handleToException = () => {
    navigate(`/exception?month=${month+1}`);
  };

  const handlePutTime = () => {
    dispatch(putTimeAction({ userid: usersInfos._id as string })).then(
      (action) => {
        const { errcode, infos } = (
          action.payload as { [index: string]: unknown }
        ).data as { [index: string]: unknown };
        if (errcode === 0) {
          dispatch(updateInfos(infos as Infos));
          message.success("签到成功");
        }
      }
    );
  };
  const dateCellRender = (value: Dayjs) => {
    const month =
      signsInfos.time &&
      (signsInfos.time as { [index: string]: unknown })[
        toZero(value.month() + 1)
      ];
    console.log("month", value.month);
    const date =
      month && (month as { [index: string]: unknown })[toZero(value.date())];
    let ret = "";
    if (Array.isArray(date)) {
      ret = date.join(" - ");
    }
    console.log("ret", ret);

    return <div className={styles["show-time"]}>{ret}</div>;
  };
  return (
    <div>
      <Descriptions
        className={styles.descriptions}
        layout="vertical"
        column={9}
        bordered
      >
        <Descriptions.Item label="月份">{month + 1}月</Descriptions.Item>
        {/* React只能对数据进行遍历 */}
        {Object.entries(DetailKey).map((v) => (
          <Descriptions.Item key={v[0]} label={v[1]}>
            {detailValue[v[0] as keyof typeof DetailKey]}
          </Descriptions.Item>
        ))}
        <Descriptions.Item label="操作">
          <Button type="primary" ghost size="small" onClick={handleToException}>
            查看详情
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color={detailState.type}>{detailState.text}</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Calendar
        cellRender={dateCellRender}
        locale={locale}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const monthOption = [];
          for (let i = 0; i < 12; i++) {
            monthOption.push(
              <Select.Option key={i} value={i}>
                {i + 1}月
              </Select.Option>
            );
          }
          return (
            <Row
              className={styles["calendar-header"]}
              justify="space-between"
              align="middle"
            >
              <Button onClick={handlePutTime}>在线签到</Button>
              <Space>
                <Button>{value.year()}年</Button>
                <Select
                  value={month}
                  onChange={(newMonth) => {
                    setMonth(newMonth);
                    // console.log(newMonth);

                    // 更新日历 这里使用的onChange是Calendar里的
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOption}
                </Select>
              </Space>
            </Row>
          );
        }}
      />
    </div>
  );
}
