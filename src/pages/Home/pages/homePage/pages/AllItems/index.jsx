import React from "react";
import { useEffect, useState } from "react";

import httpUtil from "../../../../../../utils/httpUtil";
import EnterpriseCard from "../../components/EnterpriseCard";

export default function AllItems() {
  const [allItems, setAllItems] = useState([]);

  // 获得uid
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const params = {
      industryId: 1,
      uid,
    };
    httpUtil.getAllEnterpriseListByState(params).then((res) => {
      const {
        code,
        data: { enterpriseList },
      } = res;
      if (code === 200) {
        setAllItems([...enterpriseList]);
      }
    });
  }, []);

  return (
    <>
      {allItems.length === 0 ? (
        <></>
      ) : (
        allItems.map((enterObj) => {
          return <EnterpriseCard enterObj={enterObj} />;
        })
      )}
    </>
  );
}
