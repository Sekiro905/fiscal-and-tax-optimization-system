import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Space, Table, message, Radio, Checkbox } from "antd";
import { Content } from "antd/lib/layout/layout";
import httpUtil from "../../../../../../utils/httpUtil";

import NumDropdown from "../NumDropdown";
import TextDropdown from "../TextDropdown";

export default function SituationTable(props) {
  const { uid, enterpriseKey } = props;
  const params = {
    uid,
    enterpriseKey: enterpriseKey.length !== "" ? enterpriseKey : "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageEdit, setManageEdit] = useState(false);
  const [isResGet,setIsResGet] = useState(true)

  // 企业经营信息字段
  const [annualCost, setannualCost] = useState(0);
  const [annualTurnover, setannualTurnover] = useState(0);
  const [salesTaxpayer, setsalesTaxpayer] = useState(-1);
  const [revenueRelateList, setrevenueRelateList] = useState([]);
  const [costRelatedList, setcostRelatedList] = useState([]);
  const [manualRelatedDto, setmanualRelatedDto] = useState({});

  // 企业对应业务
  const [businessList, setBusinessList] = useState([]);

  // 各服务资质选择
  // 运输服务
  const [isGeneralTaxpayerOfTs, setisGeneralTaxpayerOfTs] = useState(false);
  const [isNaturalPersonOfTs, setisNaturalPersonOfTs] = useState(false);
  const [isSmallscaleTaxpayerOfTs, setisSmallscaleTaxpayerOfTs] =
    useState(false);
  // 仓储与搬运服务
  const [isGeneralTaxpayerOfWHs, setisGeneralTaxpayerOfWHs] = useState(false);
  const [isNaturalPersonOfWHs, setisNaturalPersonOfWHs] = useState(false);
  const [isSmallscaleTaxpayerOfWHs, setisSmallscaleTaxpayerOfWHs] =
    useState(false);
  // 车辆销售
  const [isGeneralTaxpayerOfCs, setisGeneralTaxpayerOfCs] = useState(false);
  const [isNaturalPersonOfCs, setisNaturalPersonOfCs] = useState(false);
  const [isSmallscaleTaxpayerOfCs, setisSmallscaleTaxpayerOfCs] =
    useState(false);
  // 运输代理服务
  const [isGeneralTaxpayerOfTPs, setisGeneralTaxpayerOfTPs] = useState(false);
  const [isNaturalPersonOfTPs, setisNaturalPersonOfTPs] = useState(false);
  const [isSmallscaleTaxpayerOfTPs, setisSmallscaleTaxpayerOfTPs] =
    useState(false);
  // 挂靠服务
  const [isGeneralTaxpayerOfAs, setisGeneralTaxpayerOfAs] = useState(false);
  const [isNaturalPersonOfAs, setisNaturalPersonOfAs] = useState(false);
  const [isSmallscaleTaxpayerOfAs, setisSmallscaleTaxpayerOfAs] =
    useState(false);

  // 各供应商资质选择
  // 车辆成本
  const [isGeneralTaxpayerOfVc, setisGeneralTaxpayerOfVc] = useState(false);
  const [isNaturalPersonOfVc, setisNaturalPersonOfVc] = useState(false);
  const [isSmallscaleTaxpayerOfVc, setisSmallscaleTaxpayerOfVc] =
    useState(false);
  // 人工成本
  const [isGeneralTaxpayerOfHc, setisGeneralTaxpayerOfHc] = useState(false);
  const [isNaturalPersonOfHc, setisNaturalPersonOfHc] = useState(false);
  const [isSmallscaleTaxpayerOfHc, setisSmallscaleTaxpayerOfHc] =
    useState(false);
  // 办公成本
  const [isGeneralTaxpayerOfOc, setisGeneralTaxpayerOfOc] = useState(false);
  const [isNaturalPersonOfOc, setisNaturalPersonOfOc] = useState(false);
  const [isSmallscaleTaxpayerOfOc, setisSmallscaleTaxpayerOfOc] =
    useState(false);
  // 运输成本(油费)
  const [isGeneralTaxpayerOfTOc, setisGeneralTaxpayerOfTOc] = useState(false);
  // 运输成本(路桥费)
  const [isGeneralTaxpayerOfTRc, setisGeneralTaxpayerOfTRc] = useState(false);

  // 计算结果
  const [calData, setCalData] = useState([ ])

  // 设置收入相关，支出相关中占比，金额默认值的函数
  const setDefault = (part, content, queryName, queryArr) => {
    if (part === "r") {
      if (
        queryArr.some((Obj) => {
          return Obj.businessName === queryName;
        })
      ) {
        if (content === "businessRatio") {
          return queryArr.find((Obj) => {
            return Obj.businessName === queryName;
          }).businessRatio;
        }
        if (content === "amount") {
          return queryArr.find((Obj) => {
            return Obj.businessName === queryName;
          }).amount;
        }
        if (content === "generalTaxpayerRatio") {
          return queryArr.find((Obj) => {
            return Obj.businessName === queryName;
          }).generalTaxpayerRatio*100;
        }
        if (content === "smallscaleTaxpayerRatio") {
          return queryArr.find((Obj) => {
            return Obj.businessName === queryName;
          }).smallscaleTaxpayerRatio*100;
        }
        if (content === "naturalPersonRatio") {
          return queryArr.find((Obj) => {
            return Obj.businessName === queryName;
          }).naturalPersonRatio*100;
        }
      } else if (content === "businessRatio" || content === "amount") return "";
      else return 0;
    }
    if (part === "c") {
      if (
        queryArr.some((Obj) => {
          return Obj.name === queryName;
        })
      ) {
        if (content === "costRatio") {
          return queryArr.find((Obj) => {
            return Obj.name === queryName;
          }).costRatio;
        }
        if (content === "amount") {
          return queryArr.find((Obj) => {
            return Obj.name === queryName;
          }).amount;
        }
        if (content === "generalTaxpayerRatio") {
          return queryArr.find((Obj) => {
            return Obj.name === queryName;
          }).supplierProportions[0].proportion*100;
        }
        if (content === "smallscaleTaxpayerRatio") {
          return queryArr.find((Obj) => {
            return Obj.name === queryName;
          }).supplierProportions[1].proportion*100;
        }
        if (content === "naturalPersonRatio") {
          return queryArr.find((Obj) => {
            return Obj.name === queryName;
          }).supplierProportions[2].proportion*100;
        }
      } else if (content === "costRatio" || content === "amount") return "";
      else return 0;
    }
  };

  // 修改收入相关，支出相关中占比，金额的函数
  const setValue = (part, content, newValue, queryName, queryArr) => {
    if (part === "r") {
      if (
        queryArr.some((Obj) => {
          return Obj.businessName === queryName;
        })
      ) {
        if (content === "businessRatio") {
          setrevenueRelateList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.businessName === queryName;
                })
                ? { ...Obj, businessRatio: newValue }
                : Obj;
            })
          );
        }
        if (content === "amount") {
          setrevenueRelateList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.businessName === queryName;
                })
                ? { ...Obj, amount: newValue }
                : Obj;
            })
          );
        }
        if (content === "generalTaxpayerRatio") {
          setrevenueRelateList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.businessName === queryName;
                })
                ? { ...Obj, generalTaxpayerRatio: newValue }
                : Obj;
            })
          );
        }
        if (content === "smallscaleTaxpayerRatio") {
          setrevenueRelateList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.businessName === queryName;
                })
                ? { ...Obj, smallscaleTaxpayerRatio: newValue }
                : Obj;
            })
          );
        }
        if (content === "naturalPersonRatio") {
          setrevenueRelateList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.businessName === queryName;
                })
                ? { ...Obj, naturalPersonRatio: newValue }
                : Obj;
            })
          );
        }
      } else {
        if (newValue !== 0) {
          let addObj = {
            businessName: queryName,
            amount: 0,
            businessRatio: 0,
            generalTaxpayerRatio: 0,
            naturalPersonRatio: 0,
            smallscaleTaxpayerRatio: 0,
          };
          if (content === "businessRatio") {
            setrevenueRelateList([
              ...revenueRelateList,
              { ...addObj, businessRatio: newValue },
            ]);
          }
          if (content === "amount") {
            setrevenueRelateList([
              ...revenueRelateList,
              { ...addObj, amount: newValue },
            ]);
          }
          if (content === "generalTaxpayerRatio") {
            setrevenueRelateList([
              ...revenueRelateList,
              { ...addObj, generalTaxpayerRatio: newValue },
            ]);
          }
          if (content === "smallscaleTaxpayerRatio") {
            setrevenueRelateList([
              ...revenueRelateList,
              { ...addObj, smallscaleTaxpayerRatio: newValue },
            ]);
          }
          if (content === "naturalPersonRatio") {
            setrevenueRelateList([
              ...revenueRelateList,
              { ...addObj, naturalPersonRatio: newValue },
            ]);
          }
        }
      }
    }
    if (part === "c") {
      if (
        queryArr.some((Obj) => {
          return Obj.name === queryName;
        })
      ) {
        if (content === "costRatio") {
          setcostRelatedList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.name === queryName;
                })
                ? { ...Obj, costRatio: newValue }
                : Obj;
            })
          );
        }
        if (content === "generalTaxpayerRatio") {
          setcostRelatedList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.name === queryName;
                })
                ? {
                    ...Obj,
                    supplierProportions: queryArr[
                      index
                    ].supplierProportions.map((sObj, sIndex) => {
                      return sIndex ===
                        queryArr[index].supplierProportions.findIndex((Obj) => {
                          return Obj.supId === 1;
                        })
                        ? { ...sObj, proportion: newValue }
                        : sObj;
                    }),
                  }
                : Obj;
            })
          );
        }
        if (content === "smallscaleTaxpayerRatio") {
          setcostRelatedList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.name === queryName;
                })
                ? {
                    ...Obj,
                    supplierProportions: queryArr[
                      index
                    ].supplierProportions.map((sObj, sIndex) => {
                      return sIndex ===
                        queryArr[index].supplierProportions.findIndex((Obj) => {
                          return Obj.supId === 2;
                        })
                        ? { ...sObj, proportion: newValue }
                        : sObj;
                    }),
                  }
                : Obj;
            })
          );
        }
        if (content === "naturalPersonRatio") {
          setcostRelatedList(
            queryArr.map((Obj, index) => {
              return index ===
                queryArr.findIndex((Obj) => {
                  return Obj.name === queryName;
                })
                ? {
                    ...Obj,
                    supplierProportions: queryArr[
                      index
                    ].supplierProportions.map((sObj, sIndex) => {
                      return sIndex ===
                        queryArr[index].supplierProportions.findIndex((Obj) => {
                          return Obj.supId === 3;
                        })
                        ? { ...sObj, proportion: newValue }
                        : sObj;
                    }),
                  }
                : Obj;
            })
          );
        }
      } else {
        if (newValue !== 0) {
          let addObj;
          if (
            queryName === "运输成本(油费)" ||
            queryName === "运输成本(路桥费)"
          ) {
            addObj = {
              name: queryName,
              industryId: 1,
              costRatio: 0,
              supplierProportions: [
                {
                  proportion: 0,
                  supId: 1,
                },
              ],
            };
          } else {
            addObj = {
              name: queryName,
              industryId: 1,
              costRatio: 0,
              supplierProportions: [
                {
                  proportion: 0,
                  supId: 1,
                },
                {
                  proportion: 0,
                  supId: 2,
                },
                {
                  proportion: 0,
                  supId: 3,
                },
              ],
            };
          }
          if (content === "costRatio") {
            setcostRelatedList([
              ...costRelatedList,
              { ...addObj, costRatio: newValue },
            ]);
          }
          if (content === "generalTaxpayerRatio") {
            setcostRelatedList([
              ...costRelatedList,
              {
                ...addObj,
                supplierProportions: [
                  { proportion: newValue, supId: 1 },
                  { proportion: 0, supId: 2 },
                  { proportion: 0, supId: 3 },
                ],
              },
            ]);
          }
          if (content === "smallscaleTaxpayerRatio") {
            setcostRelatedList([
              ...costRelatedList,
              {
                ...addObj,
                supplierProportions: [
                  { proportion: 0, supId: 1 },
                  { proportion: newValue, supId: 2 },
                  { proportion: 0, supId: 3 },
                ],
              },
            ]);
          }
          if (content === "naturalPersonRatio") {
            setcostRelatedList([
              ...costRelatedList,
              {
                ...addObj,
                supplierProportions: [
                  { proportion: 0, supId: 1 },
                  { proportion: 0, supId: 2 },
                  { proportion: newValue, supId: 3 },
                ],
              },
            ]);
          }
        }
      }
    }
  };

  // 设置收入总计，支出总计值的函数
  const totalRev = (revenueRelateList, column) => {
    let total = 0;
    if (column === "ratio") {
      revenueRelateList.forEach((revObj) => {
        total += revObj.businessRatio*100;
      });
      return total;
    } else if (column === "amount") {
      revenueRelateList.forEach((revObj) => {
        total += revObj.amount;
      });
      return total;
    }
  };
  const totalCost = (costRelatedList, column) => {
    let total = 0;
    if (column === "ratio") {
      costRelatedList.forEach((costObj) => {
        total += costObj.costRatio*100;
      });
      return total;
    } else if (column === "amount") {
      costRelatedList.forEach((costObj) => {
        total += costObj.amount;
      });
      return total;
    }
  };

  useEffect(() => {
    // 加载时获取企业对应业务
    httpUtil.getBusinessByEnterpriseKey(params)
    .then((res) => {
      const {
        code,
        data: { businessList },
      } = res;
      if (code === 200) {
        setBusinessList([...businessList]);
      }
    });
    // 加载时获取企业经营信息和计算结果
    if (enterpriseKey !== "") {
      httpUtil.getEnterpriseManageMsg(params)
      .then((res) => {
        const {
          code,
          data: { enterpriseOperationalMsgVo },
        } = res;
        if (code === 200) {
          setannualCost(enterpriseOperationalMsgVo.annualCost);
          setannualTurnover(enterpriseOperationalMsgVo.annualTurnover);
          setsalesTaxpayer(enterpriseOperationalMsgVo.salesTaxpayer);
          setcostRelatedList([...enterpriseOperationalMsgVo.costVoList]);
          setrevenueRelateList([...enterpriseOperationalMsgVo.revenueVoList]);
          // 判断业务对应资质是否被选中
          if (
            enterpriseOperationalMsgVo.revenueVoList.some((revObj) => {
              return revObj.businessName === "运输服务";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输服务";
                })
              ].generalTaxpayerRatio !== 0
            ) {
              setisGeneralTaxpayerOfTs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输服务";
                })
              ].smallscaleTaxpayerRatio !== 0
            ) {
              setisSmallscaleTaxpayerOfTs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输服务";
                })
              ].naturalPersonRatio !== 0
            ) {
              setisNaturalPersonOfTs(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.revenueVoList.some((revObj) => {
              return revObj.businessName === "仓储与搬运服务";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "仓储与搬运服务";
                })
              ].generalTaxpayerRatio !== 0
            ) {
              setisGeneralTaxpayerOfWHs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "仓储与搬运服务";
                })
              ].smallscaleTaxpayerRatio !== 0
            ) {
              setisSmallscaleTaxpayerOfWHs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "仓储与搬运服务";
                })
              ].naturalPersonRatio !== 0
            ) {
              setisNaturalPersonOfWHs(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.revenueVoList.some((revObj) => {
              return revObj.businessName === "车辆销售";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "车辆销售";
                })
              ].generalTaxpayerRatio !== 0
            ) {
              setisGeneralTaxpayerOfCs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "车辆销售";
                })
              ].smallscaleTaxpayerRatio !== 0
            ) {
              setisSmallscaleTaxpayerOfCs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "车辆销售";
                })
              ].naturalPersonRatio !== 0
            ) {
              setisNaturalPersonOfCs(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.revenueVoList.some((revObj) => {
              return revObj.businessName === "运输代理服务";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输代理服务";
                })
              ].generalTaxpayerRatio !== 0
            ) {
              setisGeneralTaxpayerOfTPs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输代理服务";
                })
              ].smallscaleTaxpayerRatio !== 0
            ) {
              setisSmallscaleTaxpayerOfTPs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "运输代理服务";
                })
              ].naturalPersonRatio !== 0
            ) {
              setisNaturalPersonOfTPs(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.revenueVoList.some((revObj) => {
              return revObj.businessName === "挂靠服务";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "挂靠服务";
                })
              ].generalTaxpayerRatio !== 0
            ) {
              setisGeneralTaxpayerOfAs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "挂靠服务";
                })
              ].smallscaleTaxpayerRatio !== 0
            ) {
              setisSmallscaleTaxpayerOfAs(true);
            }
            if (
              enterpriseOperationalMsgVo.revenueVoList[
                enterpriseOperationalMsgVo.revenueVoList.findIndex((revObj) => {
                  return revObj.businessName === "挂靠服务";
                })
              ].naturalPersonRatio !== 0
            ) {
              setisNaturalPersonOfAs(true);
            }
          }
          // 判断成本对应资质是否被选中
          if (
            enterpriseOperationalMsgVo.costVoList.some((revObj) => {
              return revObj.name === "车辆成本";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "车辆成本";
                })
              ].supplierProportions[0].proportion !== 0
            ) {
              setisGeneralTaxpayerOfVc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "车辆成本";
                })
              ].supplierProportions[1].proportion !== 0
            ) {
              setisSmallscaleTaxpayerOfVc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "车辆成本";
                })
              ].supplierProportions[2].proportion !== 0
            ) {
              setisNaturalPersonOfVc(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.costVoList.some((revObj) => {
              return revObj.name === "人工成本";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "人工成本";
                })
              ].supplierProportions[0].proportion !== 0
            ) {
              setisGeneralTaxpayerOfHc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "人工成本";
                })
              ].supplierProportions[1].proportion !== 0
            ) {
              setisSmallscaleTaxpayerOfHc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "人工成本";
                })
              ].supplierProportions[2].proportion !== 0
            ) {
              setisNaturalPersonOfHc(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.costVoList.some((revObj) => {
              return revObj.name === "办公成本";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "办公成本";
                })
              ].supplierProportions[0].proportion !== 0
            ) {
              setisGeneralTaxpayerOfOc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "办公成本";
                })
              ].supplierProportions[1].proportion !== 0
            ) {
              setisSmallscaleTaxpayerOfOc(true);
            }
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "办公成本";
                })
              ].supplierProportions[2].proportion !== 0
            ) {
              setisNaturalPersonOfOc(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.costVoList.some((revObj) => {
              return revObj.name === "运输成本(油费)";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "运输成本(油费)";
                })
              ].supplierProportions[0].proportion !== 0
            ) {
              setisGeneralTaxpayerOfTOc(true);
            }
          }
          if (
            enterpriseOperationalMsgVo.costVoList.some((revObj) => {
              return revObj.name === "运输成本(路桥费)";
            })
          ) {
            if (
              enterpriseOperationalMsgVo.costVoList[
                enterpriseOperationalMsgVo.costVoList.findIndex((revObj) => {
                  return revObj.name === "运输成本(路桥费)";
                })
              ].supplierProportions[0].proportion !== 0
            ) {
              setisGeneralTaxpayerOfTRc(true);
            }
          }
        }
      });
      httpUtil.getCalRes(params)
      .then((res)=>{
        const {code, data:{VATLiability,corporateIncomeTaxLiability,dividendsReceivedByShareholders,notIncludedBusiTax,outputVATAmount,shareholderTax,surtax,theAmountOfCorporateIncomeTaxRate}} = res
        // 对结果集合进行小数位数优化
        const optimizedData = {VATLiability:VATLiability.toFixed(2),corporateIncomeTaxLiability:corporateIncomeTaxLiability.toFixed(2),dividendsReceivedByShareholders:dividendsReceivedByShareholders.toFixed(2),notIncludedBusiTax:notIncludedBusiTax.toFixed(2),outputVATAmount:outputVATAmount.toFixed(2),shareholderTax:shareholderTax.toFixed(2),surtax:surtax.toFixed(2),theAmountOfCorporateIncomeTaxRate:theAmountOfCorporateIncomeTaxRate.toFixed(2)}
        if(code === 200){
          setCalData([{...optimizedData}])
          setIsResGet(false)
        }
      })
    }
  }, [enterpriseKey]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 车辆选项
  const carCostGeneral = ["新车", "二手车"];
  const carCostSmall = ["新车专票", "新车普票", "二手车专票", "二手车普票"];
  const carCostNatural = ["有票", "无票"];
  // 人工选项
  const LaborCostGeneral = ["运输行业", "人力资源和灵活用工"];
  const LaborCostSmall = ["专票", "普票"];
  const LaborCostNatural = ["外包有票", "外包无票"];
  // 办公选项
  const OfficeCostSmall = ["专票", "普票"];
  const OfficeCostNatural = ["有票", "无票"];

  // 评估结果
  const sharedOnCell = (_, index) => {
    if (index === 4) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };
  const columns = [
    {
      title: "增值税应纳税额",
      dataIndex: "VATLiability",
      onCell: sharedOnCell,
    },
    {
      title: "附加税",
      dataIndex: "surtax",
      onCell: sharedOnCell,
    },
    {
      title: "企业所得税应纳税额",
      dataIndex: "corporateIncomeTaxLiability",
      onCell: sharedOnCell,
    },
    {
      title: "股东个税",
      dataIndex: "shareholderTax",
      onCell: sharedOnCell,
    },
    {
      title: "增值税销项税额",
      dataIndex: "outputVATAmount",
      onCell: sharedOnCell,
    },
    {
      title: "不含营业税额",
      dataIndex: "notIncludedBusiTax",
      onCell: sharedOnCell,
    },
    {
      title: "企业所得税税率额",
      dataIndex: "theAmountOfCorporateIncomeTaxRate",
      onCell: sharedOnCell,
    },
    {
      title: "计算股东分红所得",
      dataIndex: "dividendsReceivedByShareholders",
      onCell: sharedOnCell,
    },
  ];

  // 获取结果函数
  const getCalRes = (params) => {
    return () => {
      httpUtil.getCalRes(params)
      .then((res)=>{
        const {code, data:{VATLiability,corporateIncomeTaxLiability,dividendsReceivedByShareholders,notIncludedBusiTax,outputVATAmount,shareholderTax,surtax,theAmountOfCorporateIncomeTaxRate}} = res
        // 对结果集合进行小数位数优化
        const optimizedData = {VATLiability:VATLiability.toFixed(2),corporateIncomeTaxLiability:corporateIncomeTaxLiability.toFixed(2),dividendsReceivedByShareholders:dividendsReceivedByShareholders.toFixed(2),notIncludedBusiTax:notIncludedBusiTax.toFixed(2),outputVATAmount:outputVATAmount.toFixed(2),shareholderTax:shareholderTax.toFixed(2),surtax:surtax.toFixed(2),theAmountOfCorporateIncomeTaxRate:theAmountOfCorporateIncomeTaxRate.toFixed(2)}
        if(code === 200){
          message.success("已获得计算结果,点击查看结果进行浏览!")
          setCalData([{...optimizedData}])
          setIsResGet(false)
        }
      })
    }
  }

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "5px 16px 0px 16px",
        padding: 0,
      }}
    >
      <Space
        style={{
          width: "99%",
          height: "60px",
          marginTop: "5px",
          justifyContent: "end",
          paddingLeft: "16px",
          display: "flex",
        }}
      >
        <div>
          <Button
            className="saveBtn"
            type="primary"
            style={{ borderRadius: "5px" }}
            size="middle"
            onClick={() => {
              const newparams = {
                enterpriseKey: enterpriseKey !== "" ? enterpriseKey : "",
                annualCost: parseInt(annualCost),
                annualTurnover: parseInt(annualTurnover),
                salesTaxpayer,
                revenueRelateList,
                costRelatedList,
                manualRelatedDto,
              };
              console.log(newparams);
              setManageEdit(false);
              httpUtil.saveEnterpriseManageMsg(newparams).then((res) => {
                const { code } = res;
                if (code === 200) {
                  message.success("保存成功!");
                  httpUtil.getEnterpriseManageMsg(params).then((res) => {
                    const {
                      code,
                      data: { enterpriseOperationalMsgVo },
                    } = res;
                    if (code === 200) {
                      setannualCost(enterpriseOperationalMsgVo.annualCost);
                      setannualTurnover(
                        enterpriseOperationalMsgVo.annualTurnover
                      );
                      setsalesTaxpayer(
                        enterpriseOperationalMsgVo.salesTaxpayer
                      );
                      setcostRelatedList([
                        ...enterpriseOperationalMsgVo.costVoList,
                      ]);
                      setrevenueRelateList([
                        ...enterpriseOperationalMsgVo.revenueVoList,
                      ]);
                      if (
                        enterpriseOperationalMsgVo.revenueVoList.some(
                          (revObj) => {
                            return revObj.businessName === "运输服务";
                          }
                        )
                      ) {
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输服务";
                              }
                            )
                          ].generalTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfTs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输服务";
                              }
                            )
                          ].smallscaleTaxpayerRatio !== 0
                        ) {
                          setisSmallscaleTaxpayerOfTs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输服务";
                              }
                            )
                          ].naturalPersonRatio !== 0
                        ) {
                          setisNaturalPersonOfTs(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.revenueVoList.some(
                          (revObj) => {
                            return revObj.businessName === "仓储与搬运服务";
                          }
                        )
                      ) {
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "仓储与搬运服务";
                              }
                            )
                          ].generalTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfWHs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "仓储与搬运服务";
                              }
                            )
                          ].smallscaleTaxpayerRatio !== 0
                        ) {
                          setisSmallscaleTaxpayerOfWHs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "仓储与搬运服务";
                              }
                            )
                          ].naturalPersonRatio !== 0
                        ) {
                          setisNaturalPersonOfWHs(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.revenueVoList.some(
                          (revObj) => {
                            return revObj.businessName === "车辆销售";
                          }
                        )
                      ) {
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "车辆销售";
                              }
                            )
                          ].generalTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfCs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "车辆销售";
                              }
                            )
                          ].smallscaleTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfCs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "车辆销售";
                              }
                            )
                          ].naturalPersonRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfCs(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.revenueVoList.some(
                          (revObj) => {
                            return revObj.businessName === "运输代理服务";
                          }
                        )
                      ) {
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输代理服务";
                              }
                            )
                          ].generalTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfTPs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输代理服务";
                              }
                            )
                          ].smallscaleTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfTPs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "运输代理服务";
                              }
                            )
                          ].naturalPersonRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfTPs(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.revenueVoList.some(
                          (revObj) => {
                            return revObj.businessName === "挂靠服务";
                          }
                        )
                      ) {
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "挂靠服务";
                              }
                            )
                          ].generalTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfAs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "挂靠服务";
                              }
                            )
                          ].smallscaleTaxpayerRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfAs(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.revenueVoList[
                            enterpriseOperationalMsgVo.revenueVoList.findIndex(
                              (revObj) => {
                                return revObj.businessName === "挂靠服务";
                              }
                            )
                          ].naturalPersonRatio !== 0
                        ) {
                          setisGeneralTaxpayerOfAs(true);
                        }
                      }
                      // 判断成本对应资质是否被选中
                      if (
                        enterpriseOperationalMsgVo.costVoList.some((revObj) => {
                          return revObj.name === "车辆成本";
                        })
                      ) {
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "车辆成本";
                              }
                            )
                          ].supplierProportions[0].proportion !== 0
                        ) {
                          setisGeneralTaxpayerOfVc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "车辆成本";
                              }
                            )
                          ].supplierProportions[1].proportion !== 0
                        ) {
                          setisSmallscaleTaxpayerOfVc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "车辆成本";
                              }
                            )
                          ].supplierProportions[2].proportion !== 0
                        ) {
                          setisNaturalPersonOfVc(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.costVoList.some((revObj) => {
                          return revObj.name === "人工成本";
                        })
                      ) {
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "人工成本";
                              }
                            )
                          ].supplierProportions[0].proportion !== 0
                        ) {
                          setisGeneralTaxpayerOfHc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "人工成本";
                              }
                            )
                          ].supplierProportions[1].proportion !== 0
                        ) {
                          setisSmallscaleTaxpayerOfHc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "人工成本";
                              }
                            )
                          ].supplierProportions[2].proportion !== 0
                        ) {
                          setisNaturalPersonOfHc(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.costVoList.some((revObj) => {
                          return revObj.name === "办公成本";
                        })
                      ) {
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "办公成本";
                              }
                            )
                          ].supplierProportions[0].proportion !== 0
                        ) {
                          setisGeneralTaxpayerOfOc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "办公成本";
                              }
                            )
                          ].supplierProportions[1].proportion !== 0
                        ) {
                          setisSmallscaleTaxpayerOfOc(true);
                        }
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "办公成本";
                              }
                            )
                          ].supplierProportions[2].proportion !== 0
                        ) {
                          setisNaturalPersonOfOc(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.costVoList.some((revObj) => {
                          return revObj.name === "运输成本(油费)";
                        })
                      ) {
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "运输成本(油费)";
                              }
                            )
                          ].supplierProportions[0].proportion !== 0
                        ) {
                          setisGeneralTaxpayerOfTOc(true);
                        }
                      }
                      if (
                        enterpriseOperationalMsgVo.costVoList.some((revObj) => {
                          return revObj.name === "运输成本(路桥费)";
                        })
                      ) {
                        if (
                          enterpriseOperationalMsgVo.costVoList[
                            enterpriseOperationalMsgVo.costVoList.findIndex(
                              (revObj) => {
                                return revObj.name === "运输成本(路桥费)";
                              }
                            )
                          ].supplierProportions[0].proportion !== 0
                        ) {
                          setisGeneralTaxpayerOfTRc(true);
                        }
                      }
                    }
                  });
                }else{
                  message.error("网络出错了,请稍后再试!")
                }
              });
            }}
          >
            保存
          </Button>
          <Button
            className="editBtn"
            style={{ borderRadius: "5px" }}
            size="middle"
            onClick={() => {
              setManageEdit(true);
              message.success("已开启表格修改!");
            }}
          >
            修改
          </Button>
        </div>
      </Space>
      <table>
        <tr className="ms-table-row">
          <td className="ms" colSpan={5}>
            企业经营情况
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            收入相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">年营业额(万元)</td>
          <td className="ms-ic-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="annual-turnover"
              className="ms-input"
              defaultValue={annualTurnover === 0 ? "" : annualTurnover}
              onBlur={(e) => {
                const annualTurnover = e.target.value;
                setannualTurnover(annualTurnover);
              }}
            />
          </td>
          <td className="ms-title-td">是否兼营销售纳税人</td>
          <td className="ms-ic-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <Radio
                  disabled={!manageEdit}
                  name="isSalesTaxpayer"
                  onClick={() => {
                    setsalesTaxpayer(1);
                  }}
                />
                是
              </div>
              <div>
                <Radio
                  disabled={!manageEdit}
                  name="isSalesTaxpayer"
                  onClick={() => {
                    setsalesTaxpayer(0);
                  }}
                />
                否
              </div>
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">收入类别</td>
          <td className="ms-title-td">占比(%)</td>
          <td className="ms-title-td">金额(万元)</td>
          <td className="ms-title-td">销售发票占比</td>
          <td className="ms-title-td">甲方资质选择(%)</td>
        </tr>

        {/* 运输服务 */}
        {businessList.includes("运输服务") ? (
          <tr className="ms-table-row">
            <td className="ms-title-td">运输服务</td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="transport-service-proportion"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "businessRatio",
                  "运输服务",
                  revenueRelateList
                )}
                onBlur={(e) => {
                  const businessRatio = Number(e.target.value)/100;
                  setValue(
                    "r",
                    "businessRatio",
                    businessRatio,
                    "运输服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="transport-service-capital"
                className="ms-input"
                value={
                  revenueRelateList.some((revObj) => {
                    return revObj.businessName === "运输服务";
                  })
                    ? annualTurnover *
                      (revenueRelateList[
                        revenueRelateList.findIndex((revObj) => {
                          return revObj.businessName === "运输服务";
                        })
                      ].businessRatio)
                    : ""
                }
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  setValue(
                    "r",
                    "amount",
                    amount,
                    "运输服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-title-td" rowSpan={businessList.length}>
              甲方资质
            </td>
            <td className="ms-qua-info-td">
              <div style={{ width:"95%",margin:"0 auto",display: "flex" }}>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isGeneralTaxpayerOfTs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisGeneralTaxpayerOfTs(true);
                      else if (!checked) setisGeneralTaxpayerOfTs(false);
                    }}
                  />
                  一般纳税人 (
                  <NumDropdown
                    abled={isGeneralTaxpayerOfTs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "generalTaxpayerRatio",
                      "运输服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="generalTaxpayerRatio"
                    queryName="运输服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isSmallscaleTaxpayerOfTs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisSmallscaleTaxpayerOfTs(true);
                      else if (!checked) setisSmallscaleTaxpayerOfTs(false);
                    }}
                  />
                  小规模纳税人 (
                  <NumDropdown
                    abled={isSmallscaleTaxpayerOfTs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "smallscaleTaxpayerRatio",
                      "运输服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="smallscaleTaxpayerRatio"
                    queryName="运输服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isNaturalPersonOfTs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisNaturalPersonOfTs(true);
                      else if (!checked) setisNaturalPersonOfTs(false);
                    }}
                  />
                  自然人 (
                  <NumDropdown
                    abled={isNaturalPersonOfTs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "naturalPersonRatio",
                      "运输服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="naturalPersonRatio"
                    queryName="运输服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <tr className="ms-table-row">
            <td className="ms-title-td"></td>
            <td className="ms-ic-info-td"></td>
            <td className="ms-ic-info-td"></td>
            <td className="ms-title-td" rowSpan={businessList.length + 1}>
              甲方资质
            </td>
            <td className="ms-qua-info-td"></td>
          </tr>
        )}
        {/* 仓储与搬运服务 */}
        {businessList.includes("仓储与搬运服务") ? (
          <tr className="ms-table-row">
            <td className="ms-title-td">仓储与搬运服务</td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="storage-porterage-service-proportion"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "businessRatio",
                  "仓储与搬运服务",
                  revenueRelateList
                )}
                onBlur={(e) => {
                  const businessRatio = Number(e.target.value)/100;
                  setValue(
                    "r",
                    "businessRatio",
                    businessRatio,
                    "仓储与搬运服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="storage-porterage-service-capital"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "amount",
                  "仓储与搬运服务",
                  revenueRelateList
                )}
                value={
                  revenueRelateList.some((revObj) => {
                    return revObj.businessName === "仓储与搬运服务";
                  })
                    ? annualTurnover *
                      (revenueRelateList[
                        revenueRelateList.findIndex((revObj) => {
                          return revObj.businessName === "仓储与搬运服务";
                        })
                      ].businessRatio)
                    : ""
                }
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  setValue(
                    "r",
                    "amount",
                    amount,
                    "仓储与搬运服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-qua-info-td">
              <div style={{ width:"95%",margin:"0 auto", display: "flex"  }}>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isGeneralTaxpayerOfWHs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisGeneralTaxpayerOfWHs(true);
                      else if (!checked) setisGeneralTaxpayerOfWHs(false);
                    }}
                  />
                  一般纳税人 (
                  <NumDropdown
                    abled={isGeneralTaxpayerOfWHs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "generalTaxpayerRatio",
                      "仓储与搬运服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="generalTaxpayerRatio"
                    queryName="仓储与搬运服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isSmallscaleTaxpayerOfWHs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisSmallscaleTaxpayerOfWHs(true);
                      else if (!checked) setisSmallscaleTaxpayerOfWHs(false);
                    }}
                  />
                  小规模纳税人 (
                  <NumDropdown
                    abled={isSmallscaleTaxpayerOfWHs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "smallscaleTaxpayerRatio",
                      "仓储与搬运服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="smallscaleTaxpayerRatio"
                    queryName="仓储与搬运服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isNaturalPersonOfWHs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisNaturalPersonOfWHs(true);
                      else if (!checked) setisNaturalPersonOfWHs(false);
                    }}
                  />
                  自然人 (
                  <NumDropdown
                    abled={isNaturalPersonOfWHs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "naturalPersonRatio",
                      "仓储与搬运服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="naturalPersonRatio"
                    queryName="仓储与搬运服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <></>
        )}
        {/* 车辆销售 */}
        {businessList.includes("车辆销售") ? (
          <tr className="ms-table-row">
            <td className="ms-title-td">车辆销售</td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="vehicle-sale-service-proportion"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "businessRatio",
                  "车辆销售",
                  revenueRelateList
                )}
                onBlur={(e) => {
                  const businessRatio = Number(e.target.value)/100;
                  setValue(
                    "r",
                    "businessRatio",
                    businessRatio,
                    "车辆销售",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="vehicle-sale-service-capital"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "amount",
                  "车辆销售",
                  revenueRelateList
                )}
                value={
                  revenueRelateList.some((revObj) => {
                    return revObj.businessName === "车辆销售";
                  })
                    ? annualTurnover *
                      (revenueRelateList[
                        revenueRelateList.findIndex((revObj) => {
                          return revObj.businessName === "车辆销售";
                        })
                      ].businessRatio)
                    : ""
                }
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  setValue(
                    "r",
                    "amount",
                    amount,
                    "车辆销售",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-qua-info-td">
              <div style={{  width:"95%",margin:"0 auto", display: "flex"   }}>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isGeneralTaxpayerOfCs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisGeneralTaxpayerOfCs(true);
                      else if (!checked) setisGeneralTaxpayerOfCs(false);
                    }}
                  />
                  一般纳税人 (
                  <NumDropdown
                    abled={isGeneralTaxpayerOfCs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "generalTaxpayerRatio",
                      "车辆销售",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="generalTaxpayerRatio"
                    queryName="车辆销售"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isSmallscaleTaxpayerOfCs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisSmallscaleTaxpayerOfCs(true);
                      else if (!checked) setisSmallscaleTaxpayerOfCs(false);
                    }}
                  />
                  小规模纳税人 (
                  <NumDropdown
                    abled={isSmallscaleTaxpayerOfCs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "smallscaleTaxpayerRatio",
                      "车辆销售",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="smallscaleTaxpayerRatio"
                    queryName="车辆销售"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isNaturalPersonOfCs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisNaturalPersonOfCs(true);
                      else if (!checked) setisNaturalPersonOfCs(false);
                    }}
                  />
                  自然人 (
                  <NumDropdown
                    abled={isNaturalPersonOfCs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "naturalPersonRatio",
                      "车辆销售",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="naturalPersonRatio"
                    queryName="车辆销售"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <></>
        )}
        {/* 运输代理服务 */}
        {businessList.includes("运输代理服务") ? (
          <tr className="ms-table-row">
            <td className="ms-title-td">运输代理服务</td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="transport-proxy-service-proportion"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "businessRatio",
                  "运输代理服务",
                  revenueRelateList
                )}
                onBlur={(e) => {
                  const businessRatio = Number(e.target.value)/100;
                  setValue(
                    "r",
                    "businessRatio",
                    businessRatio,
                    "运输代理服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="transport-proxy-service-capital"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "amount",
                  "运输代理服务",
                  revenueRelateList
                )}
                value={
                  revenueRelateList.some((revObj) => {
                    return revObj.businessName === "运输代理服务";
                  })
                    ? annualTurnover *
                      (revenueRelateList[
                        revenueRelateList.findIndex((revObj) => {
                          return revObj.businessName === "运输代理服务";
                        })
                      ].businessRatio )
                    : ""
                }
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  setValue(
                    "r",
                    "amount",
                    amount,
                    "运输代理服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-qua-info-td">
              <div style={{width:"95%",margin:"0 auto", display: "flex" }}>
                <div  style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isGeneralTaxpayerOfTPs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisGeneralTaxpayerOfTPs(true);
                      else if (!checked) setisGeneralTaxpayerOfTPs(false);
                    }}
                  />
                  一般纳税人 (
                  <NumDropdown
                    abled={isGeneralTaxpayerOfTPs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "generalTaxpayerRatio",
                      "运输代理服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="generalTaxpayerRatio"
                    queryName="运输代理服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div  style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isSmallscaleTaxpayerOfTPs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisSmallscaleTaxpayerOfTPs(true);
                      else if (!checked) setisSmallscaleTaxpayerOfTPs(false);
                    }}
                  />
                  小规模纳税人 (
                  <NumDropdown
                    abled={isSmallscaleTaxpayerOfTPs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "smallscaleTaxpayerRatio",
                      "运输代理服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="smallscaleTaxpayerRatio"
                    queryName="运输代理服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isNaturalPersonOfTPs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisNaturalPersonOfTPs(true);
                      else if (!checked) setisNaturalPersonOfTPs(false);
                    }}
                  />
                  自然人 (
                  <NumDropdown
                    abled={isNaturalPersonOfTPs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "naturalPersonRatio",
                      "运输代理服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="naturalPersonRatio"
                    queryName="运输代理服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <></>
        )}
        {/* 挂靠服务 */}
        {businessList.includes("挂靠服务") ? (
          <tr className="ms-table-row">
            <td className="ms-title-td">挂靠服务</td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="affiliated-service-proportion"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "businessRatio",
                  "挂靠服务",
                  revenueRelateList
                )}
                onBlur={(e) => {
                  const businessRatio = Number(e.target.value)/100;
                  setValue(
                    "r",
                    "businessRatio",
                    businessRatio,
                    "挂靠服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-ic-info-td">
              <input
                disabled={!manageEdit}
                type="text"
                name="affiliated-service-capital"
                className="ms-input"
                defaultValue={setDefault(
                  "r",
                  "amount",
                  "挂靠服务",
                  revenueRelateList
                )}
                value={
                  revenueRelateList.some((revObj) => {
                    return revObj.businessName === "挂靠服务";
                  })
                    ? annualTurnover *
                      (revenueRelateList[
                        revenueRelateList.findIndex((revObj) => {
                          return revObj.businessName === "挂靠服务";
                        })
                      ].businessRatio )
                    : ""
                }
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  setValue(
                    "r",
                    "amount",
                    amount,
                    "挂靠服务",
                    revenueRelateList
                  );
                }}
              />
            </td>
            <td className="ms-qua-info-td">
              <div style={{width:"95%",margin:"0 auto",  display: "flex"}}>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isGeneralTaxpayerOfAs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisGeneralTaxpayerOfAs(true);
                      else if (!checked) setisGeneralTaxpayerOfAs(false);
                    }}
                  />
                  一般纳税人 (
                  <NumDropdown
                    abled={isGeneralTaxpayerOfAs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "generalTaxpayerRatio",
                      "挂靠服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="generalTaxpayerRatio"
                    queryName="挂靠服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    checked={isSmallscaleTaxpayerOfAs}
                    name="isTransportationServices"
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisSmallscaleTaxpayerOfAs(true);
                      else if (!checked) setisSmallscaleTaxpayerOfAs(false);
                    }}
                  />
                  小规模纳税人 (
                  <NumDropdown
                    abled={isSmallscaleTaxpayerOfAs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "smallscaleTaxpayerRatio",
                      "挂靠服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="smallscaleTaxpayerRatio"
                    queryName="挂靠服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
                <div style={{width:"33.3%"}}>
                  <Checkbox
                    disabled={!manageEdit}
                    name="isTransportationServices"
                    checked={isNaturalPersonOfAs}
                    onClick={(e) => {
                      const checked = e.target.checked;
                      if (checked) setisNaturalPersonOfAs(true);
                      else if (!checked) setisNaturalPersonOfAs(false);
                    }}
                  />
                  自然人 (
                  <NumDropdown
                    abled={isNaturalPersonOfAs}
                    manageEdit={manageEdit}
                    defaultValue={setDefault(
                      "r",
                      "naturalPersonRatio",
                      "挂靠服务",
                      revenueRelateList
                    )}
                    popupClassName={"selectDropdown-short"}
                    setValue={setValue}
                    part="r"
                    content="naturalPersonRatio"
                    queryName="挂靠服务"
                    queryArr={revenueRelateList}
                  />
                  )
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <></>
        )}

        <tr className="ms-table-row">
          <td className="ms-title-td">收入总计</td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="income-total-proportion"
              className="ms-input"
              value={totalRev(revenueRelateList, "ratio")}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="income-total-capital"
              className="ms-input"
              value={annualTurnover}
            />
          </td>
          <td className="ms-title-td">年经营成本(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="annual-turnover-cost"
              className="ms-input"
              defaultValue={annualCost == 0 ? "" : annualCost}
              onBlur={(e) => {
                const annualCost = Number(e.target.value);
                setannualCost(annualCost);
              }}
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            支出相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">成本费用类别</td>
          <td className="ms-title-td">占比(%)</td>
          <td className="ms-title-td">金额(万元)</td>
          <td className="ms-title-td">进项发票占比</td>
          <td className="ms-title-td">供应商资质选择(%)</td>
        </tr>

        {/* 车辆成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">车辆成本</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-cost-propotion"
              className="ms-input"
              defaultValue={setDefault(
                "c",
                "costRatio",
                "车辆成本",
                costRelatedList
              )}
              onBlur={(e) => {
                const costRatio = Number(e.target.value)/100;
                setValue(
                  "c",
                  "costRatio",
                  costRatio,
                  "车辆成本",
                  costRelatedList
                );
              }}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-cost-capital"
              className="ms-input"
              value={
                costRelatedList.some((costObj) => {
                  return costObj.name === "车辆成本";
                })
                  ? annualCost *
                    (costRelatedList[
                      costRelatedList.findIndex((costObj) => {
                        return costObj.name === "车辆成本";
                      })
                    ].costRatio)
                  : ""
              }
            />
          </td>
          <td className="ms-title-td" rowSpan={5}>
            供应商资质
          </td>
          <td className="ms-qua-info-td">
            <div style={{width:"93%",margin:"0 auto",  display: "flex" ,textAlign:"start"}}>
              <div style={{width:"40%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isGeneralTaxpayerOfVc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisGeneralTaxpayerOfVc(true);
                    else if (!checked) setisGeneralTaxpayerOfVc(false);
                  }}
                />
                一般纳税人 (
                <TextDropdown
                  abled={isGeneralTaxpayerOfVc}
                  manageEdit={manageEdit}
                  arr={carCostGeneral}
                  defaultValue={"新车"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  abled={isGeneralTaxpayerOfVc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "generalTaxpayerRatio",
                    "车辆成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="generalTaxpayerRatio"
                  queryName="车辆成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"37%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isSmallscaleTaxpayerOfVc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisSmallscaleTaxpayerOfVc(true);
                    else if (!checked) setisSmallscaleTaxpayerOfVc(false);
                  }}
                />
                小规模纳税人 (
                <TextDropdown
                  abled={isSmallscaleTaxpayerOfVc}
                  manageEdit={manageEdit}
                  arr={carCostSmall}
                  defaultValue={"新车专票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  abled={isSmallscaleTaxpayerOfVc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "smallscaleTaxpayerRatio",
                    "车辆成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="smallscaleTaxpayerRatio"
                  queryName="车辆成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"23%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isNaturalPersonOfVc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisNaturalPersonOfVc(true);
                    else if (!checked) setisNaturalPersonOfVc(false);
                  }}
                />
                自然人 (
                <TextDropdown
                  abled={isNaturalPersonOfVc}
                  manageEdit={manageEdit}
                  arr={carCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  abled={isNaturalPersonOfVc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "naturalPersonRatio",
                    "车辆成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="naturalPersonRatio"
                  queryName="车辆成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 人工成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">人工成本</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="staff-cost-propotion"
              className="ms-input"
              defaultValue={setDefault(
                "c",
                "costRatio",
                "人工成本",
                costRelatedList
              )}
              onBlur={(e) => {
                const costRatio = Number(e.target.value)/100;
                setValue(
                  "c",
                  "costRatio",
                  costRatio,
                  "人工成本",
                  costRelatedList
                );
              }}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="staff-cost-capital"
              className="ms-input"
              value={
                costRelatedList.some((costObj) => {
                  return costObj.name === "人工成本";
                })
                  ? annualCost *
                    (costRelatedList[
                      costRelatedList.findIndex((costObj) => {
                        return costObj.name === "人工成本";
                      })
                    ].costRatio )
                  : ""
              }
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{width:"93%",margin:"0 auto",  display: "flex" ,textAlign:"start"}}>
              <div style={{width:"40%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isGeneralTaxpayerOfHc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisGeneralTaxpayerOfHc(true);
                    else if (!checked) setisGeneralTaxpayerOfHc(false);
                  }}
                />
                一般纳税人 (
                <TextDropdown
                  abled={isGeneralTaxpayerOfHc}
                  manageEdit={manageEdit}
                  arr={LaborCostGeneral}
                  defaultValue={"运输行业"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  abled={isGeneralTaxpayerOfHc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "generalTaxpayerRatio",
                    "人工成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="generalTaxpayerRatio"
                  queryName="人工成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"37%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isSmallscaleTaxpayerOfHc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisSmallscaleTaxpayerOfHc(true);
                    else if (!checked) setisSmallscaleTaxpayerOfHc(false);
                  }}
                />
                小规模纳税人 (
                <TextDropdown
                  abled={isSmallscaleTaxpayerOfHc}
                  manageEdit={manageEdit}
                  arr={LaborCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  abled={isSmallscaleTaxpayerOfHc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "smallscaleTaxpayerRatio",
                    "人工成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="smallscaleTaxpayerRatio"
                  queryName="人工成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"23%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isNaturalPersonOfHc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisNaturalPersonOfHc(true);
                    else if (!checked) setisNaturalPersonOfHc(false);
                  }}
                />
                自然人 (
                <TextDropdown
                  abled={isNaturalPersonOfHc}
                  manageEdit={manageEdit}
                  arr={LaborCostNatural}
                  defaultValue={"外包有票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  abled={isNaturalPersonOfHc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "naturalPersonRatio",
                    "人工成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="naturalPersonRatio"
                  queryName="人工成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 办公成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">办公成本</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="office-cost-propotion"
              className="ms-input"
              defaultValue={setDefault(
                "c",
                "costRatio",
                "办公成本",
                costRelatedList
              )}
              onBlur={(e) => {
                const costRatio = Number(e.target.value)/100;
                setValue(
                  "c",
                  "costRatio",
                  costRatio,
                  "办公成本",
                  costRelatedList
                );
              }}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="office-cost-capital"
              className="ms-input"
              value={
                costRelatedList.some((costObj) => {
                  return costObj.name === "办公成本";
                })
                  ? annualCost *
                    (costRelatedList[
                      costRelatedList.findIndex((costObj) => {
                        return costObj.name === "办公成本";
                      })
                    ].costRatio )
                  : ""
              }
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{width:"93%",margin:"0 auto",  display: "flex" ,textAlign:"start"}}>
              <div style={{width:"40%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isGeneralTaxpayerOfOc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisGeneralTaxpayerOfOc(true);
                    else if (!checked) setisGeneralTaxpayerOfOc(false);
                  }}
                />
                一般纳税人 (
                <TextDropdown
                  abled={isGeneralTaxpayerOfOc}
                  manageEdit={manageEdit}
                  arr={OfficeCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                )(
                <NumDropdown
                  abled={isGeneralTaxpayerOfOc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "generalTaxpayerRatio",
                    "办公成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="generalTaxpayerRatio"
                  queryName="办公成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"37%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isSmallscaleTaxpayerOfOc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisSmallscaleTaxpayerOfOc(true);
                    else if (!checked) setisSmallscaleTaxpayerOfOc(false);
                  }}
                />
                小规模纳税人 (
                <TextDropdown
                  abled={isSmallscaleTaxpayerOfOc}
                  manageEdit={manageEdit}
                  arr={OfficeCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  abled={isSmallscaleTaxpayerOfOc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "smallscaleTaxpayerRatio",
                    "办公成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="smallscaleTaxpayerRatio"
                  queryName="办公成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
              <div style={{width:"23%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isNaturalPersonOfOc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisNaturalPersonOfOc(true);
                    else if (!checked) setisNaturalPersonOfOc(false);
                  }}
                />
                自然人 (
                <TextDropdown
                  abled={isNaturalPersonOfOc}
                  manageEdit={manageEdit}
                  arr={OfficeCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  abled={isNaturalPersonOfOc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "naturalPersonRatio",
                    "办公成本",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="naturalPersonRatio"
                  queryName="办公成本"
                  queryArr={costRelatedList}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 运输成本（油费） */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输成本（油费）</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-oil-propotion"
              className="ms-input"
              defaultValue={setDefault(
                "c",
                "costRatio",
                "运输成本(油费)",
                costRelatedList
              )}
              onBlur={(e) => {
                const costRatio = Number(e.target.value)/100;
                setValue(
                  "c",
                  "costRatio",
                  costRatio,
                  "运输成本(油费)",
                  costRelatedList
                );
              }}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-oil-capital"
              className="ms-input"
              value={
                costRelatedList.some((costObj) => {
                  return costObj.name === "运输成本(油费)";
                })
                  ? annualCost *
                    (costRelatedList[
                      costRelatedList.findIndex((costObj) => {
                        return costObj.name === "运输成本(油费)";
                      })
                    ].costRatio )
                  : ""
              }
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{width:"93%",margin:"0 auto",  display: "flex"}}>
              <div style={{width:"100%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isGeneralTaxpayerOfTOc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisGeneralTaxpayerOfTOc(true);
                    else if (!checked) setisGeneralTaxpayerOfTOc(false);
                  }}
                />
                一般纳税人 (
                <NumDropdown
                  abled={isGeneralTaxpayerOfTOc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "generalTaxpayerRatio",
                    "运输成本(油费)",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="generalTaxpayerRatio"
                  queryName="运输成本(油费)"
                  queryArr={costRelatedList}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 运输成本（路桥费） */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输成本（路桥费）</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-bridge-propotion"
              className="ms-input"
              defaultValue={setDefault(
                "c",
                "costRatio",
                "运输成本(路桥费)",
                costRelatedList
              )}
              onBlur={(e) => {
                const costRatio = Number(e.target.value)/100;
                setValue(
                  "c",
                  "costRatio",
                  costRatio,
                  "运输成本(路桥费)",
                  costRelatedList
                );
              }}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-bridge-capital"
              className="ms-input"
              value={
                costRelatedList.some((costObj) => {
                  return costObj.name === "运输成本(路桥费)";
                })
                  ? annualCost *
                    (costRelatedList[
                      costRelatedList.findIndex((costObj) => {
                        return costObj.name === "运输成本(路桥费)";
                      })
                    ].costRatio)
                  : ""
              }
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{width:"93%",margin:"0 auto",  display: "flex"}}>
              <div style={{width:"100%"}}>
                <Checkbox
                  disabled={!manageEdit}
                  name="isTransportationServices"
                  checked={isGeneralTaxpayerOfTRc}
                  onClick={(e) => {
                    const checked = e.target.checked;
                    if (checked) setisGeneralTaxpayerOfTRc(true);
                    else if (!checked) setisGeneralTaxpayerOfTRc(false);
                  }}
                />
                一般纳税人 (
                <NumDropdown
                  abled={isGeneralTaxpayerOfTRc}
                  manageEdit={manageEdit}
                  defaultValue={setDefault(
                    "c",
                    "generalTaxpayerRatio",
                    "运输成本(路桥费)",
                    costRelatedList
                  )}
                  popupClassName={"selectDropdown-short"}
                  setValue={setValue}
                  part="c"
                  content="generalTaxpayerRatio"
                  queryName="运输成本(路桥费)"
                  queryArr={costRelatedList}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">支出总计</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="expenditure-propotion"
              className="ms-input"
              value={totalCost(costRelatedList, "ratio")}
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="expenditure-capital"
              className="ms-input"
              value={annualCost}
            />
          </td>
          <td className="ms-title-td">企业利润(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="company-profit"
              className="ms-input"
              value={
                annualTurnover - annualCost !== 0
                  ? annualTurnover - annualCost
                  : ""
              }
            />
          </td>
        </tr>

        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            人工相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">高管人数</td>
          <td className="ms-ar-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="executive-number"
              className="ms-input"
              defaultValue={
                manualRelatedDto.managerNumber !== 0
                  ? manualRelatedDto.managerNumber
                  : ""
              }
              onBlur={(e) => {
                const managerNumber = e.target.value;
                manualRelatedDto.managerNumber = parseInt(managerNumber);
                setmanualRelatedDto(manualRelatedDto);
              }}
            />
          </td>
          <td className="ms-title-td">司机人数</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-number"
              className="ms-input"
              defaultValue={
                manualRelatedDto.driverNumber !== 0
                  ? manualRelatedDto.driverNumber
                  : ""
              }
              onBlur={(e) => {
                const driverNumber = e.target.value;
                manualRelatedDto.driverNumber = parseInt(driverNumber);
                setmanualRelatedDto(manualRelatedDto);
              }}
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="executive-average-salary"
              className="ms-input"
              defaultValue={
                manualRelatedDto.managerAvgSalary !== 0
                  ? manualRelatedDto.managerAvgSalary
                  : ""
              }
              onBlur={(e) => {
                const managerAvgSalary = e.target.value;
                manualRelatedDto.managerAvgSalary = parseInt(managerAvgSalary);
                setmanualRelatedDto(manualRelatedDto);
              }}
            />
          </td>
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-average-salary"
              className="ms-input"
              defaultValue={
                manualRelatedDto.driverAvgSalary !== 0
                  ? manualRelatedDto.driverAvgSalary
                  : ""
              }
              onBlur={(e) => {
                const driverAvgSalary = e.target.value;
                manualRelatedDto.driverAvgSalary = parseInt(driverAvgSalary);
                setmanualRelatedDto(manualRelatedDto);
              }}
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td colSpan={5}>
            <Space>
              <Button type="primary" onClick={getCalRes(params)}>
                获取结果
              </Button>
              <Button disabled={isResGet} onClick={showModal}>
                查看结果
              </Button>
              <Modal
                centered={true}
                className="evaluation-results"
                width={1000}
                closable={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                title={null}
                okText={"确认"}
                cancelText={"关闭"}
              >
                <Table
                  columns={columns}
                  dataSource={calData}
                  bordered={false}
                  pagination={false}
                  title={() => {
                    return "评估结果  单位：万元";
                  }}
                />
              </Modal>
            </Space>
          </td>
        </tr>
      </table>
    </Content>
  );
}
