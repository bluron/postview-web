import { doGet, doPost } from '../../http/http.js'

// 用户管理查询
export const userQuery = (param) => doPost('/sysUser/pageQuery', param)
// 用户管理新增
export const userSave = (param) => doPost('/sysUser/save', param)
// 用户管理密码重置
export const resetPass = (param) => doGet('/sysUser/resetPass' + param)
// 用户修改密码
export const modifyPass = (param) => doPost('/sysUser/modifyPass', param)
// 用户管理启用
export const userEnable = (param) => doGet('/sysUser/enable' + param)
// 用户管理禁用
export const userDisable = (param) => doGet('/sysUser/disable' + param)
// 获取用户角色
export const getRoleByUserId = (param) => doGet('/sysUserRole/getRoleByUserId' + param)
// 分配用户角色
export const saveUserRole = (param) => doPost('/sysUserRole/save', param)
// 用户动态下拉框api
export const userSelect = '/sysUser/selectList'
