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
  getRoleList: 'getRoleList',

  getReport: 'getReport',

  insertAcknowledgement: 'insertAcknowledgement'
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
    queryFn: ENDPOINTS.getDeviceMasterList,
    refetchInterval: 5000 // 1 seconds
  })
}

export const useGetEmployeeMasterListQuery = (UserID: string) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.getEmployeeMasterList,
      QUERY_KEYS.createOrEditEmployeeMaster,
      QUERY_KEYS.deleteEmployeeMaster
    ],
    queryFn: () => ENDPOINTS.getEmployeeMasterList(UserID)
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

export const useGetRoleDetailsQuery = (UserID: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getRoleDetails],
    queryFn: () => ENDPOINTS.getRoleDetails(UserID)
  })
}

export const useGetRoleListMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.getRoleList],
    mutationFn: ENDPOINTS.getRoleList
  })
}

export const useGetReportMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.getReport],
    mutationFn: ENDPOINTS.getReports
  })
}

export const useInsertAcknowledgementMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.insertAcknowledgement],
    mutationFn: ENDPOINTS.insertAcknowledgement
  })
}
