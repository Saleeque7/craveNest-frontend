import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    admin:null,
    isAuthenticated:false    
}
const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminInfo(state ,action){
            state.admin = action.payload
        },
        setAuthenticated(state){
            state.isAuthenticated = true;
        },
        adminLogout(state){
            state.admin = null
            state.isAuthenticated = false;
            localStorage.removeItem('adminTokenKey')
        }
    }
})
export const { setAdminInfo, setAuthenticated ,adminLogout  } = adminSlice.actions;
export default adminSlice.reducer;