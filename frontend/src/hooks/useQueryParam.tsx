import { useEffect } from 'react'
import { useQuery } from './useQuery'

export const useQueryParam = (
  paramKey: string,
  cb: (param: string) => void
) => {
  const searchParams = useQuery()
  const param = searchParams.get(paramKey)
  useEffect(() => {
    if (param) cb(param)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
}
