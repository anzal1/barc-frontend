import * as ENDPOINTS from './endpoints'
import { useMutation } from '@tanstack/react-query'

export const QUERY_KEYS = {
  loginUser: 'loginUser',
  createJwt: 'createJwt',
  createDeviceMaster: 'createDeviceMaster'
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

export const useCreateDeviceMasterMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.createDeviceMaster],
    mutationFn: ENDPOINTS.createDeviceMaster
  })
}
