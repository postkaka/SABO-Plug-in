import {  httpRequest, putRequest, deleteRequest,} from './request'
const base = '';
// 获取session-key
export const requst_session_key = data => httpRequest(`session-key`, data);
// 用户登录
export const requst_login = data => httpRequest(`login`, data,'post');
// 获取我的设备
export const requst_get_device = data => httpRequest(`get-device`, data);
