import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        deleteUserstart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: ( state , action ) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state , action ) => {
            state.error = action.payload
            state.loading = false
        },
        SignOutUserstart: (state) => {
            state.loading = true
        },
        SignOutUserSuccess: ( state , action ) => {
            state.loading = false
            state.error = null
            state.currentUser = null
        },
        SignOutUserFailure: (state , action ) => {
            state.error = action.payload
            state.loading = null
        }
    }
})

export const { signInStart, signInFailure, signInSuccess ,
               updateUserStart , updateUserSuccess , updateUserFailure,
               deleteUserstart , deleteUserSuccess , deleteUserFailure,
               SignOutUserstart , SignOutUserSuccess , SignOutUserFailure
} = userSlice.actions
export default userSlice.reducer