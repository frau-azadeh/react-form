import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { decrement, increment, incrementByAmount,reset } from '../store/features/counterSlice';

const Counter:React.FC = () => {
    const count = useSelector((state: RootState) =>state.counter.value);
    const dispatch = useDispatch<AppDispatch>();
    const [amount, setAmount] = useState(0);
  return (
    <div className='text-center p-4'>
        <h1 className='text-2xl font-bold'>Counter: {count}</h1>
        <div className='flex gap-4 justify-center'>
            <button
                onClick={()=>dispatch(decrement())}
                className='px-4 py-2 bg-red-500 text-white rounded'
            >
                -1
            </button>
            <button
                onClick={()=>dispatch(increment())}
                className='px-4 py-2 bg-green-500 text-white rounded'
            >
                +1
            </button>
        </div>
        <div className='p-2 flex justify-center gap-2'>
            <input 
                type='number'
                value={amount}
                onChange={(e)=> setAmount(Number(e.target.value))}
                className="border rounded p-2 w-20 text-center"
            />
            <button
                onClick={() => dispatch(incrementByAmount(amount))}
                className='px-4 py-2 bg-blue-500 text-white rounded'
            >
            Add Number
            </button>
        </div>
        <div className='flex p-2 justify-center'>
            <button
                onClick={() =>dispatch(reset())}
                className='p-2 rounded bg-red-500 text-white'
            >
                Reset
            </button>
        </div>
    </div>
  )
}

export default Counter