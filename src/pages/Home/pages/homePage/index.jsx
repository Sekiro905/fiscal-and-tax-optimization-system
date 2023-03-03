import React, { useState, useEffect } from "react";
import "./index.css";
import { Layout} from "antd";
import { SettingOutlined } from "@ant-design/icons";

import AllItems from "./pages/AllItems";
import FinishItems from "./pages/FinishItems";
import ContinuedItems from "./pages/ContinuedItems";

import "../../../../static/我的首页页面所用图标/iconfont.css";
import { Link, Route, Switch } from "react-router-dom";
import httpUtil from "../../../../utils/httpUtil";

export default function HomePage() {
  const [time, setTime] = useState({});
  const [currentPage, setCurrentSlide] = useState("all-items");
  const [finishedCount,setFinishedCount] = useState(0)
  const [unFinishedCount,setUnFinishedCount] = useState(0)

  // 获得uid
  const uid = localStorage.getItem("uid");

  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  // 滚动条移动和颜色变换
  let translateX =
    currentPage == "all-items"
      ? "2.5vw"
      : currentPage == "finish-items"
      ? "23vw"
      : currentPage == "continued-items"
      ? "44vw"
      : currentPage == "create-items"
  let backgroundColor=
    currentPage == "all-items"
      ? "rgba(225, 255, 255, 1)"
      : currentPage == "finish-items"
      ? "rgba(234, 246, 255, 1)"
      : currentPage == "continued-items"
      ? "rgba(245, 245, 245, 1)"
      : currentPage == "create-items"

  useEffect(() => {
    let time = formateDate();
    setTime(time);
    let timer = setInterval(() => {
      let time = formateDate();
      setTime(time);
    }, 60000);

    // 获取用户已/待完成的项目数量
    const params = {
      industryId:1,
      uid
    }
    httpUtil.getProjectNumber(params)
    .then((res)=>{
      const {code,data:{finishedCount,unFinishedCount}} = res
      if(code===200){
        setFinishedCount(finishedCount)
        setUnFinishedCount(unFinishedCount)
      }
    })

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 实时获取时间年月日
  function formateDate() {
    let date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      min: date.getMinutes(),
      week: weeks[date.getDay()],
    };
  }

  const changePage = (page) => {
    setCurrentSlide(page);
  };

  return (
    <Layout>
      <div className="homePage-top-layout-background">
        <div className="homePage-header-left">
          <div className="homePage-header-left-top">
            <span style={{ fontSize: "2em", fontWeight: "700" }}>个人首页</span>
            <span style={{ marginLeft: "30px", color: "rgb(215,215,215)" }}>
              <SettingOutlined />
              设置个人首页
            </span>
          </div>
          <div className="homePage-header-left-buttom">
            <div className="have-finish">
              <div className="homePage-left-number">{finishedCount}</div>
              <div className="homePage-left-text">已完成</div>
            </div>
            <div className="wait-finish">
              <div className="homePage-left-number">{unFinishedCount}</div>
              <div className="homePage-left-text">待完成</div>
            </div>
            <div className="now-time">
              <div className="homePage-left-number">
                {time.hour}:{time.min}
              </div>
              <div className="homePage-left-text">
                {time.year}年{time.month}月{time.day}日 {time.week}
              </div>
            </div>
          </div>
        </div>
        <div className="homePage-header-right">
          <div className="homePage-right-image">
            <div className="test-img"></div>
          </div>
          <div className="homePage-right-text">
            <p className="homePage-right-text-title">早上好，张全蛋007！</p>
            <p className="homePage-right-text-department">|市场部</p>
            <div>
              <textarea
                type="text"
                className="homePage-right-text-introduce"
                defaultValue="这个人很懒，什么也没留下..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="homePage-middle-layout-background">
        <p className="homePage-middle-layout-background-title">项目预览</p>
        <div className="homePage-middle-layout-background-content">
          {/* 所有项目 */}
          <Link style={{ color:'black'}} to={"/home/homePage/allitems"}>
          <div
            className="homePage-middle-layout-background-content-text all-items"
            onClick={() => {
              changePage("all-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon all-items-icon">
              &#xe716;
            </i>
            <span>所有项目</span>
          </div>
          </Link>
          {/* 已完成项目 */}
          <Link style={{ color:'black'}} to={"/home/homePage/finishitems"}>
          <div
            className="homePage-middle-layout-background-content-text finish-items"
            onClick={() => {
              changePage("finish-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon finish-items-icon">
              &#xe615;
            </i>
            <span>已完成项目</span>
          </div>
          </Link>
          {/* 待完成项目 */}
          <Link style={{ color:'black' }} to={"/home/homePage/continueditems"}>
          <div
            className="homePage-middle-layout-background-content-text wait-items"
            onClick={() => {
              changePage("continued-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon wait-items-icon">
              &#xe64b;
            </i>
            <span>待完成项目</span>
          </div>
          </Link>
          {/* 创建新项目 */}
          <Link style={{ color:'black' }} to={"/home/basic"}>
          <div
            className="homePage-middle-layout-background-content-text create-items"
            onClick={() => {
              changePage("create-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon create-items-icon">
              &#xe64e;
            </i>
            <span>创建新项目</span>
          </div>
          </Link>
        </div>
        <div className="homePage-middle-layout-background-linebox">
          <div
            className="homePage-middle-layout-background-line"
            style={{ transform: `translateX(${translateX})`, backgroundColor:`${backgroundColor}` }}
          ></div>
        </div>
      </div>
      <div className="site-card-border-less-wrapper">
        <Switch>
          <Route path={"/home/homePage/allitems"} component={AllItems}/>
          <Route path={"/home/homePage/finishitems"} component={FinishItems}/>
          <Route path={"/home/homePage/continueditems"} component={ContinuedItems}/>
        </Switch>
      </div>
    </Layout>
  );
}
