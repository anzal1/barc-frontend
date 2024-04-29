import * as ENDPOINTS from './endpoints'
import { useQuery, useMutation } from '@tanstack/react-query'

export const QUERY_KEYS = {
  loginUser: 'loginUser',
  createJwt: 'createJwt'
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
