import React from "react";
import { useState, useEffect } from "react";
import { Button, Space, Modal, message,Radio,Checkbox,DatePicker } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import { Content } from "antd/lib/layout/layout";
import httpUtil from "../../../../../../utils/httpUtil";
dayjs.extend(weekday)
dayjs.extend(localeData)

export default function BasicInfoTable(props) {
  const { uid,eKey } = props;
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [basicEdit, setBasicEdit] = useState(false);

  // 企业基本信息字段
  const [enterpriseKey,setenterpriseKey] = useState(eKey)
  const [enterpriseName, setenterpriseName] = useState("");
  const [taxpayernum, settaxpayernum] = useState("");
  const [establishTime, setestablishTime] = useState("");
  const [registeredCapital, setregisteredCapital] = useState("");
  const [legalPerson, setlegalPerson] = useState("");
  const [personNum, setpersonNum] = useState("");
  const [totalAssets, settotalAssets] = useState("");
  const [investmentAbroad, setinvestmentAbroad] = useState(0);
  const [enterpriseType, setenterpriseType] = useState(0);
  const [businessList, setbusinessList] = useState([]);
  const [shareholderInfo, setshareholderInfo] = useState([]);
  const [investee, setinvestee] = useState([]);
  const [taxpayerQualification, settaxpayerQualification] = useState(-1);
  const [invoiceType, setinvoiceType] = useState(-1);
  const [taxRate, settaxRate] = useState([]);


  // 点击删除主体公司出现对话框
  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 加载时获取企业基本信息
    if (enterpriseKey!=="") {
      const params = {
        uid,
        enterpriseKey
      };
      httpUtil.getEnterpriseBasicMsg(params).then((res) => {
        const { code, data:{enterpriseBasicMsgVo} } = res
        if (code === 200) {
          setenterpriseName(enterpriseBasicMsgVo.enterpriseName);
          settaxpayernum(enterpriseBasicMsgVo.taxpayernum);
          setestablishTime(enterpriseBasicMsgVo.establishTime);
          setregisteredCapital(enterpriseBasicMsgVo.registeredCapital);
          setlegalPerson(enterpriseBasicMsgVo.legalPerson);
          setpersonNum(enterpriseBasicMsgVo.personNum);
          settotalAssets(enterpriseBasicMsgVo.totalAsstes);
          setinvestmentAbroad(enterpriseBasicMsgVo.investmentAbroad);
          setenterpriseType(enterpriseBasicMsgVo.enterpriseType);
          setbusinessList([...enterpriseBasicMsgVo.businessList]);
          setshareholderInfo([...enterpriseBasicMsgVo.shareholderInfo]);
          setinvestee([...enterpriseBasicMsgVo.investee]);
          settaxpayerQualification(enterpriseBasicMsgVo.taxpayerQualification);
          setinvoiceType(enterpriseBasicMsgVo.invoiceType);
          settaxRate([...enterpriseBasicMsgVo.taxRate]);
        }
      });
    }
  }, [enterpriseKey]);

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
              const params = {
                enterpriseKey:enterpriseKey!==""?enterpriseKey:"",
                enterpriseName,
                taxpayernum,
                establishTime,
                registeredCapital,
                legalPerson,
                personNum: parseInt(personNum),
                totalAsstes: parseInt(totalAssets),
                investmentAbroad,
                enterpriseType,
                businessList,
                shareholderInfo,
                investee,
                taxpayerQualification,
                invoiceType,
                taxRate,
                uid,
                industryId: 1,
              };
              setBasicEdit(false);
              httpUtil.saveEnterpriseBasicMsg(params).then((res) => {
                const { code , data: {enterprise_key}} = res;
                if (code == 200) {
                  message.success("保存成功!");
                  setenterpriseKey(enterprise_key)
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
              setBasicEdit(true);
              message.success("已开启表格修改!");
            }}
          >
            修改
          </Button>
        </div>
      </Space>
      <table>
        <tr className="cbi-table-row">
          <td className="cbi" colSpan={6}>
            企业基本信息
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            工商信息
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">企业名称</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="company-name"
              className="cbi-input"
              defaultValue={enterpriseName}
              onBlur={(e) => {
                const enterpriseName = e.target.value;
                setenterpriseName(enterpriseName);
              }}
            />
          </td>
          <td className="cbi-title-td">纳税人识别号</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="taxpayer-id"
              className="cbi-input"
              defaultValue={taxpayernum}
              onBlur={(e) => {
                const taxpayernum = e.target.value;
                settaxpayernum(taxpayernum);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">成立时间</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <DatePicker
              value={establishTime===""?"":dayjs(establishTime)}
              className="cbi-input"
              disabled={!basicEdit}
              bordered={false}
              onChange={(_,establishTime)=>{
                setestablishTime(establishTime);
              }}
            />
          </td>
          <td className="cbi-title-td">注册资本</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="registered-capital"
              className="cbi-input"
              defaultValue={registeredCapital}
              onBlur={(e) => {
                const registeredCapital = e.target.value;
                setregisteredCapital(registeredCapital);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">总资产</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="total-capital"
              className="cbi-input"
              defaultValue={totalAssets}
              onBlur={(e) => {
                const totalAssets = e.target.value;
                settotalAssets(totalAssets);
              }}
            />
          </td>
          <td className="cbi-title-td">人员数量</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="staff-number"
              className="cbi-input"
              defaultValue={personNum}
              onBlur={(e) => {
                const personNum = e.target.value;
                setpersonNum(personNum);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">法定代表人</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="legal-representative"
              className="cbi-input"
              defaultValue={legalPerson}
              onBlur={(e) => {
                const legalPerson = e.target.value;
                setlegalPerson(legalPerson);
              }}
            />
          </td>
          <td className="cbi-title-td">是否对外投资</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <div className="foreign-invest-wrap">
              <span style={{ position: "relative", left: -29 }}>
                <Radio
                  disabled={!basicEdit}
                  name="isForeignInvest"
                  checked={investmentAbroad===1}
                  onClick={() => {
                    setinvestmentAbroad(1);
                  }}
                />
                有
              </span>
              <span style={{ position: "relative", left: 29 }}>
                <Radio
                  disabled={!basicEdit}
                  name="isForeignInvest"
                  checked={investmentAbroad===0}
                  onClick={() => setinvestmentAbroad(0)}
                />
                无
              </span>
            </div>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">企业类型</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -200 }}>
              <Radio
                disabled={!basicEdit}
                name="type-of-company"
                checked={enterpriseType === 1 }
                onClick={() => {
                  setenterpriseType(1);
                }}
              />
              一般企业
            </span>
            <span style={{ position: "relative", left: -77 }}>
              <Radio
                disabled={!basicEdit}
                name="type-of-company"
                checked={enterpriseType === 2 }
                onClick={() => {
                  setenterpriseType(2);
                }}
              />
              高新技术企业
            </span>
            <span style={{ position: "relative", left: 16 }}>
              <Radio
                disabled={!basicEdit}
                name="type-of-company"
                checked={enterpriseType === 3 }
                onClick={() => {
                  setenterpriseType(3);
                }}
              />
              西部大开发企业
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">主要经营项目</td>
          <td colSpan={5}>
            <Space>
              <Checkbox
                disabled={!basicEdit}
                checked={businessList.includes("运输服务")}
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("运输服务");
                    setbusinessList([...businessList]);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "运输服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList([...businessList]);
                  }
                }}
              />
              运输服务
              <Checkbox
                disabled={!basicEdit}
                checked={businessList.includes("仓储与搬运服务")}
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("仓储与搬运服务");
                    setbusinessList([...businessList]);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "仓储与搬运服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList([...businessList]);
                  }
                }}
              />
              仓储与搬运服务
              <Checkbox
                disabled={!basicEdit}
                checked={businessList.includes("挂靠服务")}
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("挂靠服务");
                    setbusinessList([...businessList]);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "挂靠服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList([...businessList]);
                  }
                }}
              />
              挂靠服务
              <Checkbox
                disabled={!basicEdit}
                checked={businessList.includes("运输代理服务")}
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("运输代理服务");
                    setbusinessList([...businessList]);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "运输代理服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList([...businessList]);
                  }
                }}
              />
              运输代理服务
              <Checkbox
                disabled={!basicEdit}
                checked={businessList.includes("车辆销售")}
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("车辆销售");
                    setbusinessList([...businessList]);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "车辆销售") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList([...businessList]);
                  }
                }}
              />
              车辆销售
            </Space>
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            股东信息
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东1</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-1"
              className="cbi-input"
              defaultValue={shareholderInfo[0] ? shareholderInfo[0].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length == 0 && name !== "") {
                  shareholderInfo.splice(0, 0, {
                    name,
                    proportion: "",
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[0].name = name;
                  setshareholderInfo(shareholderInfo);
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-1"
              className="cbi-input"
              defaultValue={
                shareholderInfo[0] ? shareholderInfo[0].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length == 0 && proportion !== "") {
                  shareholderInfo.splice(0, 0, {
                    name: "",
                    proportion,
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[0].proportion = proportion;
                  setshareholderInfo(shareholderInfo);
                }
              }}
            />
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东2</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-2"
              className="cbi-input"
              defaultValue={shareholderInfo[1] ? shareholderInfo[1].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length == 1 && name !== "") {
                  shareholderInfo.splice(1, 0, {
                    name,
                    proportion: "",
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[1].name = name;
                  setshareholderInfo(shareholderInfo);
                }
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-2"
              className="cbi-input"
              defaultValue={
                shareholderInfo[1] ? shareholderInfo[1].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length == 1 && proportion !== "") {
                  shareholderInfo.splice(1, 0, {
                    name: "",
                    proportion,
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[1].proportion = proportion;
                  setshareholderInfo(shareholderInfo);
                }
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东3</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-3"
              className="cbi-input"
              defaultValue={shareholderInfo[2] ? shareholderInfo[2].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length == 2 && name !== "") {
                  shareholderInfo.splice(2, 0, {
                    name,
                    proportion: "",
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[2].name = name;
                  setshareholderInfo(shareholderInfo);
                }
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-3"
              className="cbi-input"
              defaultValue={
                shareholderInfo[2] ? shareholderInfo[2].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length == 2 && proportion !== "") {
                  shareholderInfo.splice(2, 0, {
                    name: "",
                    proportion,
                  });
                  setshareholderInfo(shareholderInfo);
                } else {
                  shareholderInfo[2].proportion = proportion;
                  setshareholderInfo(shareholderInfo);
                }
              }}
            />
          </td>
        </tr>

        {investmentAbroad == 1 ? (
          <>
            <tr className="cbi-table-row">
              <td className="cbi-big-title" colSpan={6}>
                对外投资信息
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业1</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length == 0 && name !== "") {
                      investee.splice(0, 0, {
                        name,
                        proportion: "",
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[0].name = name;
                      setinvestee(investee);
                    }
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length == 0 && proportion !== "") {
                      investee.splice(0, 0, {
                        name: "",
                        proportion,
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[0].proportion = proportion;
                      setinvestee(investee);
                    }
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length == 0 && mainProject !== "") {
                      investee.splice(0, 0, {
                        name: "",
                        proportion: "",
                        mainProject,
                      });
                      setinvestee(investee);
                    } else {
                      investee[0].mainProject = mainProject;
                      setinvestee(investee);
                    }
                  }}
                />
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业2</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length == 1 && name !== "") {
                      investee.splice(1, 0, {
                        name,
                        proportion: "",
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[1].name = name;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length == 1 && proportion !== "") {
                      investee.splice(1, 0, {
                        name: "",
                        proportion,
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[1].proportion = proportion;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length == 1 && mainProject !== "") {
                      investee.splice(1, 0, {
                        name: "",
                        proportion: "",
                        mainProject,
                      });
                      setinvestee(investee);
                    } else {
                      investee[1].mainProject = mainProject;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业3</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length == 2 && name !== "") {
                      investee.splice(2, 0, {
                        name,
                        proportion: "",
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[2].name = name;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length == 2 && proportion !== "") {
                      investee.splice(2, 0, {
                        name: "",
                        proportion,
                        mainProject: "",
                      });
                      setinvestee(investee);
                    } else {
                      investee[2].proportion = proportion;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length == 2 && mainProject !== "") {
                      investee.splice(2, 0, {
                        name: "",
                        proportion: "",
                        mainProject,
                      });
                      setinvestee(investee);
                    } else {
                      investee[2].mainProject = mainProject;
                      setinvestee(investee);
                    }
                    console.log(investee);
                  }}
                />
              </td>
            </tr>
          </>
        ) : (
          <>
            <tr className="no-cbi-table-row">
              <td className="cbi-big-title" colSpan={6}></td>
            </tr>
            <tr>
              <td className="cbi-title-td"></td>
              <td className="cbi-title-td"></td>
              <td className="cbi-title-td"></td>
            </tr>
            <tr className="no-cbi-table-row">
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
            </tr>
            <tr className="no-cbi-table-row">
              <td></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
            </tr>
          </>
        )}

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            税务情况
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">纳税人资格</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -160 }}>
              <Radio
                disabled={!basicEdit}
                name="qualificationOfTaxpayer"
                checked={taxpayerQualification === 0 }
                onClick={() => {
                  settaxpayerQualification(0);
                }}
              />
              一般纳税人
            </span>
            <span style={{ position: "relative", left: -29 }}>
              <Radio
                disabled={!basicEdit}
                name="qualificationOfTaxpayer"
                checked={taxpayerQualification === 1 }
                onClick={() => {
                  settaxpayerQualification(1);
                }}
              />
              小规模纳税人
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">发票种类</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -200 }}>
              <Radio
                disabled={!basicEdit}
                name="typeOfInvoice"
                checked={invoiceType === 0 }
                onClick={() => {
                  setinvoiceType(0);
                }}
              />
              专票
            </span>
            <span style={{ position: "relative", left: -77 }}>
              <Radio
                disabled={!basicEdit}
                name="typeOfInvoice"
                checked={invoiceType === 1 }
                onClick={() => {
                  setinvoiceType(1);
                }}
              />
              普票
            </span>
            <span style={{ position: "relative", left: 16 }}>
              <Radio
                disabled={!basicEdit}
                name="typeOfInvoice"
                checked={invoiceType === 2 }
                onClick={() => {
                  setinvoiceType(2);
                }}
              />
              专票+普票
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">税率</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <input
              disabled={!basicEdit}
              type="text"
              name="tax-rate"
              className="cbi-input"
              value={taxRate}
              // onBlur={(e) => {
              //   const taxrate = Number(e.target.value);
              //   const trList = [...taxRate, taxrate];
              //   if (taxRate.length === 0) {
              //     settaxRate(trList);
              //   }
              // }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td colSpan={6}>
            <Space
              style={{
                margin: "10px 0 10px 0",
              }}
            >
              <Button
                onClick={showDeleteModal}
                type="primary"
                danger
                style={{ borderRadius: "10px", height: "30px" }}
              >
                删除本公司
              </Button>
              <Modal
                centered={true}
                closable={false}
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                title="操作"
                okText={"确认"}
                cancelText={"取消"}
                footer={
                  <div>
                    <Button type="primary" onClick={handleCancel}>
                      取消
                    </Button>
                    <Button type="primary" danger onClick={handleOk}>
                      确认
                    </Button>
                  </div>
                }
              >
                <span>是否确认需要删除本公司？</span>
              </Modal>
            </Space>
          </td>
        </tr>
      </table>
    </Content>
  );
}
