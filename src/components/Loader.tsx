import React from 'react'

const Loader:React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='w-10 h-10 border-4 border-t-transparent rounded-full border-blue-900 animate-spin'></div>
    </div>
  )
}

export default Loader;