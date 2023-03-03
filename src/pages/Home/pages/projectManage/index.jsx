import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Space,
  Select,
  Input,
  DatePicker,
  Table,
  Form,
  message,
  Popconfirm
} from "antd";
import moment from "moment";

import httpUtil from "../../../../utils/httpUtil";
import "../../../../static/我的首页页面所用图标/iconfont.css";
import "./index.css";
const { Option } = Select;

export default function ProjectManage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log("selectedRows changed: ", newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [form] = Form.useForm();

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
        const data = enterpriseList;
        console.log(data)
        const newData=data.map((enterObj, index) => {
          return {
            ...enterObj,
            serialNumber: index + 1,
            state: enterObj.state === 2 ? "已完成" : "待完成",
            key: enterObj.enterpriseKey,
          };
        });
        setData([...newData]);
        setTotal(data.length);
      }
    });
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 表格内容
  const columns = [
    {
      title: "序号",
      dataIndex: "serialNumber",
    },
    {
      title: "项目编号",
      dataIndex: "enterpriseKey",
    },
    {
      title: "公司名称",
      dataIndex: "enterpriseName",
    },
    {
      title: "所属行业",
      dataIndex: "industryName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "项目状态",
      dataIndex: "state",
    },
    {
      title: "完成时间",
      dataIndex: "updateOrCompletedTime",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>修改</a>
          <Popconfirm
            title="您确定要删除这行数据吗?"
            onConfirm={()=>{
              const params = {
                uid,
                enterpriseKey:record.enterpriseKey
              }
              httpUtil.deleteByEnterpriseKey(params)
              .then((res)=>{
                const {code} = res
                if(code === 200){
                  message.success("删除成功!")
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
                      const data = enterpriseList;
                      data.map((enterObj, index) => {
                        return {
                          ...enterObj,
                          serialNumber: index + 1,
                          state: enterObj.state === 2 ? "已完成" : "待完成",
                          key: enterObj.enterpriseKey,
                        };
                      });
                      setData([...data]);
                      setTotal(data.length);
                    }
                  });
                }
              })
            }}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
          <Link to="/home/basic">详情</Link>
        </Space>
      ),
    },
  ];

  // 搜索表单回调
  const searchData = (queryObj) => {
    const params = {
      createEndTime:
        queryObj.createTime !== undefined
          ? queryObj.createTime[1] !== undefined
            ? moment(queryObj.createTime[1]).format("YYYY-MM-DD")
            : ""
          : "",
      createStartTime:
        queryObj.createTime !== undefined
          ? queryObj.createTime[0] !== undefined
            ? moment(queryObj.createTime[0]).format("YYYY-MM-DD")
            : ""
          : "",
      enterpriseKey:
        queryObj.enterpriseKey !== undefined ? queryObj.enterpriseKey : "",
      enterpriseName:
        queryObj.enterpriseName !== undefined ? queryObj.enterpriseName : "",
      finishedEndTime:
        queryObj.finishedTime !== undefined
          ? queryObj.finishedTime[1] !== undefined
            ? moment(queryObj.finishedTime[1]).format("YYYY-MM-DD")
            : ""
          : "",
      finishedStartTime:
        queryObj.finishedTime !== undefined
          ? queryObj.finishedTime[0] !== undefined
            ? moment(queryObj.finishedTime[0]).format("YYYY-MM-DD")
            : ""
          : "",
      industryName:
        queryObj.industryName !== undefined ? queryObj.industryName : "",
      state: queryObj.state !== undefined ? queryObj.state : "",
      uid,
    };
    console.log(params);
    httpUtil.searchForEnterpriseList(params).then((res) => {
      
      const {
        code,
        data: { enterpriseList },
      } = res;
      if (code === 200) {
        message.success("查询成功!");
        const data = enterpriseList;
        data.map((enterObj, index) => {
          return {
            ...enterObj,
            serialNumber: index + 1,
            state:
              enterObj.state === 2
                ? "已完成"
                : enterObj.state === 1
                ? "待完成"
                : "已删除",
            key: enterObj.enterpriseKey,
          };
        });
        setData([...data]);
        setTotal(data.length);
      }
    });
  };
  // 重置表单回调
  const reset = () => {
    message.warn("表单已重置!");
    form.resetFields();
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
        const data = enterpriseList;
        data.map((enterObj, index) => {
          return {
            ...enterObj,
            serialNumber: index + 1,
            state: enterObj.state === 2 ? "已完成" : "待完成",
            key: enterObj.enterpriseKey,
          };
        });
        setData([...data]);
        setTotal(data.length);
      }
    });
  };

  return (
    <Layout>
      <div className="projectManage-top-layout-background">
        <div className="projectManage-top-title-wrap">
          <span>查询</span>
        </div>
        <Form form={form} layout="inline" onFinish={searchData}>
          <div className="projectManage-top-queryForm-wrap1">
            <Form.Item label="项目编号" name="enterpriseKey">
              <Input allowClear type="text" style={{ width: "15vw" }}></Input>
            </Form.Item>
            <Form.Item label="企业名称" name="enterpriseName">
              <Input allowClear type="text" style={{ width: "15vw" }}></Input>
            </Form.Item>
            <Form.Item label="所属行业" name="industryName">
              <Select style={{ width: "15vw" }}>
                <Option value="物流运输行业">物流运输行业</Option>
                <Option value="建筑行业">建筑行业</Option>
                <Option value="教育培训行业">教育培训行业</Option>
                <Option value="科技行业">科技行业</Option>
              </Select>
            </Form.Item>
            <Form.Item label="项目状态" name="state">
              <Select style={{ width: "10vw" }}>
                <Option value="1">1(待完成)</Option>
                <Option value="2">2(已完成)</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="projectManage-top-queryForm-wrap2">
            <Form.Item label="创建时间" name="createTime">
              <DatePicker.RangePicker allowClear style={{ width: "35.3vw" }} />
            </Form.Item>
            <Form.Item label="完成时间" name="finishedTime">
              <DatePicker.RangePicker allowClear style={{ width: "36vw" }} />
            </Form.Item>
          </div>
          <div className="projectManage-top-actionBtn-wrap">
            <Space size={"middle"}>
              <Button danger>删除</Button>
              <Button>导出</Button>
            </Space>
            <Space size={"middle"}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </div>
        </Form>
      </div>
      <div className="projectManage-buttom-layout-background">
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={{
            total: data.length,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["5", "10", "15"],
            showTotal: () => {
              return `共${total}条数据`;
            },
          }}
        />
      </div>
    </Layout>
  );
}
