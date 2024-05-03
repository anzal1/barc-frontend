import * as ENDPOINTS from './endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'

export const QUERY_KEYS = {
  loginUser: 'loginUser',
  createJwt: 'createJwt',
  createOrEditDeviceMaster: 'createDeviceMaster',
  deleteDeviceMaster: 'deleteDeviceMaster',
  getDeviceMasterList: 'getDeviceMasterList',

  getEmployeeMasterList: 'getEmployeeMasterList',
  createOrEditEmployeeMaster: 'createOrEditEmployeeMaster',
  deleteEmployeeMaster: 'deleteEmployeeMaster',

  getRoleDetails: 'getRoleDetails',
  getRoleList: 'getRoleList'
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
  // const {} =
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

export const useGetEmployeeMasterListQuery = () => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.getEmployeeMasterList,
      QUERY_KEYS.createOrEditEmployeeMaster,
      QUERY_KEYS.deleteEmployeeMaster
    ],
    queryFn: ENDPOINTS.getEmployeeMasterList
  })
}

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.deleteEmployeeMaster],
    mutationFn: ENDPOINTS.deleteEmployee
  })
}

export const useCreateOrEditEmployeeMasterMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.createOrEditEmployeeMaster],
    mutationFn: ENDPOINTS.createOrEditEmployeeMaster
  })
}

export const useGetRoleDetailsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.getRoleDetails],
    queryFn: ENDPOINTS.getRoleDetails
  })
}

export const useGetRoleListMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.getRoleList],
    mutationFn: ENDPOINTS.getRoleList
  })
}
