import { doGet, doPost } from '../../http/http.js'

// 登录
export const login = (param) => doPost('/login', param)
// 登出
export const logout = () => doGet('/logout')
