import React from "react";
import SituationTable from "./components/SituationTable";
import httpUtil from "../../../../utils/httpUtil";
import { useEffect, useState } from "react";
import { Tabs } from "antd";

import "./index.css";

export default function Manage() {
  // 获得uid
  const uid = localStorage.getItem("uid");

  const [items, setItems] = useState([]);

  useEffect(() => {
    httpUtil.getEnterpriseKeyList(uid).then((res) => {
      const { code, data: {enterpriseKeyList} } = res;
      if (code === 200) {
        const itemList = []
        enterpriseKeyList.forEach((enterpriseKey)=>{
          itemList.push(
            {
              label: `${enterpriseKey}`,
              children: <SituationTable uid={uid} enterpriseKey={enterpriseKey} />,
              key: `${enterpriseKey}`,
              closable: false,
              forceRender: true,
            }
          )
        })
        setItems([...itemList])
      }
    });
  }, []);

  return (
    <div className="tabs-wrapper" >
    <Tabs
      type="card"
      items={items}
    />
    </div>
  );
}