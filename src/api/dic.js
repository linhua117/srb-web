import request from '@/utils/request'

export function getlist(id) {
  return request({
    url: `/admin/sys/dic/${id}`,
    method: 'get'
  })
}
export function add(data) {
  return request({
    url: `/admin/sys/dic/`,
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/admin/sys/dic/`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `/admin/sys/dic/${id}`,
    method: 'delete'
  })
}