import { doGet, doPost } from '../../http/http.js'

// 公司管理查询
export const companyQuery = (param) => doPost('/sysCompany/pageQuery', param)
// 公司管理新增
export const companySave = (param) => doPost('/sysCompany/save', param)
// 公司管理更新
export const companyUpdate = (param) => doPost('/sysCompany/update', param)
// 公司管理删除
export const companyDelete = (param) => doGet('/sysCompany/delete' + param)
// 公司动态下拉框
export const companySelect = '/sysCompany/selectList'
