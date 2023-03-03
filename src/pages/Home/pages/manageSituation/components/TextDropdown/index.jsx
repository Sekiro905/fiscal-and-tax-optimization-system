import React from "react";
import { Select } from "antd";

export default function TextDropdown(props) {
  const { manageEdit,abled, arr, defaultValue, popupClassName } = props;
  const { Option } = Select;
  return (
    <Select
      disabled={!abled || !manageEdit}
      bordered={false}
      showArrow={false}
      defaultValue={defaultValue}
      style={{ color: "skyblue" }}
      popupClassName={popupClassName}
    >
      {arr.map((item) => {
        return (
          <Option key={item} value={item}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
}
