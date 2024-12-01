import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        billbooks : [],
        bills: [],
        transactions: [],
        isUserLoggedIn: false
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
        },
        setIsUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload
        }
    }
})

export const {getbillbooks, getbills, gettransactions, setIsUserLoggedIn} = billSlice.actions;
export default billSlice.reducer;