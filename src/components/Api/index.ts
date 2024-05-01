import * as ENDPOINTS from './endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'

export const QUERY_KEYS = {
  loginUser: 'loginUser',
  createJwt: 'createJwt',
  createOrEditDeviceMaster: 'createDeviceMaster',
  deleteDeviceMaster: 'deleteDeviceMaster',
  getDeviceMasterList: 'getDeviceMasterList'
}

export const useLoginUserMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.loginUser],
    mutationFn: ENDPOINTS.loginUser
  })
}

export const useCreateJWTMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.createJwt],
    mutationFn: ENDPOINTS.createJWT
  })
}

export const useCreateOrEditDeviceMasterMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.createOrEditDeviceMaster],
    mutationFn: ENDPOINTS.createOrEditDeviceMaster
  })
}

export const useDeleteDeviceMasterMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.deleteDeviceMaster],
    mutationFn: ENDPOINTS.deleteDeviceMaster
  })
}

export const useGetDeviceMasterListQuery = () => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.getDeviceMasterList,
      QUERY_KEYS.deleteDeviceMaster,
      QUERY_KEYS.createOrEditDeviceMaster
    ],
    queryFn: ENDPOINTS.getDeviceMasterList
  })
}
