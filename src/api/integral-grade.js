import request from '@/utils/request'

export function getList(params) {
    return request({
      url: '/admin/core/integralGrade/list',
      method: 'get',
      params
    })
  }