import React from "react"
import { Card, Input } from "antd"

import "./index.css"
import "../../../../../../static/我的首页页面所用图标/iconfont.css"

export default function EnterpriseCard(props) {
    const {
        enterpriseKey,
        enterpriseName,
        industryName,
        state,
        updateOrCompletedTime,
        createTime,
        note
    } = props.enterObj
  return (
    <>
      <Card
        title={enterpriseKey}
        extra={<span>创建时间:{createTime}</span>}
        style={{
          width: 400,
          height:300,
          marginBottom: 8,
          marginRight:8
        }}
      >
        <div style={{display:"flex",justifyContent:"space-between",height:22}}>
            <span>公司名称:{enterpriseName}</span>
            <span className="card-icon-wrapper">{state===1?<i className="iconfont unfinish-icon">&#xe818;</i>:<i className="iconfont finish-icon">&#xe66e;</i>}</span>
        </div>
        <div>所属行业:{industryName}</div>
        <div>完成时间:{updateOrCompletedTime}</div>
        <div>
          备注:
          <Input.TextArea
            maxLength={100}
            style={{
              height: 90,
              resize: "none",
            }}
            defaultValue={note}
          />
        </div>
      </Card>
    </>
  );
}
