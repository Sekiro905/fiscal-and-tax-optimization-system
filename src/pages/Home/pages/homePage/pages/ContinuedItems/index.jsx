import React from "react";
import { useEffect, useState } from "react";

import httpUtil from "../../../../../../utils/httpUtil";
import EnterpriseCard from "../../components/EnterpriseCard";

export default function AllItems() {
  const [unFinishedItems, setUnFinishedItems] = useState([]);

  // 获得uid
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const params = {
      industryId: 1,
      uid,
    };
    httpUtil.getUnfinishedEnterpriseListByState(params).then((res) => {
      const {
        code,
        data: { enterpriseList },
      } = res;
      if (code === 200) {
        setUnFinishedItems([...enterpriseList]);
      }
    });
  }, []);

  return (
    <>
      {unFinishedItems.length === 0 ? (
        <></>
      ) : (
        unFinishedItems.map((enterObj) => {
          return <EnterpriseCard enterObj={enterObj} />;
        })
      )}
    </>
  );
}
