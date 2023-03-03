import {httpReq} from "./httpReq";

class httpUtil {
   // 登录注册模块
   // 登录
   login = (params) => httpReq("post",`/core/employee/login`,params)
   // 注册
   register = (params) => httpReq("post",`/core/employee/register`,params)

   //获取用户对应的所有企业Key
   getEnterpriseKeyList = (params)=> httpReq("get",`/core/employeeEnterprise/getEnterpriseKeyList/${params}`)

   // 信息模块
   // 获取用户基本信息
   getEmployeeMsg = (params) => httpReq("get",`/core/employee/getEmployeeMsg?uid=${params}`)
   // 获取用户已/待完成项目数量
   getProjectNumber = (params) => httpReq("get",`/core/employeeEnterprise/getProjectNumber/${params.industryId}/${params.uid}`)
   // 获取用户所有项目的详细信息
   getAllEnterpriseListByState = (params) => httpReq("get",`/core/enterprise/getEnterpriseListByState?industryId=${params.industryId}&uid=${params.uid}`)
   // 获取用户已完成项目的详细信息
   getFinishedEnterpriseListByState = (params) => httpReq("get",`/core/enterprise/getEnterpriseListByState?industryId=${params.industryId}&uid=${params.uid}&state=2`)
   // 获取用户未完成项目的详细信息
   getUnfinishedEnterpriseListByState = (params) => httpReq("get",`/core/enterprise/getEnterpriseListByState?industryId=${params.industryId}&uid=${params.uid}&state=1`)

   // 项目管理
   // 查询符合相关条件的企业
   searchForEnterpriseList = (params) => httpReq("post",`/core/enterprise/searchForEnterpriseList`,params)
   // 删除指定企业
   deleteByEnterpriseKey = (params) => httpReq("delete",`/core/enterprise/deleteByEnterpriseKey/${params.uid}/${params.enterpriseKey}`)

   // 企业基本信息表格
   // 获取企业基本信息
   getEnterpriseBasicMsg = (params) => httpReq("get",`/core/enterprise/getEnterpriseMsgOfFirst?enterpriseKey=${params.enterpriseKey}&uid=${params.uid}`)
   // 保存
   saveEnterpriseBasicMsg = (params) => httpReq("post",`/core/enterprise/saveEnterpriseMsg`,params)

   // 企业经营信息表格
   // 获取企业对应业务
   getBusinessByEnterpriseKey = (params) => httpReq("get",`/core/enterprise/getBusinessByEnterpriseKey?enterpriseKey=${params.enterpriseKey}`)
   // 获取企业经营信息
   getEnterpriseManageMsg = (params) => httpReq("get",`/core/enterprise/getEnterpriseMsgOfSecond?enterpriseKey=${params.enterpriseKey}&uid=${params.uid}`)
   // 获取各项计算结果
   getCalRes = (params) => httpReq("get",`/core/calculation/calculate?enterpriseKey=${params.enterpriseKey}`)
   // 保存
   saveEnterpriseManageMsg = (params) => httpReq("post",`/core/enterprise/saveEnterpriseOperationalMsg`,params)
}

export default new httpUtil()
