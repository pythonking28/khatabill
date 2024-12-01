import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        billbooks : [],
        bills: [],
        transactions: []
    },
    reducers: {
        getbillbooks: (state, action) => {
            state.billbooks = action.payload
        },
        getbills: (state, action) => {
            state.bills = action.payload
        },
        gettransactions: (state, action) => {
            state.transactions = action.payload
        }
    }
})

export const {getbillbooks, getbills, gettransactions} = billSlice.actions;
export default billSlice.reducer;