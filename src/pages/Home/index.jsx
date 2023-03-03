import React, { useState, useEffect } from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DesktopOutlined,
  EditFilled,
  CopyFilled,
  DeleteFilled,
  FundFilled,
} from "@ant-design/icons";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Button, Space, message, Divider } from "antd";
import PubSub from "pubsub-js";
import httpUtil from "../../utils/httpUtil.js";

import Routes from "./routes";
import "./index.css";
import "../../static/iconfont.css";

export default function Home() {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("");

  // 获取登录的用户信息
  const userid = localStorage.getItem("uid");

  useEffect(() => {
    httpUtil.getEmployeeMsg(userid).then((res) => {
      if (res.code == 200) {
        message.success("用户请求成功!");
        setUserName(res.data.employeeMsg.name);
      }
    });
  }, []);

  // url
  const urlParams = new URL(window.location.href);
  const pathname = urlParams.pathname;
  const selectedKeys =
    pathname === "/home/homePage/allitems"
      ? "homePage"
      : pathname === "/home/projectManage"
      ? "projectManage"
      : pathname === "/home/bin"
      ? "bin"
      : pathname === "/home/basic"
      ? "basic"
      : pathname === "/home/manage"
      ? "manage"
      : pathname === "/home/relevant"
      ? "relevant"
      : pathname === "/home/solve"
      ? "solve"
      : pathname === "/home/success"
      ? "success"
      : pathname === "/home/detail"
      ? "detail"
      : pathname === "/home/sign"
      ? "sign"
      : "homePage";

  return (
    <Layout className="homeBack">
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <div className="head-left">
          <div>海修睿</div>
          <Divider
            type="vertical"
            style={{
              backgroundColor: "white",
            }}
          />
          <div>
            <div>共享平台经济</div>
            <div>让企业经营变得简单</div>
          </div>
        </div>
        <div className="head-right">
          <div className="head-right-img"></div>
          <div className="head-right-text">
            {/* 这里的具体信息要用参数实时获取 */}
            <div>{userName}</div>
          </div>
        </div>
      </Header>
      <Layout className="site-layout">
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKeys]}
            defaultOpenKeys={["workBench", "infoFill"]}
          >
            <Menu.SubMenu
              key="workBench"
              icon={<DesktopOutlined />}
              title="工作台"
            >
              <Menu.Item key="homePage" icon={<FundFilled />}>
                <Link to="/home/homePage/allitems">我的首页</Link>
              </Menu.Item>
              <Menu.Item key="projectManage" icon={<CopyFilled />}>
                <Link to="/home/projectManage">项目管理</Link>
              </Menu.Item>
              <Menu.Item key="bin" icon={<DeleteFilled />}>
                <Link to="/home/bin">回收站</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="infoFill" icon={<EditFilled />} title="信息填写">
              <Menu.Item key="basic" title="企业基本信息">
                <Link to="/home/basic">企业基本信息</Link>
              </Menu.Item>
              <Menu.Item key="manage" title="企业经营情况">
                <Link to="/home/manage">企业经营情况</Link>
              </Menu.Item>
              <Menu.Item key="relevant" title="企业相关问题">
                <Link to="/home/relevant">企业相关问题</Link>
              </Menu.Item>
              <Menu.Item key="solve" title="解决方案及成本">
                <Link to="/home/solve">解决方案及成本</Link>
              </Menu.Item>
              <Menu.Item key="success" title="成功案例">
                <Link to="/home/success">成功案例</Link>
              </Menu.Item>
              <Menu.Item key="detail" title="详细介绍">
                <Link to="/home/detail">详细介绍</Link>
              </Menu.Item>
              <Menu.Item key="sign" title="合同签订">
                <Link to="/home/sign">合同签订</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          </div>
        </Sider>
        {Routes.map((item) => {
          return <Route path={item.path} component={item.component} />;
        })}
      </Layout>
    </Layout>
  );
}
