import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const loadFromLocalStorage = () : number =>{
    const savedValue = localStorage.getItem("counterValue");
    return savedValue ? Number (savedValue) : 0;
}

const initialState: CounterState = {
    value : loadFromLocalStorage() ,
}

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment: (state) =>{
            state.value += 1;
            localStorage.setItem("counterValue", state.value.toString());
        },
        decrement: (state) =>{
            state.value -=1;
            localStorage.setItem("counterValue", state.value.toString());
        },
        incrementByAmount: (state, action) =>{
            state.value += action.payload;
            localStorage.setItem("counterValue", state.value.toString());
        },
        reset: (state) =>{
            state.value = 0;
            localStorage.removeItem("counterValue")
        }
    },
});

export const {increment, decrement, incrementByAmount, reset} = counterSlice.actions;
export default counterSlice.reducer;