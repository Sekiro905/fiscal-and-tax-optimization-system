import React from "react";
import BasicInfoTable from "./components/BasicInfoTable";
import httpUtil from "../../../../utils/httpUtil";
import { useEffect, useState, useRef } from "react";
import { Tabs } from "antd";

import "./index.css";

export default function Basic() {
  // 获得uid
  const uid = localStorage.getItem("uid");

  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = "";
    const newPanes = [...items];
    newPanes.push({
      label: '新主体公司',
      children: <BasicInfoTable uid={uid} eKey={newActiveKey} />,
      key: newActiveKey,
      closable: false,
      forceRender: true
    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } 
  };

  useEffect(() => {
    httpUtil.getEnterpriseKeyList(uid).then((res) => {
      const { code, data: {enterpriseKeyList} } = res;
      if (code === 200) {
        const itemList = []
        enterpriseKeyList.forEach((enterpriseKey)=>{
          itemList.push(
            {
              label: `${enterpriseKey}`,
              children: <BasicInfoTable uid={uid} eKey={enterpriseKey} />,
              key: `${enterpriseKey}`,
              closable: false,
              forceRender: true,
            }
          )
        })
        setActiveKey(itemList[0].key)
        setItems([...itemList])
      }
    });
  }, []);

  return (
    <div className="tabs-wrapper">
      <Tabs 
      type="editable-card" 
      items={items} 
      activeKey={activeKey}
      onChange={onChange}
      onEdit={onEdit}
      />
    </div>
  );
}
