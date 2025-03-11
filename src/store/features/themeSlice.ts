import { createSlice } from "@reduxjs/toolkit";

const loadColorFromLocalStorage = (): string =>{
    return localStorage.getItem("themColor") || "white";
}

const initialState :{color:string} = {
    color: loadColorFromLocalStorage(),
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeColor:(state) =>{
            state.color = state.color === "white" ? "lighblue" : "white";
            localStorage.setItem("themColor", state.color);
        }
    }
})

export const {changeColor} = themeSlice.actions;
export default themeSlice.reducer;