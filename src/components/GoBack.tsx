import React from 'react'
import Button from './Button'

const GoBack:React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
        <Button 
            onClick={()=>window.history.back()}
        >
            Go Back
        </Button>
    </div>
  )
}

export default GoBack