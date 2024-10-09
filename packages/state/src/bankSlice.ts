import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialStateType = {
    balance: number
}

const initialState: initialStateType = {
    balance: 0
}
const bankSlice = createSlice({
    name: "bankReducer",
    initialState,
    reducers: {
        increaseBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload
        },
        decreaseBalance: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload
        }
    }
})

export default bankSlice.reducer
export const {increaseBalance, decreaseBalance} = bankSlice.actions