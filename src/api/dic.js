import request from '@/utils/request'

export function getlist(id) {
  return request({
    url: `/admin/sys/dic/${id}`,
    method: 'get'
  })
}