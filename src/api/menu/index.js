import { doGet, doPost } from '../../http/http.js'

// 菜单管理查询
export const menuQuery = (param) => doPost('/sysMenu/pageQuery', param)
// 菜单管理更新
export const menuUpdate = (param) => doPost('/sysMenu/updateIfNotNull', param)
// 菜单管理启用
export const menuEnable = (param) => doGet('/sysMenu/enable' + param)
// 菜单管理禁用
export const menuDisable = (param) => doGet('/sysMenu/disable' + param)
// 导航菜单查询
export const navMenu = () => doPost('/sysMenu/navMenu', { pageSize: 10, state: 1 })
// 菜单树查询
export const menuTree = () => doPost('/sysMenu/menuTree', { pageSize: 10, state: 1 })
// 菜单下拉框查询
export const menuList = (param) => doPost('/sysMenu/menuList', param)
// 菜单动态下拉框api
export const menuSelect = '/sysMenu/selectList'
