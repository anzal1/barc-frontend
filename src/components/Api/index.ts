import * as ENDPOINTS from './endpoints'
import { useQuery, useMutation } from '@tanstack/react-query'

export const QUERY_KEYS = {
  loginUser: 'loginUser'
}

export const useLoginUserMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.loginUser],
    mutationFn: ENDPOINTS.loginUser
  })
}
