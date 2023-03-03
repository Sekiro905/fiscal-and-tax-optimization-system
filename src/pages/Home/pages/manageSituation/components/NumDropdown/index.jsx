import React from "react";
import { Select } from "antd";

export default function NumDropdown(props) {
  const {manageEdit,abled,defaultValue,popupClassName,setValue,part,content,queryName,queryArr}=props
  const { Option } = Select
  const number = [];
  for (let i = 0; i <= 100; i++) {
    number.push(i);
  }
  return (
    <Select
      disabled={!abled || !manageEdit}
      bordered={false}
      showArrow={false}
      value={defaultValue}
      style={{ color: "skyblue" }}
      popupClassName={popupClassName}
      onChange={(ratio)=>{
        setValue(part,content,ratio/100,queryName,queryArr)
      }}
    >
      {number.map((item) => {
        return (
          <Option key={item} value={item}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
}
