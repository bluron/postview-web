import { doGet, doPost } from '../../http/http.js'

// 接口管理查询
export const interfaceQuery = (param) => doPost('/sysInterface/pageQuery', param)
// 接口管理新增
export const interfaceSave = (param) => doPost('/sysInterface/save', param)
// 接口管理更新
export const interfaceUpdate = (param) => doPost('/sysInterface/updateIfNotNull', param)
// 接口管理删除
export const interfaceDelete = (param) => doGet('/sysInterface/delete' + param)
// 接口管理请求
export const interfaceRquest = (param) => doPost('/sysRequest/request', param)
