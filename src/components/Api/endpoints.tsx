// This file contains the API endpoints for the application
import { apiClient } from '../../lib/ApiConfig'

export const loginUser = ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<unknown> =>
  apiClient('/api/v1/storefront/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'storefront-token': `${localStorage.getItem('storeToken')}`
    },
    body: JSON.stringify({
      email,
      password
    })
  })
