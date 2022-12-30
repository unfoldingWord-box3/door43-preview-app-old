import { useRouter } from 'next/router'
import { StoreContext } from '@context/StoreContext'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useContext } from 'react'

const useStoreContext = () => {
  const storeContext = useContext(StoreContext)
  return storeContext
}

export default useStoreContext
