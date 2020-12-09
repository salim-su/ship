import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function loginSystem(params) {
  return request({
    url: api.LoginSystem,
    method: 'post',
    params,
    hideloading: true
  })
}
// 获取防疫检查列表
export function checkPage(params) {
  return request({
    url: api.CheckPage,
    method: 'get',
    params,
    hideloading: true
  })
}
// 船舶列表
export function shipList(params) {
  return request({
    url: api.ShipList,
    method: 'get',
    params,
    hideloading: true
  })
}
// 获取检查项列表
export function checkItem(params) {
  return request({
    url: api.CheckItem,
    method: 'get',
    params,
    hideloading: true
  })
}
// 获取检查项列表
export function CheckSave(data) {
  return request({
    url: api.CheckSave,
    method: 'post',
    data,
    hideloading: true
  })
}
// 保存检查项
export function checkUpdate(data) {
  return request({
    url: api.CheckUpdate,
    method: 'post',
    data,
    hideloading: true
  })
}
// 保存检查项
export function checkDetail(params) {
  return request({
    url: api.CheckDetail,
    method: 'get',
    params,
    hideloading: true
  })
}
// 删除检查表
export function checkRemove(params) {
  return request({
    url: api.CheckRemove,
    method: 'post',
    params,
    hideloading: true
  })
}
// 保存检查
export function checkExamineFinished(data) {
  return request({
    url: api.CheckExamineFinished,
    method: 'post',
    data,
    hideloading: true
  })
}
