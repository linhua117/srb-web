import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/admin/core/integralGrade',
    method: 'get',
    params
  })
}

export function del(params) {
  return request({
    url: `/admin/core/integralGrade/${params}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: `/admin/core/integralGrade`,
    method: 'post',
    data:data
  })
}

export function update(data) {
  return request({
    url: `/admin/core/integralGrade`,
    method:'put',
    data
  })
}
