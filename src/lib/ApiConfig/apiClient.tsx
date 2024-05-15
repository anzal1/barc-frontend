import toast from 'react-hot-toast'

/**
 * Default success handler for API responses.
 *
 * @param response - The response object received from the API.
 * @returns A Promise that resolves to the parsed data from the response.
 * @throws If the response is not successful, it rejects with the error message or status code.
 */
const defaultSuccessHandler = async (response: Response) => {
  try {
    const contentType = response.headers.get('content-type')
    console.log('successHandler', response, contentType)

    let data
    if (contentType && contentType.indexOf('application/json') !== -1) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      const error = (data && data) || response.status
      return Promise.reject(error)
    }

    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Default error handler function.
 *
 * @param error - The error object.
 * @throws The error object.
 */
const defaultErrorHandler = (error: Error) => {
  console.log('eror', error)
  if ((error as any) == 401) {
    localStorage.removeItem('user')
    localStorage.removeItem('userToken')
    localStorage.removeItem('role')
    toast.error('Session timeout! Please login again')
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }
  // @TODO change to warning in dev prod
  throw error
}

const getApiClient =
  ({
    baseURL,
    sucessHandler,
    errorHandler
  }: {
    baseURL: string
    sucessHandler: (response: any) => any
    errorHandler: (error: Error) => any
  }) =>
  (url: string, requestOptions?: RequestInit) =>
    fetch(`${baseURL}${url}`, {
      ...requestOptions,
      headers: {
        ...(requestOptions?.headers || {}),
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
    })
      .then(sucessHandler)
      .catch(errorHandler)

export const apiClient = getApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  sucessHandler: defaultSuccessHandler,
  errorHandler: defaultErrorHandler
})

export default apiClient
