import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    isAuthenticated:false    
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserInfo(state ,action){
            state.user = action.payload
        },
        setAuthenticated(state){
            state.isAuthenticated = true
        },
        userLogout(state){
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('userTokenKey')
        }
    }
})
export const { setUserInfo, setAuthenticate , userLogout} = userSlice.actions;
export default userSlice.reducer;