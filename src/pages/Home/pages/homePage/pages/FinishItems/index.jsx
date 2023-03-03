import React from "react";
import { useEffect, useState } from "react";

import httpUtil from "../../../../../../utils/httpUtil";
import EnterpriseCard from "../../components/EnterpriseCard";

export default function AllItems() {
  const [finishedItems, setFinishedItems] = useState([]);

  // 获得uid
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const params = {
      industryId: 1,
      uid,
    };
    httpUtil.getFinishedEnterpriseListByState(params).then((res) => {
      const {
        code,
        data: { enterpriseList },
      } = res;
      if (code === 200) {
        setFinishedItems([...enterpriseList]);
      }
    });
  }, []);

  return (
    <>
      {finishedItems.length === 0 ? (
        <></>
      ) : (
        finishedItems.map((enterObj) => {
          return <EnterpriseCard enterObj={enterObj} />;
        })
      )}
    </>
  );
}
