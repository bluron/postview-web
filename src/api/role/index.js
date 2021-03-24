import { doGet, doPost } from '../../http/http.js'

// 角色管理查询
export const roleQuery = (param) => doPost('/sysRole/pageQuery', param)
// 角色管理新增
export const roleSave = (param) => doPost('/sysRole/save', param)
// 角色管理更新
export const roleUpdate = (param) => doPost('/sysRole/updateIfNotNull', param)
// 角色树查询
export const roleTree = (param) => doPost('/sysRole/treeList', param)
// 角色管理启用
export const roleEnable = (param) => doGet('/sysRole/enable' + param)
// 角色管理禁用
export const roleDisable = (param) => doGet('/sysRole/disable' + param)
// 获取角色资源
export const getMenuByRoleId = (param) => doGet('/sysRoleMenu/getMenusByRoleId' + param)
// 分配角色资源
export const saveRoleMenu = (param) => doPost('/sysRoleMenu/save', param)
// 角色动态下拉框api
export const roleSelect = '/sysRole/selectList'
