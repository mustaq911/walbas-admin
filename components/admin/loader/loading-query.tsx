import { Loader } from 'lucide-react'
import React from 'react'

const LoadingQuery = () => {
  return (
    <div className="flex justify-center items-center"> <Loader className='animate-spin me-2' /> <span>Loading ...</span></div>
  )
}

export default LoadingQuery
